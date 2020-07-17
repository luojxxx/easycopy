import { Op } from "sequelize";

import { hashString } from "../lib";
import User from "../model/User";
import UserToken from "../model/UserToken";
import EmailVerificationToken from "../model/EmailVerificationToken";

export const deleteAccount = async (userId, password) => {
  const user = await User.findOne({
    where: {
      userId: userId,
    },
  });

  if (hashString(password) !== user.password) {
    return {
      status: 401,
      body: "Wrong password",
    };
  }

  await EmailVerificationToken.destroy({
    where: { userId: user.userId },
  });
  await UserToken.destroy({
    where: { userId: user.userId },
  });
  await User.destroy({
    where: { userId: user.userId },
  });

  return {
    status: 200,
    body: {
      msg: "Successfully deleted account!",
    },
  };
};
