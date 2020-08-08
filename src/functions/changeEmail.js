import { Op } from "sequelize";

import User from "../model/User";
import { sendVerificationEmail } from "./sendVerificationEmail";

export const changeEmail = async (userId, newEmail) => {
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
      body: {
        msg: 'Email is already taken'
      }
    }
  }

  await User.update({
    email: null,
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
    body: {
      msg: 'Success!',
    },
  };
};
