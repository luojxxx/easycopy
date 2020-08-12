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
import { getUserUrls } from "./functions/getUserUrls";
import { deleteUserUrl } from "./functions/deleteUserUrl";
import { signUp } from "./functions/signUp";
import { login } from "./functions/login";
import { checkUser } from "./functions/checkUser";
import { verifyEmail } from "./functions/verifyEmail";
import { sendVerificationEmail } from "./functions/sendVerificationEmail";
import { changeEmail } from "./functions/changeEmail";
import { changePassword } from "./functions/changePassword";
import { changeUserName } from "./functions/changeUserName";
import { signOut } from "./functions/signOut";
import { sendResetPasswordEmail } from "./functions/sendResetPasswordEmail";
import { resetPassword } from "./functions/resetPassword";
import { deleteAccount } from "./functions/deleteAccount";
import { stripePayment } from "./functions/stripePayment";
import { loaderVerify } from "./functions/loaderVerify";
import RecaptchaToken from "./model/RecaptchaToken";

const sendResponse = (result, res) => {
  if (result) {
    const { status, body } = result;
    res.status(status).send(body);
  }
};

const consumeRecaptchaToken = async (token) => {
  const consumeToken = await RecaptchaToken.destroy({
    where: {
      recaptchaToken: token,
    },
  });
  return consumeToken == true
}

export const createUrlRoute = asyncHandler(async (req, res, next) => {
  const tokenStatus = await consumeRecaptchaToken(req.body.recaptchaToken);
  if (!tokenStatus) {
    return res.status(401).send("Bad token");
  }

  const userId = req.userId;
  const content = req.body.content;
  const userName = req.body.userName;
  const type = req.body.type;
  sendResponse(lessThanLength({ content: contentLimit }, content), res);
  sendResponse(lessThanLength({ userName: userNameLimit }, userName), res);
  sendResponse(oneOfType(acceptedTypes, type), res);

  const { status, body } = await createUrl(
    content,
    userName,
    type,
    userId
  );
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

export const getUserUrlsRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const { status, body } = await getUserUrls(userId);
  res.status(status).send(body);
});

export const deleteUserUrlRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const urlId = req.body.urlId;

  const { status, body } = await deleteUserUrl(userId, urlId);
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

export const checkUserRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const { status, body } = await checkUser(userId);
  res.status(status).send(body);
});

export const verifyEmailRoute = asyncHandler(async (req, res, next) => {
  const verificationToken = req.path.replace("/verifyemail/", "");

  const { status, body } = await verifyEmail(verificationToken);
  if (status === 200) {
    res.redirect("https://www.easycopy.io/EmailVerified");
  } else {
    res.status(status).send(body);
  }
});

export const sendVerifyEmailRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const email = req.body.email;

  const { status, body } = await sendVerificationEmail(userId, email);
  res.status(status).send(body);
});

export const changeEmailRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const newEmail = req.body.newEmail;

  const { status, body } = await changeEmail(userId, newEmail);
  res.status(status).send(body);
});

export const changePasswordRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const { status, body } = await changePassword(
    userId,
    oldPassword,
    newPassword
  );
  res.status(status).send(body);
});

export const changeUserNameRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const newUserName = req.body.newUserName;

  const { status, body } = await changeUserName(userId, newUserName);
  res.status(status).send(body);
});

export const signOutRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const { status, body } = await signOut(userId);
  res.status(status).send(body);
});

export const sendResetPasswordEmailRoute = asyncHandler(
  async (req, res, next) => {
    const email = req.body.email;

    const { status, body } = await sendResetPasswordEmail(email);
    res.status(status).send(body);
  }
);

export const resetPasswordRoute = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = req.body.resetPasswordToken;
  const newPassword = req.body.newPassword;

  const { status, body } = await resetPassword(resetPasswordToken, newPassword);
  res.status(status).send(body);
});

export const deleteAccountRoute = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
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
