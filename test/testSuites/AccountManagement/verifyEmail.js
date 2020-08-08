import { expect } from "chai";

import { verifyEmail } from "../../../src/functions/verifyEmail";
import User from "../../../src/model/User";
import {
  UserUnverified,
  UserUnverifiedEmailVerificationToken,
} from "../../MockDB";

const VerifyEmailTests = () => {
  describe("verifyEmail", async function () {
    it("should error when trying to verify bad token", async function () {
      const { status } = await verifyEmail('badToken');
      expect(status).to.be.equal(400);
    });
    it("should verify email with good token", async function () {
      const { status } = await verifyEmail(
        UserUnverifiedEmailVerificationToken.verificationToken
      );
      expect(status).to.be.equal(200);
      const result = await User.findOne({
        where: { userId: UserUnverified.userId },
      });
      expect(result.email).to.be.equal(UserUnverified.emailVerifying);
      expect(result.emailVerifying).to.be.equal(null);
      expect(result.emailVerified).to.be.equal(true);
    });
  });
};

export default VerifyEmailTests;
