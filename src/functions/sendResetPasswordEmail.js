import { Op } from 'sequelize'
import { webhost } from '../constants'
import { generateRandomString, sgMail } from "../lib";

import User from '../model/User'
import ResetPasswordToken from "../model/ResetPasswordToken";

export const sendResetPasswordEmail = async (email) => {
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
  if (!user) {
    return {
      status: 400,
      body: 'Email not found in database'
    }
  }
  await ResetPasswordToken.destroy({
    where: {
      email: email,
    },
  });
  const randomToken = generateRandomString(100);
  const newResetPasswordToken = await ResetPasswordToken.create({
    email: email,
    resetPasswordToken: randomToken,
  });

  const resetLink = `${webhost}/resetpassword/${randomToken}`

  const msg = {
    to: email,
    from: "admin@quickshift.io",
    subject: "EasyCopy.io Password Reset",
    html: `
      Hi!
      <br /><br />
      This is a quick email to reset the password for your account, please click the link below:
      <br />
      <a href="${resetLink}">${resetLink}</a>
      <br /><br />
      Thank you!<br/>
      - EasyCopy.io
    `,
  };

  await sgMail.send(msg);

  return {
    status: 200,
    body: 'Successfully sent reset password email'
  };
};
