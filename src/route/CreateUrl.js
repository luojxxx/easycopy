import fs from "fs";
import path from "path";

import Url from "../model/Url";

const text = fs.readFileSync(
  path.resolve(__dirname, "../../wordbank.txt"),
  "utf8"
);
const wordBank = text.trim("\n").split(",");

export const createUrl = async (ctx, next) => {
  try {
    const wordArray = [0, 0, 0, 0].map(
      _ => wordBank[Math.floor(Math.random() * wordBank.length)]
    );
    const url = wordArray.join("-");
    const content = ctx.request.body.content;
    const user = ctx.request.body.user;

    const instance = new Url({
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
