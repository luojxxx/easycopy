import { expect } from "chai";

import { sendVerificationEmail } from "../../../src/functions/sendVerificationEmail";
import {
  UserUnverified,
  UserUnverifiedEmailVerificationToken,
} from "../../MockDB";
import EmailVerificationToken from "../../../src/model/EmailVerificationToken";

const SendVerificationEmailTests = () => {
  describe("sendVerificationEmail", async function () {
    const userId = UserUnverified.userId;
    const email = UserUnverified.emailVerifying;

    it("sends a verification email", async function () {
      const result1 = await sendVerificationEmail(userId, email);
      const newEmailVerificationToken1 = await EmailVerificationToken.findOne({
        where: { userId: userId },
      });
      expect(result1.status).to.be.equal(200);
      expect(newEmailVerificationToken1.verificationToken).to.not.be.equal(
        UserUnverifiedEmailVerificationToken.verificationToken
      );
      const result2 = await sendVerificationEmail(userId, email);
      const newEmailVerificationToken2 = await EmailVerificationToken.findOne({
        where: { userId: userId },
      });
      expect(result2.status).to.be.equal(400);
      expect(newEmailVerificationToken1.verificationToken).to.not.be.equal(
        newEmailVerificationToken2.verificationToken
      );
    });
  });
};

export default SendVerificationEmailTests;
