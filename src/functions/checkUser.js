import { Op } from "sequelize";

import { generateRandomString, hashString } from "../lib";
import User from "../model/User";
import UserToken from "../model/UserToken";

export const checkUser = async (userId) => {
  const user = await User.findOne({
    where: {
      userId: userId,
    },
  });

  return {
    status: 200,
    body: {
      user: {
        email: user.emailVerifying || user.email,
        emailVerified: user.emailVerifying === null,
        userName: user.userName,
      },
    },
  };
};
