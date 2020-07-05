"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

require("dotenv").config();

var db = new _sequelize.Sequelize(process.env.DB_STRING, {
  dialect: "postgres",
  protocol: "postgres" // dialectOptions: {
  //   ssl: true,
  // },

});

var dbCheck = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.authenticate();

          case 3:
            console.log("Connection has been established successfully.");
            _context.next = 6;
            return db.sync({
              force: process.env.DB_SYNC
            });

          case 6:
            console.log("Models are synchronized");
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.error("Unable to connect to the database:", _context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function dbCheck() {
    return _ref.apply(this, arguments);
  };
}();

dbCheck();
var _default = db;
exports["default"] = _default;