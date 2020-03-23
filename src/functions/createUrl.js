import fs from "fs";
import path from "path";

import Url from "../model/Url";

const text = fs.readFileSync(
  path.resolve(__dirname, "../../wordbank.txt"),
  "utf8"
);
const wordBank = text.trim("\n").split(",");

const contentLimit = 10000;

export const createUrl = async (content, user) => {
  if (content.length > contentLimit) {
    return {
      status: 400,
      body: {
        msg: `Content is longer than the ${contentLimit} limit`,
        url: ""
      }
    };
  }
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
    user: user
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
