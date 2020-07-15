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

var SSL = process.env.DB_SSL_OFF ? {} : {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
};
var db = new _sequelize.Sequelize(process.env.DB_STRING, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: SSL
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

            if (!process.env.DB_SYNC) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return db.sync({
              force: true
            });

          case 7:
            console.log("Models are synchronized");

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.error("Unable to connect to the database:", _context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function dbCheck() {
    return _ref.apply(this, arguments);
  };
}();

dbCheck();
var _default = db;
exports["default"] = _default;