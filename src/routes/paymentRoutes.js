import express from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";

import { stripePayment } from "../functions/stripePayment";

const routes = express.Router();

routes.post("/payment", asyncHandler(async (req, res, next) => {
  const schema = Joi.object().keys({
    amount: Joi.number().integer().required(),
  });
  Joi.assert(req.body, schema);

  const amount = req.body.amount;

  const { status, body } = await stripePayment(amount);
  res.status(status).send(body);
}));

export default routes;
