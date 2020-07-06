import axios from 'axios'

export const verifyRecaptcha = async (token) => {
  const recaptchaResult = await axios({
    method: "get",
    url: "https://www.google.com/recaptcha/api/siteverify",
    params: {
      secret: process.env.RECAPTCHA_SECRET,
      response: token,
    },
  });

  return {
    status: 200,
    body: {
      msg: "",
      data: recaptchaResult.data,
    },
  };
};
