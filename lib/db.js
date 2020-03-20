"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

const main = async () => {
  try {
    const db = await _mongoose.default.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@easycopy.njrb5.mongodb.net/easycopy?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.info('Connected to DB');
    return db;
  } catch (err) {
    console.error('Error connecting to DB');
    console.error(err);
  }
};

const db = main();
var _default = db;
exports.default = _default;