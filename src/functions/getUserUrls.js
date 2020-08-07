import { decryptString } from "../lib";
import Url from "../model/Url";

export const getUserUrls = async (userId) => {
  const result = await Url.findAll({ where: { userId: userId } })
  if (!result) {
    return {
      status: 404,
      body: [],
    };
  }

  return {
    status: 200,
    body: result.map((ele) => ({
      ...ele.dataValues,
      content: decryptString(ele.dataValues.content)
    })),
  };
};
