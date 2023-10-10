import express from "express";
import { addCake,deleteCake,getAllCakes,getCakebyId,uploadController } from "../controllers/cake.js";

const router = express.Router();

router.post("/addcake", addCake);
router.post("/deletecake", deleteCake);

router.get("/allcakes", getAllCakes);

router.get("/:id", getCakebyId);

router.post('/upload', uploadController);

export default router;