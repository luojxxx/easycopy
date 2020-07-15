"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _db = _interopRequireDefault(require("./../db"));

var UrlSchema = _db["default"].define("Url", {
  urlId: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true
  },
  url: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  urlRaw: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: _sequelize.DataTypes.STRING(10000),
    allowNull: false
  },
  type: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: _sequelize.DataTypes.DATE,
    "default": Date.now
  },
  expiredAt: {
    type: _sequelize.DataTypes.DATE
  },
  user: {
    type: _sequelize.DataTypes.STRING(256),
    "default": ""
  },
  userId: {
    type: _sequelize.DataTypes.STRING
  }
}, {// Other model options go here
});

var _default = UrlSchema;
exports["default"] = _default;