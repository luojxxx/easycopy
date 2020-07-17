import { encryptString, hashString } from "../src/lib";
import db from "../src/db";
import User from "../src/model/User";
import UserToken from "../src/model/UserToken";
import EmailVerificationToken from "../src/model/EmailVerificationToken";
import Url from "../src/model/Url";

export const UrlNoAccount = {
  url: "HappenRockEffortTrain",
  urlRaw: "HappenRockEffortTrain".toLowerCase(),
  content: "Test Content",
  userName: "TestUser",
  type: "text",
};

export const UserUnverified = {
  userId: 100,
  userName: "atlantic",
  email: null,
  password: "luckypassword321",
  emailVerifying: "luo.j2010@gmail.com",
  emailVerified: false,
  createdAt: Date.now(),
};

export const UserVerified = {
  userId: 101,
  userName: "pacific",
  email: "luojx2010@gmail.com",
  password: "luckypassword123",
  emailVerifying: null,
  emailVerified: true,
  createdAt: Date.now(),
};

export const UserVerifiedUserToken = {
  userId: 101,
  userToken: 'randomCharString'
}

export const UserVerifiedEmailVerificationToken = {
  userId: 101,
  verificationToken: 'randomCharString'
}
export const UserUnverifiedEmailVerificationToken = {
  userId: 100,
  verificationToken: 'Greenland'
}


export const DBSetup = async () => {
  await Url.create({...UrlNoAccount, content: encryptString(UrlNoAccount.content)});
  await User.create({
    ...UserUnverified,
    password: hashString(UserUnverified.password),
  });
  await User.create({
    ...UserVerified,
    password: hashString(UserVerified.password),
  });
  await UserToken.create(UserVerifiedUserToken);
  await EmailVerificationToken.create(UserVerifiedEmailVerificationToken);
  await EmailVerificationToken.create(UserUnverifiedEmailVerificationToken);
};

export const DBClear = async () => {
  await Url.destroy({
    where: {},
  });
  await EmailVerificationToken.destroy({
    where: {},
  });
  await UserToken.destroy({
    where: {},
  });
  await User.destroy({
    where: {},
  });
};
