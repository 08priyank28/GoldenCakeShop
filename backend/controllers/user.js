import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import moment from 'moment';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));
    
    let isAdmin=false;
    if(email===process.env.ADMIN_EMAIL && bcrypt.compare(password, process.env.ADMIN_PASSWORD))
      isAdmin=true;
    sendCookie(user, res,isAdmin, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res,next) => {
  try {
   
    const { name, email,mobileno,date, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email,mobileno,date, password: hashedPassword });

    sendCookie(user, res,false, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const getNameByEmail = async (req, res) => {
  const {email}=req.body;
  let user=await User.findOne({email:email})
  if(user)
 {
  res.status(200).json({
    success: true,
    userName: user.name
  });
}
};




export const getAllUsers=async (req, res, next) => {
  try {
    const currentDate = moment().startOf('day');
    const users = await User.find().lean();

    // Sort users based on the upcoming birthday
    const sortedUsers = users.sort((userA, userB) => {
      const birthdateA = moment(userA.date).startOf('day');  
      const birthdateB = moment(userB.date).startOf('day');
     
      // Calculate the upcoming birthday for the current year
      const nextBirthdayA = moment(birthdateA).year(moment().year());
      const nextBirthdayB = moment(birthdateB).year(moment().year());
     
      // Calculate the difference between upcoming birthdays and the current date
      const diffA = nextBirthdayA.diff(currentDate, 'days');
      const diffB = nextBirthdayB.diff(currentDate, 'days');

      // Handle cases where the upcoming birthday is before the current date
      if (diffA < 0 && diffB < 0) {
        return diffA - diffB; // Sort in ascending order of the difference
      } else if (diffA < 0) {
        return 1; // Place userA after userB
      } else if (diffB < 0) {
        return -1; // Place userA before userB
      }

      return diffA - diffB; // Sort in ascending order of the difference
    });
    const formattedUsers = sortedUsers.map(user => ({
      ...user,
      date: moment(user.date).format('YYYY-MM-DD')
    }));

    res.json(formattedUsers);
  }  catch (error) {
      next(error);
    }
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("tokenn", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

export const changeRole = async (req, res) => {
  try {
   
    const { email } = req.body;

    let user = await User.findOne({ email });
    user.role="Employee";
    user.save();

    res.json({
      success:true,
      message:"role changed succesfully",
    })

  } catch (error) {
    next(error);
  }
};



