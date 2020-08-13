import { Op } from "sequelize";

import { hashString } from "../lib";
import User from "../model/User";

export const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await User.findOne({
    where: {
      userId: userId,
    },
  });

  if (hashString(oldPassword) !== user.password) {
    return {
      status: 401,
      body: "Wrong password",
    };
  }

  await User.update(
    {
      password: hashString(newPassword),
    },
    {
      where: {
        userId: userId,
      },
    }
  );

  return {
    status: 200,
    body: "Successfully changed password!",
  };
};
