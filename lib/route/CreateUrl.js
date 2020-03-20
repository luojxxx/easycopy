"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUrl = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _Url = _interopRequireDefault(require("../model/Url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const text = _fs.default.readFileSync(_path.default.resolve(__dirname, "../../wordbank.txt"), "utf8");

const wordBank = text.trim("\n").split(",");

const createUrl = async (ctx, next) => {
  try {
    const wordArray = [0, 0, 0, 0].map(_ => wordBank[Math.floor(Math.random() * wordBank.length)]);
    const url = wordArray.join("-");
    const content = ctx.request.body.content;
    const user = ctx.request.body.user;
    const instance = new _Url.default({
      url: url,
      content: content,
      user: user
    });
    const saved = await instance.save();
    ctx.status = 200;
    ctx.body = {
      url: url
    };
  } catch (err) {
    console.error("CreateUrl error");
    console.error(err);
    ctx.status = 500;
    ctx.body = {
      url: ""
    };
  }
};

exports.createUrl = createUrl;