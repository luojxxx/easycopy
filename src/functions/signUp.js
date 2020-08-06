import { Op } from "sequelize";
import { generateRandomString, hashString } from "../lib";

import User from "../model/User";
import UserToken from "../model/UserToken";
import { sendVerificationEmail } from "../functions/sendVerificationEmail";

export const signUp = async (email, password, userName) => {
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

  if (user) {
    return {
      status: 400,
      body: 'Email already exists'
    }
  }

  const newUser = await User.create({
    userName: userName,
    email: null,
    password: hashString(password),
    emailVerifying: email,
    emailVerified: false,
    createdAt: Date.now(),
  });

  const newEmailVerificationToken = await sendVerificationEmail(
    newUser.userId,
    email
  );

  const newUserToken = await UserToken.create({
    userId: newUser.userId,
    userToken: generateRandomString(100),
  });

  return {
    status: 200,
    body: {
      userToken: newUserToken.userToken,
      user: {
        email: newUser.email,
        userName: newUser.userName,
      }
    },
  };
};
