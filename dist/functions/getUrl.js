"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrl = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cryptoJs = _interopRequireDefault(require("crypto-js"));

var _Url = _interopRequireDefault(require("../model/Url"));

var getUrl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var result, data, byteContent, content;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Url["default"].findOne({
              where: {
                urlRaw: url.toLowerCase()
              }
            });

          case 2:
            result = _context.sent;

            if (result) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", {
              status: 404,
              body: {
                msg: "",
                content: "",
                user: "",
                type: "",
                createdAt: ""
              }
            });

          case 5:
            data = result.dataValues;
            byteContent = _cryptoJs["default"].AES.decrypt(data.content, process.env.ENCRYPTION_KEY);
            content = byteContent.toString(_cryptoJs["default"].enc.Utf8);
            return _context.abrupt("return", {
              status: 200,
              body: {
                msg: "",
                url: data.url,
                createdAt: data.createdAt,
                user: data.user,
                type: data.type,
                content: content
              }
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUrl = getUrl;