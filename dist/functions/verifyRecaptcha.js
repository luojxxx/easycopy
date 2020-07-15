"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRecaptcha = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var verifyRecaptcha = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var recaptchaResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _axios["default"])({
              method: "get",
              url: "https://www.google.com/recaptcha/api/siteverify",
              params: {
                secret: process.env.RECAPTCHA_SECRET,
                response: token
              }
            });

          case 2:
            recaptchaResult = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              body: {
                data: recaptchaResult.data
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyRecaptcha(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyRecaptcha = verifyRecaptcha;