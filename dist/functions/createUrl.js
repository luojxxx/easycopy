"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrl = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _Url = _interopRequireDefault(require("../model/Url"));

var text = _fs["default"].readFileSync(_path["default"].resolve(__dirname, "../wordbank.txt"), "utf8");

var wordBank = text.trim("\n").split(",");

var createUrl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(content, user, type) {
    var wordArray, url, results;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // make sure url doesn't already exist
            results = true;

          case 1:
            if (!results) {
              _context.next = 9;
              break;
            }

            wordArray = [0, 0, 0, 0].map(function (_) {
              var idx = Math.floor(Math.random() * wordBank.length);
              var word = wordBank[idx];
              return word[0].toUpperCase() + word.substring(1);
            });
            url = wordArray.join("");
            _context.next = 6;
            return _Url["default"].findOne({
              where: {
                UrlRaw: url.toLowerCase()
              }
            });

          case 6:
            results = _context.sent;
            _context.next = 1;
            break;

          case 9:
            _context.next = 11;
            return _Url["default"].create({
              url: url,
              urlRaw: url.toLowerCase(),
              content: _cryptoJs["default"].AES.encrypt(content, process.env.ENCRYPTION_KEY).toString(),
              user: user,
              type: type
            });

          case 11:
            return _context.abrupt("return", {
              status: 200,
              body: {
                url: url
              }
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUrl(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUrl = createUrl;