import express from "express";
import asyncHandler from "express-async-handler";
import Joi from "joi";

import { signUp } from "../functions/signUp";
import { login } from "../functions/login";
import { checkUser } from "../functions/checkUser";
import { verifyEmail } from "../functions/verifyEmail";
import { sendVerificationEmail } from "../functions/sendVerificationEmail";
import { changeEmail } from "../functions/changeEmail";
import { changePassword } from "../functions/changePassword";
import { changeUserName } from "../functions/changeUserName";
import { signOut } from "../functions/signOut";
import { sendResetPasswordEmail } from "../functions/sendResetPasswordEmail";
import { resetPassword } from "../functions/resetPassword";
import { deleteAccount } from "../functions/deleteAccount";

import {
  genericInputLimit,
  userNameLimit,
} from "../constants";
import { consumeRecaptchaToken } from "../lib";

const routes = express.Router();

routes.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      recaptchaToken: Joi.string().max(genericInputLimit).required(),
      email: Joi.string().max(genericInputLimit).email().required(),
      password: Joi.string().max(genericInputLimit).required(),
      userName: Joi.string().max(genericInputLimit).allow(""),
    });
    Joi.assert(req.body, schema);

    const tokenStatus = await consumeRecaptchaToken(req.body.recaptchaToken);
    if (!tokenStatus) {
      return res.status(401).send("Bad token");
    }

    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;

    const { status, body } = await signUp(email, password, userName);
    res.status(status).send(body);
  })
);

routes.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      email: Joi.string().max(genericInputLimit).email().required(),
      password: Joi.string().max(genericInputLimit).required(),
    });
    Joi.assert(req.body, schema);

    const email = req.body.email;
    const password = req.body.password;

    const { status, body } = await login(email, password);
    res.status(status).send(body);
  })
);

routes.post(
  "/checkuser",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    const { status, body } = await checkUser(userId);
    res.status(status).send(body);
  })
);

routes.get(
  "/verifyemail/*",
  asyncHandler(async (req, res, next) => {
    const verificationToken = req.path.replace("/verifyemail/", "");
    Joi.assert(
      verificationToken,
      Joi.string().max(genericInputLimit).required()
    );

    const { status, body } = await verifyEmail(verificationToken);
    if (status === 200) {
      res.redirect("https://www.easycopy.io/EmailVerified");
    } else {
      res.status(status).send(body);
    }
  })
);

routes.post(
  "/sendverifyemail",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      email: Joi.string().max(genericInputLimit).email().required(),
    });
    Joi.assert(req.body, schema);

    const userId = req.userId;
    const email = req.body.email;

    const { status, body } = await sendVerificationEmail(userId, email);
    res.status(status).send(body);
  })
);

routes.post(
  "/changeemail",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      newEmail: Joi.string().max(genericInputLimit).email().required(),
    });
    Joi.assert(req.body, schema);

    const userId = req.userId;
    const newEmail = req.body.newEmail;

    const { status, body } = await changeEmail(userId, newEmail);
    res.status(status).send(body);
  })
);

routes.post(
  "/changepassword",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      oldPassword: Joi.string().max(genericInputLimit).required(),
      newPassword: Joi.string().max(genericInputLimit).required(),
    });
    Joi.assert(req.body, schema);

    const userId = req.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const { status, body } = await changePassword(
      userId,
      oldPassword,
      newPassword
    );
    res.status(status).send(body);
  })
);

routes.post(
  "/changeusername",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      newUserName: Joi.string().max(userNameLimit).required(),
    });
    Joi.assert(req.body, schema);

    const userId = req.userId;
    const newUserName = req.body.newUserName;

    const { status, body } = await changeUserName(userId, newUserName);
    res.status(status).send(body);
  })
);

routes.post(
  "/signout",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    const { status, body } = await signOut(userId);
    res.status(status).send(body);
  })
);

routes.post(
  "/sendresetpasswordemail",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      recaptchaToken: Joi.string().max(genericInputLimit).required(),
      email: Joi.string().max(genericInputLimit).email().required(),
    });
    Joi.assert(req.body, schema);

    const tokenStatus = await consumeRecaptchaToken(req.body.recaptchaToken);
    if (!tokenStatus) {
      return res.status(401).send("Bad token");
    }

    const email = req.body.email;

    const { status, body } = await sendResetPasswordEmail(email);
    res.status(status).send(body);
  })
);

routes.post(
  "/resetpassword",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      resetPasswordToken: Joi.string().max(genericInputLimit).required(),
      newPassword: Joi.string().max(genericInputLimit).required(),
    });
    Joi.assert(req.body, schema);

    const resetPasswordToken = req.body.resetPasswordToken;
    const newPassword = req.body.newPassword;

    const { status, body } = await resetPassword(
      resetPasswordToken,
      newPassword
    );
    res.status(status).send(body);
  })
);

routes.post(
  "/deleteaccount",
  asyncHandler(async (req, res, next) => {
    const schema = Joi.object().keys({
      password: Joi.string().max(genericInputLimit).required(),
    });
    Joi.assert(req.body, schema);

    const userId = req.userId;
    const password = req.body.password;

    const { status, body } = await deleteAccount(userId, password);
    res.status(status).send(body);
  })
);

export default routes;
