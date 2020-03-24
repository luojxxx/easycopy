"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv").config();

var main = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _db;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mongoose["default"].connect("mongodb+srv://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@easycopy.njrb5.mongodb.net/easycopy?retryWrites=true&w=majority"), {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 3:
            _db = _context.sent;
            console.info('Connected to DB');
            return _context.abrupt("return", _db);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.error('Error connecting to DB');
            console.error(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

var db = main();
var _default = db;
exports["default"] = _default;