import { encryptString } from '../src/lib'
import db from '../src/db'
import User from '../src/model/User'
import UserToken from '../src/model/UserToken'
import EmailVerificationToken from '../src/model/EmailVerificationToken'
import Url from '../src/model/Url'

export const DBSetup = async () => {
  await Url.create({
    url: "HappenRockEffortTrain",
    urlRaw: "HappenRockEffortTrain".toLowerCase(),
    content: encryptString('Test Content'),
    userName: "TestUser",
    type: "text",
  });
  await User.create({
    userName: "cloudlife",
    email: "luojx2010@gmail.com",
    password: "saltedpassword",
    emailVerifying: null,
    emailVerified: true,
    createdAt: Date.now(),
  });
}

export const DBClear = async () => {
  await Url.destroy({
    where: {},
  });
  await EmailVerificationToken.destroy({
    where: {},
  });
  await UserToken.destroy({
    where: {}
  });
  await User.destroy({
    where: {},
  });
}