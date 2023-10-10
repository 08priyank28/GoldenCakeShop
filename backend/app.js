import express from "express";
import userRouter from "./routes/user.js";
import cakeRouter from "./routes/cake.js";
import orderRouter from "./routes/order.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { isAuthenticated } from "./middlewares/auth.js"; 
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
  
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL] ,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));;




// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cakes", cakeRouter);
app.use("/api/v1/orders", orderRouter);
app.get('/', function (req, res) {
  res.json("backend working")
})

// Using Error Middleware
app.use(isAuthenticated);
app.use(errorMiddleware);