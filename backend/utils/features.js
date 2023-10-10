import jwt from "jsonwebtoken";

export const sendCookie = (user, res,isAdmin, message, statusCode = 200) => {
  const tokenn = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("tokenn", tokenn, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    }
   )
    .json({
      success: true,
      isAdmin,
      message,
      token:tokenn,
    });
};