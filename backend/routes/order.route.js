import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  userOrders,
  verifyStripe,
} from "../controllers/order.controller.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

orderRouter.get("/userOrders", authUser, userOrders);

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
