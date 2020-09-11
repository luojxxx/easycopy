import express from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";

import { getUserUrls } from "../functions/getUserUrls";
import { deleteUserUrl } from "../functions/deleteUserUrl";

import {
  genericInputLimit,
} from "../constants";

const routes = express.Router();

routes.post(
  "/getuserurls",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      page: Joi.string().max(genericInputLimit).required(),
    });
    Joi.assert(req.query, schema);

    const userId = req.userId;
    const page = req.query.page;

    const { status, body } = await getUserUrls(userId, page);
    res.status(status).send(body);
  })
);

routes.post(
  "/deleteuserurl",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      urlId: Joi.string().max(genericInputLimit).required(),
    });
    Joi.assert(req.body, schema);

    const userId = req.userId;
    const urlId = req.body.urlId;

    const { status, body } = await deleteUserUrl(userId, urlId);
    res.status(status).send(body);
  })
);

export default routes;
