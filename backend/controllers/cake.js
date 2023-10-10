import { Cake } from "../models/cake.js";
import multer from "multer";


import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import config from "../uploads/config.js";
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();



export const addCake= async (req, res, next) => {
    try {
      const newCake = await Cake.create(req.body);
      res.status(201).json("cake added succesfully");
    }
     catch (error) {
            next(error);
          }
    };


export const deleteCake=async (req, res, next) => {
    try {
      const _id = req.body.id;
      console.log(_id);
      // console.log(req.body)
      await Cake.findByIdAndDelete(_id);
      res.sendStatus(204);
    }  catch (error) {
        next(error);
      }
  };


export const getAllCakes=async (req, res, next) => {
    try {
      const cakes = await Cake.find();
      res.json(cakes);
    }  catch (error) {
        next(error);
      }
  };


export const getCakebyId=async (req, res, next) => {
    try {
      const { id } = req.params;
      const cake = await Cake.findById(id);
      if (cake) {
        res.json(cake);
      } else {
        res.status(404).json({ message: 'Cake not found' });
      }
    }  catch (error) {
        next(error);
      }
  };



 


  const upload = multer({ storage: multer.memoryStorage() }).single("image");

  // export const uploadController=async(req, res) => {
  //   upload(req, res, (err) => {
  //     if (err) {
  //       console.error('Error uploading fil:', err);
  //       res.status(500).json({ error: 'Failed to upload file' });
  //     } else {
  //       const file = req.file;
  
  //       // Send the filename back as a response
  //       res.status(200).json({ filename: file.filename });
  //     }
  //   });
  // };

  export const uploadController=async(req, res) => {
    
    upload(req, res, async(err) => {
      try {
          const dateTime = giveCurrentDateTime();
         
          const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);
  
          // Create file metadata including the content type
          const metadata = {
              contentType: req.file.mimetype,
          };
  
          // Upload the file in the bucket storage
          const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
          //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
  
          // Grab the public url
          const downloadURL = await getDownloadURL(snapshot.ref);
  
          return res.send({
              message: 'file uploaded to firebase storage',
              filename: req.file.originalname,
              type: req.file.mimetype,
              downloadURL: downloadURL
          })
      } catch (error) {
          return res.status(400).send(error.message)
      }
    }
    );};



  
  const giveCurrentDateTime = () => {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + ' ' + time;
      return dateTime;
  }

  //for multiple images
  const uploads=multer({storage:storage}).array('images',3);

  export const uploadsController= async (req,res)=>{
     uploads(req,res,(err)=>{
      if(err){
        console.err("erroe uploading files:",err);
        res.status(500).json({error:'Failed to upload files'});
      }
      else{
        const files=req.files;
        console.log('upload files',files);
      }
     })
  }









  //for multiple images
  
  //  const uploads = multer({ storage: storage }).array('images', 3);

  //  export const uploadsController = async (req, res) => {
  //   uploads(req, res, (err) => {
  //     if (err) {
  //       console.error('Error uploading files:', err);
  //       res.status(500).json({ error: 'Failed to upload files' });
  //     } else {
  //       const files = req.files;
  //       console.log('Uploaded files:', files);
  
  //       // Extract the filenames from the uploaded files
  //       const filenames = files.map((file) => file.filename);
  
  //       // Send the filenames back as a response
  //       res.status(200).json({ filenames });
  //     }
  //   });
  // };



