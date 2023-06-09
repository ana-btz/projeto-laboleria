import Joi from "joi";

export const orderSchema = Joi.object({
  clientId: Joi.number().required(),
  cakeId: Joi.number().required(),
  quantity: Joi.number().integer().min(1).max(4).required(),
  totalPrice: Joi.number().required(),
});
