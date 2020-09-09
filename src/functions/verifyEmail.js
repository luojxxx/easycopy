import User from "../model/User";
import EmailVerificationToken from '../model/EmailVerificationToken'

export const verifyEmail = async (verificationToken) => {
  const emailVerificationToken = await EmailVerificationToken.findOne({
    where: { verificationToken: verificationToken },
  });
  if (!emailVerificationToken) {
    return {
      status: 400,
      body: {
        msg: "Bad token",
      },
    };
  }
  const user = await User.findOne({
    where: {
      userId: emailVerificationToken.userId
    }
  })
  if (user.emailVerifying === null) {
    return {
      status: 200,
      body: "Email already verified",
    };
  }
  await User.update({
    email: user.emailVerifying,
    emailVerifying: null,
  }, {
    where: {
      userId: user.userId
    }
  })
  await EmailVerificationToken.destroy({
    where: {
      verificationToken: verificationToken
    }
  })

  return {
    status: 200,
    body: "Successfully verified email",
  };
};
