"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loaderVerifyRoute = exports.stripePaymentRoute = exports.getUrlRoute = exports.createUrlRoute = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _createUrl = require("./functions/createUrl");

var _getUrl = require("./functions/getUrl");

var _stripePayment = require("./functions/stripePayment");

var _loaderVerify = require("./functions/loaderVerify");

var createUrlRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var content, user, type, _yield$createUrl, status, body;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            content = req.body.content;
            user = req.body.user;
            type = req.body.type;
            _context.next = 5;
            return (0, _createUrl.createUrl)(content, user, type);

          case 5:
            _yield$createUrl = _context.sent;
            status = _yield$createUrl.status;
            body = _yield$createUrl.body;
            res.status(status).send(body);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
exports.createUrlRoute = createUrlRoute;
var getUrlRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var path, url, _yield$getUrl, status, body;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            path = req.path;
            url = path.slice(1, path.length);
            _context2.next = 4;
            return (0, _getUrl.getUrl)(url);

          case 4:
            _yield$getUrl = _context2.sent;
            status = _yield$getUrl.status;
            body = _yield$getUrl.body;
            res.status(status).send(body);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
exports.getUrlRoute = getUrlRoute;
var stripePaymentRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var amount, _yield$stripePayment, status, body;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            amount = ctx.request.body.amount;
            _context3.next = 3;
            return (0, _stripePayment.stripePayment)(amount);

          case 3:
            _yield$stripePayment = _context3.sent;
            status = _yield$stripePayment.status;
            body = _yield$stripePayment.body;
            res.status(status).send(body);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
exports.stripePaymentRoute = stripePaymentRoute;
var loaderVerifyRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var _yield$loaderVerify, status, body;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _loaderVerify.loaderVerify)();

          case 2:
            _yield$loaderVerify = _context4.sent;
            status = _yield$loaderVerify.status;
            body = _yield$loaderVerify.body;
            res.status(status).send(body);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
exports.loaderVerifyRoute = loaderVerifyRoute;