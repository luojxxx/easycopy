import Url from "../model/Url";

export const getUrl = async (ctx, next) => {
  try {
    const path = ctx.request.path;
    const url = path.slice(1, path.length);
    const result = await Url.findOne({
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
        user: result.user,
        date: result.date
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
