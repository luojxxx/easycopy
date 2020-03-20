"use strict";

var _koa = _interopRequireDefault(require("koa"));

var _router = _interopRequireDefault(require("@koa/router"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _CreateUrl = require("./route/CreateUrl");

var _GetUrl = require("./route/GetUrl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

const app = new _koa.default();
const router = new _router.default();
app.use((0, _koaBodyparser.default)());
router.post('/', _CreateUrl.createUrl);
router.get('/*', _GetUrl.getUrl);
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);