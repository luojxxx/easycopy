import fs from "fs";
import path from "path";

import { encryptString } from '../lib'
import Url from "../model/Url";

const text = fs.readFileSync(
  path.resolve(__dirname, "../wordbank.txt"),
  "utf8"
);
const wordBank = text.trim("\n").split(",");

const generateWordArray = () => {
  return [0, 0, 0, 0, 0].map((_) => {
    const idx = Math.floor(Math.random() * wordBank.length);
    const word = wordBank[idx];
    return word[0].toUpperCase() + word.substring(1);
  });
};

export const createUrl = async (content, userName, type, userId) => {
  // make sure url doesn't already exist
  let url;
  let results = true;
  while (results) {
    url = generateWordArray().join("");
    results = await Url.findOne({ where: { urlRaw : url.toLowerCase() } });
  }

  await Url.create({
    url: url,
    urlRaw: url.toLowerCase(),
    content: encryptString(content),
    userName: userName,
    type: type,
    userId: userId,
  });

  return {
    status: 200,
    body: {
      url: url
    }
  };
};
