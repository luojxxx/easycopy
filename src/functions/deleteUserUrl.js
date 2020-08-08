import { Op } from "sequelize";

import { decryptString } from "../lib";
import Url from "../model/Url";

export const deleteUserUrl = async (userId, urlId) => {
  const result = await Url.destroy({
    where: {
      [Op.and]: [{ userId: userId }, { urlId: urlId }],
    },
  });
  if (!result) {
    return {
      status: 404,
      body: [],
    };
  }

  return {
    status: 200,
    body: 'Successfully deleted url',
  };
};
