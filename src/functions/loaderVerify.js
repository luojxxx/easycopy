import fs from "fs";
import path from "path";

import Url from "../model/Url";

const text = fs.readFileSync(
  path.resolve(
    __dirname,
    "../loaderio-4972e2831d525a495d3bff7e96b9182b.txt"
  ),
  "utf8"
);

export const loaderVerify = async (content, user) => {
  return {
    status: 200,
    body: text
  };
};
