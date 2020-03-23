require("dotenv").config();

import Koa from "koa";
import Router from "@koa/router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
const Sentry = require("@sentry/node");

import { createUrlRoute } from "./routes";
import { getUrlRoute } from "./routes";

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
router.post("/", createUrlRoute);
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
