"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loaderVerifyRoute = exports.stripePaymentRoute = exports.verifyRecaptchaRoute = exports.getUrlRoute = exports.createUrlRoute = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _constants = require("./constants");

var _createUrl = require("./functions/createUrl");

var _getUrl = require("./functions/getUrl");

var _verifyRecaptcha = require("./functions/verifyRecaptcha");

var _stripePayment = require("./functions/stripePayment");

var _loaderVerify = require("./functions/loaderVerify");

var sendResponse = function sendResponse(result, res) {
  if (result) {
    var status = result.status,
        body = result.body;
    res.status(status).send(body);
  }
};

var bodyContains = function bodyContains(expected, actual) {
  if (!expected.every(function (key) {
    return Object.keys(actual).includes(key);
  })) {
    return {
      status: 400,
      body: {
        msg: 'Missing arguments'
      }
    };
  }
};

var bodyContainsStrings = function bodyContainsStrings(expected, actual) {
  if (!expected.every(function (key) {
    return typeof actual[key] === "string";
  })) {
    return {
      status: 400,
      body: {
        msg: 'Invalid arguments'
      }
    };
  }
};

var bodyContainsInt = function bodyContainsInt(expected, actual) {
  if (!expected.every(function (key) {
    return Number.isInteger(actual[key]);
  })) {
    return {
      status: 400,
      body: {
        msg: 'Invalid arguments'
      }
    };
  }
};

var isString = function isString(actual) {
  if (typeof actual !== "string") {
    return {
      status: 400,
      body: {
        msg: 'Invalid arguments'
      }
    };
  }
};

var lessThanLength = function lessThanLength(limit, actual) {
  var limitName = Object.keys(limit);
  var limitValue = limit[limitName[0]];

  if (actual.length > limitValue) {
    return {
      status: 400,
      body: {
        msg: "".concat(limitName, " is longer than the ").concat(limitValue, " limit"),
        url: ""
      }
    };
  }
};

var oneOfType = function oneOfType(expectedTypes, actual) {
  if (!expectedTypes.includes(actual)) {
    return {
      status: 400,
      body: {
        msg: "Type needs to be (".concat(expectedTypes, "), got ").concat(actual, " instead"),
        url: ""
      }
    };
  }
};

var createUrlRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var expectedArgs, content, user, type, _yield$createUrl, status, body;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expectedArgs = ["content", "user", "type"];
            sendResponse(bodyContains(expectedArgs, req.body), res);
            sendResponse(bodyContainsStrings(expectedArgs, req.body), res);
            content = req.body.content;
            user = req.body.user;
            type = req.body.type;
            sendResponse(lessThanLength({
              Content: _constants.contentLimit
            }, content), res);
            sendResponse(lessThanLength({
              User: _constants.userLimit
            }, user), res);
            sendResponse(oneOfType(_constants.acceptedTypes, type), res);
            _context.next = 11;
            return (0, _createUrl.createUrl)(content, user, type);

          case 11:
            _yield$createUrl = _context.sent;
            status = _yield$createUrl.status;
            body = _yield$createUrl.body;
            res.status(status).send(body);

          case 15:
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
            sendResponse(isString(url), res);
            _context2.next = 5;
            return (0, _getUrl.getUrl)(url);

          case 5:
            _yield$getUrl = _context2.sent;
            status = _yield$getUrl.status;
            body = _yield$getUrl.body;
            res.status(status).send(body);

          case 9:
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
var verifyRecaptchaRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var token, _yield$verifyRecaptch, status, body;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.body.token;
            _context3.next = 3;
            return (0, _verifyRecaptcha.verifyRecaptcha)(token);

          case 3:
            _yield$verifyRecaptch = _context3.sent;
            status = _yield$verifyRecaptch.status;
            body = _yield$verifyRecaptch.body;
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
exports.verifyRecaptchaRoute = verifyRecaptchaRoute;
var stripePaymentRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var expectedArgs, amount, _yield$stripePayment, status, body;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            expectedArgs = ["amount"];
            sendResponse(bodyContains(expectedArgs, req.body), res);
            sendResponse(bodyContainsInt(expectedArgs, req.body), res);
            amount = ctx.request.body.amount;
            _context4.next = 6;
            return (0, _stripePayment.stripePayment)(amount);

          case 6:
            _yield$stripePayment = _context4.sent;
            status = _yield$stripePayment.status;
            body = _yield$stripePayment.body;
            res.status(status).send(body);

          case 10:
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
exports.stripePaymentRoute = stripePaymentRoute;
var loaderVerifyRoute = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var _yield$loaderVerify, status, body;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _loaderVerify.loaderVerify)();

          case 2:
            _yield$loaderVerify = _context5.sent;
            status = _yield$loaderVerify.status;
            body = _yield$loaderVerify.body;
            res.status(status).send(body);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
exports.loaderVerifyRoute = loaderVerifyRoute;