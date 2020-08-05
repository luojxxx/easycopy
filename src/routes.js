import asyncHandler from "express-async-handler";

import { contentLimit, userNameLimit, acceptedTypes } from "./constants";
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
import { signUp } from "./functions/signUp";
import { login } from './functions/login';
import { verifyEmail } from './functions/verifyEmail'
import { sendVerificationEmail } from "./functions/sendVerificationEmail";
import { changeEmail } from './functions/changeEmail'
import { changePassword } from './functions/changePassword'
import { deleteAccount } from './functions/deleteAccount'
import { stripePayment } from "./functions/stripePayment";
import { loaderVerify } from "./functions/loaderVerify";
import User from "./model/UserToken";

const auth = async (req) => {
  const user = await User.findOne({ where: { userToken: req.body.userToken }});
  return user.userId
}

const sendResponse = (result, res) => {
  if (result) {
    const { status, body } = result;
    res.status(status).send(body);
  }
};

export const createUrlRoute = asyncHandler(async (req, res, next) => {
  const expectedArgs = ["content", "userName", "type"];
  sendResponse(bodyContains(expectedArgs, req.body), res);
  sendResponse(bodyContainsStrings(expectedArgs, req.body), res);
  const content = req.body.content;
  const userName = req.body.userName;
  const type = req.body.type;
  sendResponse(lessThanLength({ content: contentLimit }, content), res);
  sendResponse(lessThanLength({ userName: userNameLimit }, userName), res);
  sendResponse(oneOfType(acceptedTypes, type), res);

  const { status, body } = await createUrl(content, userName, type);
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

export const signUpRoute = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;

  const { status, body } = await signUp(email, password, userName);
  res.status(status).send(body);
});

export const loginRoute = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const { status, body } = await login(email, password);
  res.status(status).send(body);
});

export const verifyEmailRoute = asyncHandler(async (req, res, next) => {
  const path = req.path;
  const verificationToken = path.slice(1, path.length);

  const { status, body } = await verifyEmail(verificationToken);
  res.status(status).send(body);
});

export const sendVerifyEmailRoute = asyncHandler(async (req, res, next) => {
  const userId = await auth(req)

  const { status, body } = await sendVerificationEmail(userId);
  res.status(status).send(body);
});

export const changeEmailRoute = asyncHandler(async (req, res, next) => {
  const userId = await auth(req);
  const newEmail = req.body.newEmail

  const { status, body } = await changeEmail(userId, newEmail);
  res.status(status).send(body);
});

export const changePasswordRoute = asyncHandler(async (req, res, next) => {
  const userId = await auth(req);
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const { status, body } = await changePassword(userId, oldPassword, newPassword);
  res.status(status).send(body);
});

export const deleteAccountRoute = asyncHandler(async (req, res, next) => {
  const userId = await auth(req);
  const password = req.body.password;

  const { status, body } = await deleteAccount(userId, password);
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
