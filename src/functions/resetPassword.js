import { Op } from "sequelize";

import { hashString, generateRandomString } from "../lib";
import ResetPasswordToken from '../model/ResetPasswordToken'
import User from "../model/User";
import UserToken from '../model/UserToken'

export const resetPassword = async (resetPasswordToken, newPassword) => {
  const tokenResult = await ResetPasswordToken.findOne({
    where: {
      resetPasswordToken: resetPasswordToken
    }
  })
  const user = await User.findOne({
    where: {
      [Op.or]: [
        {
          email: tokenResult.email,
        },
        {
          emailVerifying: tokenResult.email,
        },
      ],
    },
  });

  await User.update(
    {
      password: hashString(newPassword),
    },
    {
      where: {
        userId: user.userId,
      },
    }
  );

  const randomToken = generateRandomString(100);
  await UserToken.destroy({
    where: {
      userId: user.userId,
    },
  });
  const newUserToken = await UserToken.create({
    userId: user.userId,
    userToken: randomToken,
  });

  return {
    status: 200,
    body: {
      msg: "Successfully reset password!",
      userToken: randomToken,
      user: {
        email: user.email || user.emailVerifying,
        emailVerified: user.emailVerified,
        userName: user.userName,
      },
    },
  };
};
