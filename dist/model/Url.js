"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = _interopRequireDefault(require("../db"));

var Schema = _mongoose["default"].Schema;
var UrlSchema = new Schema({
  url: String,
  content: String,
  type: String,
  createdAt: {
    type: Date,
    "default": Date.now
  },
  user: {
    type: String,
    "default": ""
  }
});

var _default = _mongoose["default"].model("url", UrlSchema);

exports["default"] = _default;