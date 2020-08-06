import { Op } from "sequelize";

import { generateRandomString, hashString } from "../lib";
import User from "../model/User";
import UserToken from "../model/UserToken";

export const login = async (email, password) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        {
          email: email,
        },
        {
          emailVerifying: email,
        },
      ],
    },
  });

  if (!user) {
    return {
      status: 404,
      body: "Can't find email for user"
    }
  }

  if (hashString(password) !== user.password) {
    return {
      status: 401,
      body: "Wrong password",
    };
  }

  const userId = user.dataValues.userId
  const randomToken = generateRandomString(100);
  await UserToken.destroy({
    where: {
      userId: userId,
    },
  });
  const newUserToken = await UserToken.create({
    userId: userId,
    userToken: randomToken,
  });

  return {
    status: 200,
    body: {
      userToken: newUserToken.userToken,
      user: {
        email: user.email || user.emailVerifying,
        emailVerified: user.emailVerified,
        userName: user.userName,
      },
    },
  };
};
