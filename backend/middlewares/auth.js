import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const isAuthenticated = async (req, res, next) => {
  const  token  = req.cookies.tokenn;
  if (!token)
  {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }
   
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  next();
};

export const isAdmin = async (req, res, next) => {
  if(req.user.email===process.env.ADMIN_EMAIL && bcrypt.compare(req.user.password, process.env.ADMIN_PASSWORD))
  next();
  else
  {
  return res.status(404).json({
    success: false,
    message: "Page accessed by Admin Only",
  });
}
};