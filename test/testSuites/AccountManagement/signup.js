import { expect } from "chai";

import { signUp } from "../../../src/functions/signUp";
import User from "../../../src/model/User";
import UserToken from "../../../src/model/UserToken";
import EmailVerificationToken from "../../../src/model/EmailVerificationToken";
import { hashString } from "../../../src/lib";

const SignUpTests = () => {
  describe("signup", async function () {
    const newEmail = "luojx2010test@gmail.com";
    const newPassword = "earth";
    const newUserName = "MegaBytes";

    const signup = async function () {
      const result = await signUp(newEmail, newPassword, newUserName);
      const { status, body } = result;
      if (status === 200) {
        const userToken = body.userToken;
        const newUserToken = await UserToken.findOne({
          where: { userToken: userToken },
        });
        return newUserToken;
      } else {
        return result;
      }
    };

    it("should create a new user token", async function () {
      const newUserToken = await signup();
      expect(newUserToken).to.be.a("object");
      expect(newUserToken).to.have.property("userId").to.be.a("number");
      expect(newUserToken).to.have.property("userToken").to.be.a("string");
    });
    it("should create a new user", async function () {
      const { userId } = await signup();
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
      const { userId } = await signup();
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
    it("should reject creating 2nd user with same email", async function () {
      await signup();
      const result = await signup();
      expect(result).to.have.property("status").equal(400);
      expect(result).to.have.property("body").equal("Email already exists");
    });
  });
};

export default SignUpTests;
