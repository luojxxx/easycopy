require("dotenv").config();

import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import { createUrl } from './route/CreateUrl';
import { getUrl } from './route/GetUrl';

const app = new Koa();
const router = new Router();

app.use(cors())
app.use(bodyParser())

router.post('/', createUrl);
router.get('/*', getUrl);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
