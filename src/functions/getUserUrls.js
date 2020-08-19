import { decryptString } from "../lib";
import Url from "../model/Url";
import { pageSize } from "../constants";

export const getUserUrls = async (userId, page) => {
  const result = await Url.findAll({
    where: { userId: userId },
    limit: pageSize,
    offset: pageSize * page,
  });
  const total = await Url.count({ where: { userId: userId } });
  if (!result) {
    return {
      status: 404,
      body: {
        list: [],
        total: 0,
      },
    };
  }

  return {
    status: 200,
    body: {
      list: result.map((ele) => ({
        ...ele.dataValues,
        content: decryptString(ele.dataValues.content),
      })),
      total: total,
    },
  };
};
