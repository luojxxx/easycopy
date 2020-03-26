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

var _Url = _interopRequireDefault(require("../model/Url"));

var text = _fs["default"].readFileSync(_path["default"].resolve(__dirname, "../wordbank.txt"), "utf8");

var wordBank = text.trim("\n").split(",");
var contentLimit = 10000;
var userLimit = 256;

var createUrl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(content, user) {
    var url, results, wordArray, instance, saved;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(content.length > contentLimit)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", {
              status: 400,
              body: {
                msg: "Content is longer than the ".concat(contentLimit, " limit"),
                url: ""
              }
            });

          case 2:
            if (!(user.length > userLimit)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", {
              status: 400,
              body: {
                msg: "User is longer than the ".concat(userLimit, " limit"),
                url: ""
              }
            });

          case 4:
            results = true;

          case 5:
            if (!results) {
              _context.next = 13;
              break;
            }

            wordArray = [0, 0, 0, 0].map(function (_) {
              return wordBank[Math.floor(Math.random() * wordBank.length)];
            });
            url = wordArray.join("-");
            _context.next = 10;
            return _Url["default"].findOne({
              url: url
            });

          case 10:
            results = _context.sent;
            _context.next = 5;
            break;

          case 13:
            instance = new _Url["default"]({
              url: url.toLowerCase(),
              content: content,
              user: user
            });
            _context.next = 16;
            return instance.save();

          case 16:
            saved = _context.sent;
            return _context.abrupt("return", {
              status: 200,
              body: {
                msg: "",
                url: url
              }
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUrl(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUrl = createUrl;