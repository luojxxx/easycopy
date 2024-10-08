import { encryptString, hashString } from "../src/lib";
import db from "../src/db";
import User from "../src/model/User";
import UserToken from "../src/model/UserToken";
import EmailVerificationToken from "../src/model/EmailVerificationToken";
import Url from "../src/model/Url";
import RecaptchaToken from "../src/model/RecaptchaToken";
import ResetPasswordToken from "../src/model/ResetPasswordToken";
import dayjs from "dayjs";

export const UserUnverified = {
  userId: 100,
  userName: "atlantic",
  email: null,
  password: "luckypassword321",
  emailVerifying: "luo.j2010@gmail.com",
};

export const UserVerified = {
  userId: 101,
  userName: "pacific",
  email: "luojx2010@gmail.com",
  password: "luckypassword123",
  emailVerifying: null,
};

export const UrlNoAccount = {
  urlId: 1000,
  url: "HappenRockEffortTrain",
  urlRaw: "HappenRockEffortTrain".toLowerCase(),
  content: "Test Content",
  userName: "TestUser",
  type: "text",
};

export const UrlAccount = {
  urlId: 1001,
  url: "BabelSpaceJavaSort",
  urlRaw: "BabelSpaceJavaSort".toLowerCase(),
  content: "Test Contents",
  userName: UserVerified.userName,
  type: "text",
  userId: UserVerified.userId,
};

export const UserVerifiedUserToken = {
  userId: 101,
  userToken: "randomCharString",
};

export const UserUnverifiedEmailVerificationToken = {
  userId: 100,
  verificationToken: "Greenland",
  createdAt: dayjs().subtract(30, "minutes").toISOString(),
};

export const sampleRecaptchaToken = {
  recaptchaToken: "randomString",
};

export const sampleResetPasswordToken = {
  email: UserVerified.email,
  resetPasswordToken: "randomString",
};

export const DBSetup = async () => {
  await User.create({
    ...UserUnverified,
    password: hashString(UserUnverified.password),
  });
  await User.create({
    ...UserVerified,
    password: hashString(UserVerified.password),
  });
  await Url.create({
    ...UrlNoAccount,
    content: encryptString(UrlNoAccount.content),
  });
  await Url.create({
    ...UrlAccount,
    content: encryptString(UrlAccount.content),
  });
  await UserToken.create(UserVerifiedUserToken);
  await EmailVerificationToken.create(UserUnverifiedEmailVerificationToken);
  await RecaptchaToken.create(sampleRecaptchaToken);
  await ResetPasswordToken.create(sampleResetPasswordToken);
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
  await RecaptchaToken.destroy({
    where: {},
  });
  await ResetPasswordToken.destroy({
    where: {},
  });
};
