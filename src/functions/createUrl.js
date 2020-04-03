import fs from "fs";
import path from "path";

import Url from "../model/Url";

const text = fs.readFileSync(
  path.resolve(__dirname, "../wordbank.txt"),
  "utf8"
);
const wordBank = text.trim("\n").split(",");

export const createUrl = async (content, user, type) => {
  // make sure url doesn't already exist
  let url;
  let results = true;
  while (results) {
    const wordArray = [0, 0, 0, 0].map(
      _ => wordBank[Math.floor(Math.random() * wordBank.length)]
    );
    url = wordArray.join("-");
    results = await Url.findOne({ url: url });
  }

  const instance = new Url({
    url: url.toLowerCase(),
    content: content,
    user: user,
    type: type
  });

  const saved = await instance.save();
  return {
    status: 200,
    body: {
      msg: "",
      url: url
    }
  };
};
