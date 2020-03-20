"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _db = _interopRequireDefault(require("../db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose.default.Schema;
const UrlSchema = new Schema({
  url: String,
  content: String,
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    default: ""
  }
});

var _default = _mongoose.default.model("url", UrlSchema);

exports.default = _default;