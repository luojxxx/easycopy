import asyncHandler from "express-async-handler";

import { createUrl } from "./functions/createUrl";
import { getUrl } from "./functions/getUrl";
import { stripePayment } from "./functions/stripePayment";
import { loaderVerify } from "./functions/loaderVerify";

export const createUrlRoute = asyncHandler(async (req, res, next) => {
  const content = req.body.content;
  const user = req.body.user;
  const type = req.body.type;

  const { status, body } = await createUrl(content, user, type);

  res.status(status).send(body);
});

export const getUrlRoute = asyncHandler(async (req, res, next) => {
  const path = req.path;
  const url = path.slice(1, path.length);

  const { status, body } = await getUrl(url);

  res.status(status).send(body);
});

export const stripePaymentRoute = asyncHandler(async (req, res, next) => {
  const amount = ctx.request.body.amount;

  const { status, body } = await stripePayment(amount);

  res.status(status).send(body);
});

export const loaderVerifyRoute = asyncHandler(async (req, res, next) => {
  const { status, body } = await loaderVerify();

  res.status(status).send(body);
});
