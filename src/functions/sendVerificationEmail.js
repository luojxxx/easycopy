import dayjs from 'dayjs'
import { host } from '../constants'
import { generateRandomString, sgMail } from "../lib";

import EmailVerificationToken from "../model/EmailVerificationToken";

export const sendVerificationEmail = async (userId, email) => {
  email = email.toLowerCase();
  const checkToken = await EmailVerificationToken.findOne({
    where: {
      userId: userId,
    }
  })
  if (checkToken && dayjs(checkToken.createdAt).add(15, 'minutes').valueOf() > dayjs().valueOf()) {
    return {
      status: 400,
      body: "Please wait 15 minutes before sending an additional verification email"
    }
  }

  const randomToken = generateRandomString(100);
  await EmailVerificationToken.destroy({
    where: {
      userId: userId,
    },
  });
  const newEmailVerificationToken = await EmailVerificationToken.create({
    userId: userId,
    verificationToken: randomToken,
  });

  const verificationLink = `${host}/verifyemail/${randomToken}`
  const msg = {
    to: email,
    from: "admin@quickshift.io",
    subject: "EasyCopy.io Email Verification",
    html: `
      Hi!
      <br /><br />
      This is a quick verification email for your account, please click the link below:
      <br />
      <a href="${verificationLink}">${verificationLink}</a>
      <br /><br />
      Thank you!<br/>
      - EasyCopy.io
    `,
  };

  await sgMail.send(msg);

  return {
    status: 200,
    body: 'Successfully sent verification email'
  };
};
