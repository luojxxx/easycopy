import { Op } from "sequelize";

import User from "../model/User";
import { sendVerificationEmail } from "./sendVerificationEmail";

export const changeEmail = async (userId, newEmail) => {
  newEmail = newEmail.toLowerCase();
  const checkExistingEmail = await User.findOne({
    where: {
      [Op.or]: [
        {
          email: newEmail
        },
        {
          emailVerifying: newEmail
        }
      ]
    }
  })
  if (checkExistingEmail) {
    return {
      status: 400,
      body: "Email is already taken",
    };
  }

  await User.update({
    emailVerifying: newEmail,
    emailVerified: false,
  }, {
    where: {
      userId: userId
    }
  })
  await sendVerificationEmail(userId, newEmail)

  return {
    status: 200,
    body: "Successfully verified email!",
  };
};
