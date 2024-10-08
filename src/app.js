require("dotenv").config();
import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
const Sentry = require("@sentry/node");

import { authentication } from "./middleware/authentication";
import accountManagementRoutes from "./routes/accountManagementRoutes";
import accountFeatureRoutes from "./routes/accountFeatureRoutes";
import recaptchaRoutes from "./routes/recaptchaRoutes";
import urlRoutes from "./routes/urlRoutes";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

const app = express();
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
app.use(authentication);
app.use("/", accountManagementRoutes);
app.use("/", accountFeatureRoutes);
app.use("/", recaptchaRoutes);
app.use("/", urlRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(Sentry.Handlers.errorHandler());
app.use(function (err, req, res, next) {
  console.log(err);

  // render the error page
  res.status(500);
  res.send("Error");
});

module.exports = app;
