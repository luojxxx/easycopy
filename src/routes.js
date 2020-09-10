import express from "express";
import asyncHandler from "express-async-handler";

import { createUrl } from "./functions/createUrl";
import { getUrl } from "./functions/getUrl";
import { verifyRecaptcha } from "./functions/verifyRecaptcha";
import { getUserUrls } from "./functions/getUserUrls";
import { deleteUserUrl } from "./functions/deleteUserUrl";
import { signUp } from "./functions/signUp";
import { login } from "./functions/login";
import { checkUser } from "./functions/checkUser";
import { verifyEmail } from "./functions/verifyEmail";
import { sendVerificationEmail } from "./functions/sendVerificationEmail";
import { changeEmail } from "./functions/changeEmail";
import { changePassword } from "./functions/changePassword";
import { changeUserName } from "./functions/changeUserName";
import { signOut } from "./functions/signOut";
import { sendResetPasswordEmail } from "./functions/sendResetPasswordEmail";
import { resetPassword } from "./functions/resetPassword";
import { deleteAccount } from "./functions/deleteAccount";
import { stripePayment } from "./functions/stripePayment";
import { loaderVerify } from "./functions/loaderVerify";
import RecaptchaToken from "./model/RecaptchaToken";

const routes = express.Router();

const consumeRecaptchaToken = async (token) => {
  const consumeToken = await RecaptchaToken.destroy({
    where: {
      recaptchaToken: token,
    },
  });
  return consumeToken == true;
};

routes.post(
  "/create",
  asyncHandler(async (req, res, next) => {
    const tokenStatus = await consumeRecaptchaToken(req.body.recaptchaToken);
    if (!tokenStatus) {
      return res.status(401).send("Bad token");
    }

    const userId = req.userId;
    const content = req.body.content;
    const userName = req.body.userName;
    const type = req.body.type;

    const { status, body } = await createUrl(content, userName, type, userId);
    res.status(status).send(body);
  })
);

routes.post(
  "/verifyRecaptcha",
  asyncHandler(async (req, res, next) => {
    const token = req.body.token;

    const { status, body } = await verifyRecaptcha(token);
    res.status(status).send(body);
  })
);

routes.post(
  "/getuserurls",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const page = req.query.page;

    const { status, body } = await getUserUrls(userId, page);
    res.status(status).send(body);
  })
);

routes.post(
  "/deleteuserurl",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const urlId = req.body.urlId;

    const { status, body } = await deleteUserUrl(userId, urlId);
    res.status(status).send(body);
  })
);

routes.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    const tokenStatus = await consumeRecaptchaToken(req.body.recaptchaToken);
    if (!tokenStatus) {
      return res.status(401).send("Bad token");
    }

    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;

    const { status, body } = await signUp(email, password, userName);
    res.status(status).send(body);
  })
);

routes.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const { status, body } = await login(email, password);
    res.status(status).send(body);
  })
);

routes.post(
  "/checkuser",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    const { status, body } = await checkUser(userId);
    res.status(status).send(body);
  })
);

routes.get(
  "/verifyemail/*",
  asyncHandler(async (req, res, next) => {
    const verificationToken = req.path.replace("/verifyemail/", "");

    const { status, body } = await verifyEmail(verificationToken);
    if (status === 200) {
      res.redirect("https://www.easycopy.io/EmailVerified");
    } else {
      res.status(status).send(body);
    }
  })
);

routes.post(
  "/sendverifyemail",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const email = req.body.email;

    const { status, body } = await sendVerificationEmail(userId, email);
    res.status(status).send(body);
  })
);

routes.post(
  "/changeemail",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const newEmail = req.body.newEmail;

    const { status, body } = await changeEmail(userId, newEmail);
    res.status(status).send(body);
  })
);

routes.post(
  "/changepassword",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const { status, body } = await changePassword(
      userId,
      oldPassword,
      newPassword
    );
    res.status(status).send(body);
  })
);

routes.post(
  "/changeusername",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const newUserName = req.body.newUserName;

    const { status, body } = await changeUserName(userId, newUserName);
    res.status(status).send(body);
  })
);

routes.post(
  "/signout",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;

    const { status, body } = await signOut(userId);
    res.status(status).send(body);
  })
);

routes.post(
  "/sendresetpasswordemail",
  asyncHandler(async (req, res, next) => {
    const tokenStatus = await consumeRecaptchaToken(req.body.recaptchaToken);
    if (!tokenStatus) {
      return res.status(401).send("Bad token");
    }

    const email = req.body.email;

    const { status, body } = await sendResetPasswordEmail(email);
    res.status(status).send(body);
  })
);

routes.post(
  "/resetpassword",
  asyncHandler(async (req, res, next) => {
    const resetPasswordToken = req.body.resetPasswordToken;
    const newPassword = req.body.newPassword;

    const { status, body } = await resetPassword(
      resetPasswordToken,
      newPassword
    );
    res.status(status).send(body);
  })
);

routes.post(
  "/deleteaccount",
  asyncHandler(async (req, res, next) => {
    const userId = req.userId;
    const password = req.body.password;

    const { status, body } = await deleteAccount(userId, password);
    res.status(status).send(body);
  })
);

routes.get(
  "/*",
  asyncHandler(async (req, res, next) => {
    const path = req.path;
    const url = path.slice(1, path.length);

    const { status, body } = await getUrl(url);
    res.status(status).send(body);
  })
);

// routes.post("/payment", asyncHandler(async (req, res, next) => {
//   const amount = ctx.request.body.amount;

//   const { status, body } = await stripePayment(amount);
//   res.status(status).send(body);
// }));

// routes.get("/loaderverify", asyncHandler(async (req, res, next) => {
//   const { status, body } = await loaderVerify();
//   res.status(status).send(body);
// }));

export default routes