import express from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";

import { verifyRecaptcha } from "../functions/verifyRecaptcha";
import { genericInputLimit } from "../constants";

const routes = express.Router();

routes.post(
  "/verifyRecaptcha",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      token: Joi.string().max(genericInputLimit).required(),
    });
    Joi.assert(req.body, schema);

    const token = req.body.token;

    const { status, body } = await verifyRecaptcha(token);
    res.status(status).send(body);
  })
);

export default routes;
