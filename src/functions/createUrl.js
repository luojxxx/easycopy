import fs from "fs";
import path from "path";
import CryptoJS from "crypto-js";

import Url from "../model/Url";

const text = fs.readFileSync(
  path.resolve(__dirname, "../wordbank.txt"),
  "utf8"
);
const wordBank = text.trim("\n").split(",");

export const createUrl = async (content, user, type) => {
  // make sure url doesn't already exist
  let wordArray
  let url;
  let results = true;
  while (results) {
    wordArray = [0, 0, 0, 0].map(
      _ => {
        const idx = Math.floor(Math.random() * wordBank.length)
        const word = wordBank[idx]
        return word[0].toUpperCase() + word.substring(1,)
    }
    );
    url = wordArray.join("");
    results = await Url.findOne({ where: { urlRaw : url.toLowerCase() } });
  }

  await Url.create({
    url: url,
    urlRaw: url.toLowerCase(),
    content: CryptoJS.AES.encrypt(
      content,
      process.env.ENCRYPTION_KEY
    ).toString(),
    user: user,
    type: type,
  });

  return {
    status: 200,
    body: {
      url: url
    }
  };
};
