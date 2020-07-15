import asyncHandler from "express-async-handler";

import { contentLimit, userLimit, acceptedTypes } from "./constants";
import {
  bodyContains,
  bodyContainsStrings,
  bodyContainsInt,
  isString,
  lessThanLength,
  oneOfType,
} from "./verification";
import { createUrl } from "./functions/createUrl";
import { getUrl } from "./functions/getUrl";
import { verifyRecaptcha } from "./functions/verifyRecaptcha";
import { stripePayment } from "./functions/stripePayment";
import { loaderVerify } from "./functions/loaderVerify";

const sendResponse = (result, res) => {
  if (result) {
    const { status, body } = result;
    res.status(status).send(body);
  }
};

export const createUrlRoute = asyncHandler(async (req, res, next) => {
  const expectedArgs = ["content", "user", "type"];
  sendResponse(bodyContains(expectedArgs, req.body), res);
  sendResponse(bodyContainsStrings(expectedArgs, req.body), res);
  const content = req.body.content;
  const user = req.body.user;
  const type = req.body.type;
  sendResponse(lessThanLength({ Content: contentLimit }, content), res);
  sendResponse(lessThanLength({ User: userLimit }, user), res);
  sendResponse(oneOfType(acceptedTypes, type), res);

  const { status, body } = await createUrl(content, user, type);
  res.status(status).send(body);
});

export const getUrlRoute = asyncHandler(async (req, res, next) => {
  const path = req.path;
  const url = path.slice(1, path.length);
  sendResponse(isString(url), res);

  const { status, body } = await getUrl(url);
  res.status(status).send(body);
});

export const verifyRecaptchaRoute = asyncHandler(async (req, res, next) => {
  const token = req.body.token;

  const { status, body } = await verifyRecaptcha(token);
  res.status(status).send(body);
});

export const stripePaymentRoute = asyncHandler(async (req, res, next) => {
  const expectedArgs = ["amount"];
  sendResponse(bodyContains(expectedArgs, req.body), res);
  sendResponse(bodyContainsInt(expectedArgs, req.body), res);
  const amount = ctx.request.body.amount;

  const { status, body } = await stripePayment(amount);
  res.status(status).send(body);
});

export const loaderVerifyRoute = asyncHandler(async (req, res, next) => {
  const { status, body } = await loaderVerify();
  res.status(status).send(body);
});
