import { expect } from "chai";

import { sendVerificationEmail } from "../../../src/functions/sendVerificationEmail";
import { UserUnverified } from "../../MockDB";
import EmailVerificationToken from "../../../src/model/EmailVerificationToken";

const SendVerificationEmailTests = () => {
  describe("sendVerificationEmail", async function () {
    const userId = UserUnverified.userId;
    const email = UserUnverified.emailVerifying;

    let emailToken1;
    it("sends a verification email", async function () {
      const result = await sendVerificationEmail(userId, email);
      const newEmailVerificationToken = await EmailVerificationToken.findOne({
        where: { userId: userId },
      });
      emailToken1 = newEmailVerificationToken.verificationToken;
    });
    it("resends a verification email and updates email token", async function () {
      const result = await sendVerificationEmail(userId, email);
      const newEmailVerificationToken = await EmailVerificationToken.findOne({
        where: { userId: userId },
      });
      expect(emailToken1).to.not.be.equal(
        newEmailVerificationToken.verificationToken
      );
    });
  });
};

export default SendVerificationEmailTests;
