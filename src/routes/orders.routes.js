import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/orders.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { orderSchema } from "../schemas/order.schemas.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateSchema(orderSchema), createOrder);
ordersRouter.get("/orders", getAllOrders);
ordersRouter.get("/orders/:id", getOrderById);

export default ordersRouter;
