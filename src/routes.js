import { createUrl } from "./functions/createUrl";
import { getUrl } from "./functions/getUrl";

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
