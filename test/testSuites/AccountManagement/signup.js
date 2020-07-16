import { expect } from 'chai'

import { signUp } from "../../../src/functions/signUp";
import User from "../../../src/model/User";
import UserToken from "../../../src/model/UserToken";
import EmailVerificationToken from "../../../src/model/EmailVerificationToken";
import { hashString } from '../../../src/lib'

const SignUpTests = () => {
  describe("signup", async function () {
    const newEmail = "luojx2010@gmail.com";
    const newPassword = "earth";
    const newUserName = "MegaBytes";

    let userToken;
    let userId;
    it("should run signup", async function () {
      const { body } = await signUp(newEmail, newPassword, newUserName);
      userToken = body.userToken;
    });
    it("should create a new user token", async function () {
      const newUserToken = await UserToken.findOne({
        where: { userToken: userToken },
      });
      userId = newUserToken.userId;
      expect(newUserToken).to.be.a("object");
      expect(newUserToken).to.have.property("userId").to.be.a("number");
      expect(newUserToken).to.have.property("userToken").to.be.a("string");
    });
    it("should create a new user", async function () {
      const newUser = await User.findOne({
        where: { userId: userId },
      });
      expect(newUser).to.be.a("object");
      expect(newUser).to.have.property("userName").equal("MegaBytes");
      expect(newUser).to.have.property("email").equal(null);
      expect(newUser)
        .to.have.property("password")
        .equal(hashString(newPassword));
      expect(newUser).to.have.property("emailVerifying").equal(newEmail);
      expect(newUser).to.have.property("emailVerified").equal(false);
      expect(newUser).to.have.property("subscribed").equal(null);
    });
    it("should create a new email verification token", async function () {
      const newEmailVerificationToken = await EmailVerificationToken.findOne({
        where: { userId: userId },
      });
      expect(newEmailVerificationToken).to.be.a("object");
      expect(newEmailVerificationToken)
        .to.have.property("userId")
        .to.be.a("number");
      expect(newEmailVerificationToken)
        .to.have.property("verificationToken")
        .to.be.a("string");
    });
  });
};

export default SignUpTests;
