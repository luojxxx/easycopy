import { generateRandomString, hashString } from '../lib'

import User from '../model/User'
import UserToken from '../model/UserToken'
import EmailVerificationToken from '../model/EmailVerificationToken'

export const signUp = async (email, password, userName) => {
  const newUser = await User.create({
    userName: userName,
    email: null,
    password: hashString(password),
    emailVerifying: email,
    emailVerified: false,
    createdAt: Date.now(),
  });

  const newEmailVerificationToken = await EmailVerificationToken.create({
    userId: newUser.userId,
    verificationToken: generateRandomString(100)
  })

  const newUserToken = await UserToken.create({
    userId: newUser.userId,
    userToken: generateRandomString(100)
  })

  return {
    status: 200,
    body: {
      userToken: newUserToken.userToken
    },
  };
};
