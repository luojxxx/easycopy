import CryptoJS from "crypto-js";

import Url from "../model/Url";

export const getUrl = async (url) => {
  const result = await Url.findOne({ where: { urlRaw: url.toLowerCase() } })
  if (!result) {
    return {
      status: 404,
      body: {
        msg: "",
        content: "",
        userName: "",
        type: "",
        createdAt: "",
      },
    };
  }

  const data = result.dataValues
  const byteContent = CryptoJS.AES.decrypt(
    data.content,
    process.env.ENCRYPTION_KEY
  );
  const content = byteContent.toString(CryptoJS.enc.Utf8);
  return {
    status: 200,
    body: {
      msg: "",
      url: data.url,
      createdAt: data.createdAt,
      userName: data.userName,
      type: data.type,
      content: content,
    },
  };
};
