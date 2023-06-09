import { Router } from "express";
import { createCake } from "../controllers/cakes.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { cakeSchema } from "../schemas/cake.schemas.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateSchema(cakeSchema), createCake);

export default cakesRouter;
