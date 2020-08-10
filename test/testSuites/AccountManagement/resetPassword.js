import { expect } from "chai";

import { sendResetPasswordEmail } from "../../../src/functions/sendResetPasswordEmail";
import { resetPassword } from '../../../src/functions/resetPassword'
import { login } from '../../../src/functions/login'
import User from "../../../src/model/User";
import ResetPasswordToken from "../../../src/model/ResetPasswordToken";
import { UserVerified, UserUnverified, sampleResetPasswordToken } from "../../MockDB";
import { hashString } from "../../../src/lib";


const ResetPasswordTests = () => {
  describe("resetPassword", async function () {
    const newPassword = "testingPasswordChange";

    it("sendResetPasswordEmail should create new ResetPasswordToken", async function () {
      const { status } = await sendResetPasswordEmail(
        UserUnverified.email,
      );
      const result = await ResetPasswordToken.findOne({
        where: {
          email: UserUnverified.email
        }
      })
      expect(status).to.be.equal(200);
      expect(result).to.be.not.equal(null);
    });
    it("should successfully reset password", async function () {
      await resetPassword(
        sampleResetPasswordToken.resetPasswordToken,
        newPassword
      );
      const { status } = await login(sampleResetPasswordToken.email, newPassword)
      expect(status).to.be.equal(200);
    });
  });
};

export default ResetPasswordTests;
