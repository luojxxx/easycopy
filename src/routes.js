import { createUrl } from "./functions/createUrl";
import { getUrl } from "./functions/getUrl";
import { stripePayment } from './functions/stripePayment'
import { loaderVerify } from "./functions/loaderVerify";

export const createUrlRoute = async (ctx, next) => {
  const content = ctx.request.body.content;
  const user = ctx.request.body.user;

  const { status, body } = await createUrl(content, user);

  ctx.status = status;
  ctx.body = body;
};

export const getUrlRoute = async (ctx, next) => {
  const path = ctx.request.path;
  const url = path.slice(1, path.length);

  const { status, body } = await getUrl(url);

  ctx.status = status;
  ctx.body = body;
};

export const stripePaymentRoute = async (ctx, next) => {
  const amount = ctx.request.body.amount;

  const { status, body } = await stripePayment(amount);

  ctx.status = status;
  ctx.body = body;
}

export const loaderVerifyRoute = async (ctx, next) => {
  const { status, body } = await loaderVerify();

  ctx.status = status;
  ctx.body = body;
};
