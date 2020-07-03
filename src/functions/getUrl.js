import CryptoJS from "crypto-js";

import Url from "../model/Url";

export const getUrl = async url => {
  const result = await Url.findOne({
    urlChar: url.toLowercase()
  });
  if (!result) {
    return {
      status: 404,
      body: {
        msg: "",
        content: "",
        user: "",
        type: "",
        createdAt: ""
      }
    };
  }
  const byteContent = CryptoJS.AES.decrypt(
    result.content,
    process.env.ENCRYPTION_KEY
  );
  const content = byteContent.toString(CryptoJS.enc.Utf8);
  return {
    status: 200,
    body: {
      msg: "",
      content: content,
      user: result.user,
      type: result.type,
      createdAt: result.createdAt
    }
  };
};
