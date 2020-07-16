import { generateRandomString, hashString } from "../lib";

import User from "../model/User";
import UserToken from "../model/UserToken";
import { sendVerificationEmail } from "../functions/sendVerificationEmail";

export const signUp = async (email, password, userName) => {
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
    },
  };
};
