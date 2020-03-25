"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _router = _interopRequireDefault(require("@koa/router"));

var _cors = _interopRequireDefault(require("@koa/cors"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _routes = require("./routes");

require("dotenv").config();

var Sentry = require("@sentry/node");

// Initialization
var app = new _koa["default"]();
var router = new _router["default"]();
Sentry.init({
  dsn: process.env.SENTRY_DSN
}); // Middleware

app.use((0, _cors["default"])({
  origin: function origin(ctx) {
    return "*";
  }
}));
app.use((0, _koaBodyparser["default"])()); // Routes

router.get("/loaderio-4972e2831d525a495d3bff7e96b9182b.txt", _routes.loaderVerifyRoute);
router.post("/", _routes.createUrlRoute);
router.get("/*", _routes.getUrlRoute); // Middleware

app.use(router.routes()).use(router.allowedMethods());
app.on("error", function (err, ctx) {
  Sentry.withScope(function (scope) {
    scope.addEventProcessor(function (event) {
      return Sentry.Handlers.parseRequest(event, ctx.request);
    });
    Sentry.captureException(err);
  });
}); // Set port

app.listen(process.env.PORT || 3000);