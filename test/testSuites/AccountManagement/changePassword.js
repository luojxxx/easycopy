import { expect } from "chai";

import { changePassword } from "../../../src/functions/changePassword";
import User from "../../../src/model/User";
import { UserVerified, UserUnverified } from "../../MockDB";

import { hashString } from "../../../src/lib";

const ChangePasswordTests = () => {
  describe("changePassword", async function () {
    const newPassword = "testingPasswordChange";

    it("should error when given wrong old password", async function () {
      const { status } = await changePassword(
        UserVerified.userId,
        'wrongPassword',
        newPassword
      );
      expect(status).to.be.equal(401);
    });
    it("should successfully change password", async function () {
      const { status } = await changePassword(
        UserVerified.userId,
        UserVerified.password,
        newPassword
      );
      const result = await User.findOne({
        where: { userId: UserVerified.userId }
      })
      expect(status).to.be.equal(200);
      expect(result.password).to.be.equal(hashString(newPassword))
    });
  });
};

export default ChangePasswordTests;
