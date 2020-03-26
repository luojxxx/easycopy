require("dotenv").config();

import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
const Sentry = require("@sentry/node");

import { createUrlRoute, getUrlRoute, stripePaymentRoute } from "./routes";

// Initialization
const app = new Koa();
const router = new Router();
Sentry.init({
  dsn: process.env.SENTRY_DSN
});

// Middleware
app.use(
  cors({
    origin: function(ctx) {
      return "*";
    }
  })
);
app.use(bodyParser());

// Routes
// router.get("/loaderio-4972e2831d525a495d3bff7e96b9182b.txt", loaderVerifyRoute);
router.post("/create", createUrlRoute);
router.post('/payment', stripePaymentRoute)
router.get("/*", getUrlRoute);

// Middleware
app.use(router.routes()).use(router.allowedMethods());
app.on("error", (err, ctx) => {
  Sentry.withScope(function(scope) {
    scope.addEventProcessor(function(event) {
      return Sentry.Handlers.parseRequest(event, ctx.request);
    });
    Sentry.captureException(err);
  });
});

// Set port
app.listen(process.env.PORT || 3000);
