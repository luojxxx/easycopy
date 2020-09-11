import express from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";

import { createUrl } from "../functions/createUrl";
import { getUrl } from "../functions/getUrl";

import {
  genericInputLimit,
  contentLimit,
  userNameLimit,
  acceptedTypes,
} from "../constants";
import { consumeRecaptchaToken } from '../lib'

const routes = express.Router();

routes.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      recaptchaToken: Joi.string().max(genericInputLimit).required(),
      content: Joi.string().max(contentLimit).required(),
      userName: Joi.string().max(userNameLimit).allow(""),
      type: Joi.any()
        .valid(...acceptedTypes)
        .required(),
    });
    Joi.assert(req.body, schema);

    const tokenStatus = await consumeRecaptchaToken(req.body.recaptchaToken);
    if (!tokenStatus) {
      return res.status(401).send("Bad token");
    }

    const userId = req.userId;
    const content = req.body.content;
    const userName = req.body.userName;
    const type = req.body.type;

    const { status, body } = await createUrl(content, userName, type, userId);
    res.status(status).send(body);
  })
);

routes.get(
  "/*",
  asyncHandler(async (req, res, next) => {
    const path = req.path;
    const url = path.slice(1, path.length);
    Joi.assert(url, Joi.string().max(genericInputLimit).required());

    const { status, body } = await getUrl(url);
    res.status(status).send(body);
  })
);

export default routes;
