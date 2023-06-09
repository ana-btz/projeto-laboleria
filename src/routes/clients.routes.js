import { Router } from "express";
import {
  createClient,
  getClientOrders,
} from "../controllers/clients.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { clientSchema } from "../schemas/client.schemas.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateSchema(clientSchema), createClient);
clientsRouter.get("/clients/:id/orders", getClientOrders);

export default clientsRouter;
