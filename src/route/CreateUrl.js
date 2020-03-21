import fs from "fs";
import path from "path";

import Url from "../model/Url";

const text = fs.readFileSync(
  path.resolve(__dirname, "../../wordbank.txt"),
  "utf8"
);
const wordBank = text.trim("\n").split(",");

const contentLimit = 10000;

export const createUrl = async (ctx, next) => {
  try {
    const content = ctx.request.body.content;
    const user = ctx.request.body.user;

    if (content.length > contentLimit) {
      ctx.status = 400;
      ctx.body = {
        msg: `Content is longer than the ${contentLimit} limit`,
        url: ""
      };

    } else {
      // make sure url doesn't already exist
      let url
      let results = true
      while (results) {
        const wordArray = [0, 0, 0, 0].map(
          _ => wordBank[Math.floor(Math.random() * wordBank.length)]
        );
        url = wordArray.join("-");
        results = await Url.findOne({ url: url })
      }

      const instance = new Url({
        url: url.toLowerCase(),
        content: content,
        user: user
      });

      const saved = await instance.save();
      ctx.status = 200;
      ctx.body = {
        url: url
      };
    }

  } catch (err) {
    console.error("CreateUrl error");
    console.error(err);
    ctx.status = 500;
    ctx.body = {
      url: ""
    };
  }
};
