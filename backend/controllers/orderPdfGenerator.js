import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Order } from '../models/order.js';
import fetch from 'node-fetch';
import sharp from 'sharp';
// Sample order data (replace with your actual order data)

var orders="";
var result = []
export const getAllOrders=async (req, res, next) => {
  try {
     orders =  await Order.find();
     result=[];
    
     orders= orders.map((item)=>{
      let obj={id:item._id,order:[]};
       
       item.order=item.order.map((item1)=>{
         if(item1.isConfirmed=="confirm")
         { 
            let hj=JSON.stringify(item1);
            let sd=JSON.parse(hj);
            sd.time=item.time;
            sd.uname=item.user.name;
            sd.mobileno=item.user.mobileno;
            sd.address=item.address;
            result.push(sd); 
            item1.isConfirmed="completed";
         }
         return item1;
       })

       return item;
      
     })

     orders.map(async (item)=>{
       
       let id=item._id;

       let currorder=item.order;

      //  console.log(id);
      //  console.log(currorder);

       let log=await Order.updateOne({_id:id},{$set : {order:currorder}});
      //  console.log(log) 
     })

 
    //  console.log((res))
    //  await Order.updateMany({'order.isConfirmed': "confirm"},{$set : {'order.isConfirmed': "completed"}});
  }  catch (error) {  
      next(error);  
    }
}; 



// const orders = [
//   { orderNumber: '67890', productName: 'Vanilla Cake', quantity: 1, total: 20 },
//   { orderNumber: '12345', productName: 'Chocolate Cake', quantity: 2, total: 40 },
//   { orderNumber: '67890', productName: 'Vanilla Cake', quantity: 1, total: 20 },
//   { orderNumber: '67890', productName: 'Vanilla Cake', quantity: 1, total: 20 },
// ];

async function createPdf(order) {
 
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([750, 250]);
  const { width, height } = page.getSize();
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Set up content
  const content = pdfDoc.getPages()[0];
  content.drawText(`Order id: ${order.id}`, {
    x: 200,
    y: 220,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Cake Name: ${order.name}`, {
    x: 200,
    y: 200,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Flavour: ${order.flavour}`, {
    x: 200,
    y: 180,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Weight: ${order.wt}`, {
    x: 200,
    y: 160,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Quantity: ${order.amount}`, {
    x: 200,
    y: 140,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Name On Cake: ${order.bname}`, {
    x: 200,
    y: 120,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`--------------------------------------------`, {
    x: 200,
    y: 100,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Name : ${order.uname}`, {
    x: 200,
    y: 80,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Mobile No : ${order.mobileno}`, {
    x: 200,
    y: 60,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Address : ${order.address}`, {
    x: 200,
    y: 40,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  content.drawText(`Delivey Time: ${order.time}`, {
    x: 200,
    y: 20,
    size: 15,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

// Replace 'YOUR_FIREBASE_IMAGE_URL' with the actual Firebase image URL
const imageUrl = order.image[0];

const imageResponse = await fetch(imageUrl);
const imageBuffer = await imageResponse.buffer();

// // Convert the image buffer to PNG format (adjust format and options as needed)
const imageBufferPNG = await sharp(imageBuffer).toFormat('png').toBuffer();

// // Create a new PDF document
// const pdfDocc = await PDFDocument.create();
// const page = pdfDocc.addPage([400, 200]);

// // Embed the image in the PDF
const image = await pdfDoc.embedPng(imageBufferPNG);

// // Draw the image on the page
const imageSize = image.scale(0.6); // Adjust scale as needed
page.drawImage(image, {
  x: 20,
  y: 60, // Adjust position as needed
  width: imageSize.width,
  height: imageSize.height,
});




  // content.drawText(`Product Name: ${order.productName}`, {
  //   x: 50,
  //   y: height - 80,
  //   size: 18,
  //   font: helveticaFont,
  //   color: rgb(0, 0, 0),
  // });

  // content.drawText(`Quantity: ${order.quantity}`, {
  //   x: 50,
  //   y: height - 110,
  //   size: 18,
  //   font: helveticaFont,
  //   color: rgb(0, 0, 0),
  // });

  // content.drawText(`Total: $${order.total}`, {
  //   x: 50,
  //   y: height - 140,
  //   size: 18,
  //   font: helveticaFont,
  //   color: rgb(0, 0, 0),
  // });

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

export async function generateOrderPDFs(req, res) {
 
  await getAllOrders();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=orders.pdf');

  
  const pdfs = [];

  for (const order of result) {
    const pdfBytes = await createPdf(order);
    pdfs.push(pdfBytes);
  }
  
  // Merge the PDFs into a single PDF document
  const mergedPdf = await PDFDocument.create();
  for (const pdfBytes of pdfs) {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [0]);
    mergedPdf.addPage(copiedPage);
  }
  
  // Serialize the merged PDF to bytes
  const mergedPdfBytes = await mergedPdf.save();
  
  // Send the merged PDF as the response
  res.end(mergedPdfBytes);

}

