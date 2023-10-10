import express from "express";
import { getMyProfile, login, logout, register,getAllUsers,changeRole,getNameByEmail } from "../controllers/user.js";
import { isAuthenticated,isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);
router.get("/allusers",isAuthenticated,isAdmin,getAllUsers);
router.get("/changeRole",isAuthenticated,isAdmin,changeRole);
router.post("/getnamebyemail",getNameByEmail)
export default router;