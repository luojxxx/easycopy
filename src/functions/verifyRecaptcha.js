import axios from "axios";

import RecaptchaToken from "../model/RecaptchaToken";
import { generateRandomString } from "../lib";

export const verifyRecaptcha = async (token) => {
  const recaptchaResult = await axios({
    method: "get",
    url: "https://www.google.com/recaptcha/api/siteverify",
    params: {
      secret: process.env.RECAPTCHA_SECRET,
      response: token,
    },
  });
  if (!recaptchaResult.data.success) {
    return {
      status: 401,
      body: "Bad recaptcha token",
    };
  } else {
    const randomString = generateRandomString(100);

    await RecaptchaToken.create({
      recaptchaToken: randomString,
    });

    return {
      status: 200,
      body: {
        data: recaptchaResult.data,
        recaptchaToken: randomString,
      },
    };
  }
};
