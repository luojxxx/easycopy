import express from "express";
import asyncHandler from "express-async-handler";

import { loaderVerify } from "../functions/loaderVerify";

const routes = express.Router();

routes.get("/loaderverify", asyncHandler(async (req, res, next) => {
  const { status, body } = await loaderVerify();
  res.status(status).send(body);
}));

export default routes;
