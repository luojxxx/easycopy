require("dotenv").config();
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
const Sentry = require("@sentry/node");

import {
  createUrlRoute,
  getUrlRoute,
  getUserUrlsRoute,
  deleteUserUrlRoute,
  signUpRoute,
  loginRoute,
  verifyEmailRoute,
  sendVerifyEmailRoute,
  changeEmailRoute,
  changePasswordRoute,
  changeUserNameRoute,
  signOutRoute,
  deleteAccountRoute,
  stripePaymentRoute,
  verifyRecaptchaRoute,
} from "./routes";

const app = express();
Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

app.use(Sentry.Handlers.requestHandler());
app.use(logger("dev"));
app.use(helmet());
app.use(
  cors(
    process.env.DEBUG === "true"
      ? { origin: "http://localhost:3001" }
      : { origin: "https://www.easycopy.io" }
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/create", createUrlRoute);
app.post("/verifyRecaptcha", verifyRecaptchaRoute);
app.post("/getuserurls", getUserUrlsRoute);
app.post("/deleteuserurl", deleteUserUrlRoute);
app.post("/signup", signUpRoute);
app.post("/login", loginRoute);
app.get("/verifyemail/*", verifyEmailRoute);
app.post("/sendverifyemail", sendVerifyEmailRoute);
app.post("/changeemail", changeEmailRoute);
app.post("/changepassword", changePasswordRoute);
app.post("/changeusername", changeUserNameRoute);
app.post("/signout", signOutRoute);
app.post("/deleteaccount", deleteAccountRoute);
// app.post("/payment", stripePaymentRoute);
app.get("/*", getUrlRoute); // Needs to be kept at end to avoid scooping up other get routes

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(Sentry.Handlers.errorHandler());
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
