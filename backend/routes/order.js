import express from "express";
import  {payment,getAllOrders,confirmOrder,getOrdersByUserEmail,getAdminOrders,cancelOrders,getCancelOrders} from "../controllers/order.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { generateOrderPDFs } from "../controllers/orderPdfGenerator.js";
const router = express.Router();

router.post('/process-payment',isAuthenticated,payment);
router.get('/allOrders',getAllOrders);
router.post('/viewOrders',getOrdersByUserEmail);
router.post('/confirmOrder',confirmOrder);
router.get('/generatepdf',generateOrderPDFs);
router.get('/adminOrders',getAdminOrders);
router.post('/cancelOrders',cancelOrders);
router.get('/cancelOrders',getCancelOrders );


export default router;