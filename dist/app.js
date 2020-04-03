"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _routes = require("./routes");

require("dotenv").config();

var Sentry = require("@sentry/node");

var app = (0, _express["default"])();
Sentry.init({
  dsn: process.env.SENTRY_DSN
});
app.use(Sentry.Handlers.requestHandler());
app.use((0, _morgan["default"])("dev"));
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])(process.env.DEBUG === 'false' ? {
  origin: "http://localhost:3001"
} : {
  origin: "https://www.easycopy.io"
}));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.post("/create", _routes.createUrlRoute);
app.post("/payment", _routes.stripePaymentRoute);
app.get("/*", _routes.getUrlRoute); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(Sentry.Handlers.errorHandler());
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;