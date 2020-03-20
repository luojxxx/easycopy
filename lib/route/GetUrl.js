"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrl = void 0;

var _Url = _interopRequireDefault(require("../model/Url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUrl = async (ctx, next) => {
  try {
    const path = ctx.request.path;
    const url = path.slice(1, path.length);
    const result = await _Url.default.findOne({
      url: url
    });

    if (!result) {
      ctx.status = 404;
      ctx.body = {
        content: "",
        user: ""
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        content: result.content,
        user: result.user
      };
    }
  } catch (err) {
    console.error("CreateUrl error");
    console.error(err);
    ctx.status = 500;
    ctx.body = {
      content: "",
      user: ""
    };
  }
};

exports.getUrl = getUrl;