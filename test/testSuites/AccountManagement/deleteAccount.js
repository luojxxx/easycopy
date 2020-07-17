import { expect } from "chai";

import { deleteAccount } from "../../../src/functions/deleteAccount";
import User from "../../../src/model/User";
import UserToken from "../../../src/model/UserToken";
import EmailVerificationToken from "../../../src/model/EmailVerificationToken";
import { UserVerified, UserUnverified } from "../../MockDB";

import { hashString } from "../../../src/lib";

const DeleteAccountTests = () => {
  describe("deleteAccount", async function () {
    it("should error when given wrong old password", async function () {
      const { status } = await deleteAccount(
        UserVerified.userId,
        "wrongPassword"
      );
      expect(status).to.be.equal(401);
    });
    it("should successfully scrub account from DB", async function () {
      const { status } = await deleteAccount(
        UserVerified.userId,
        UserVerified.password
      );
      const userResult = await User.findOne({
        where: { userId: UserVerified.userId },
      });
      const userTokenResult = await UserToken.findOne({
        where: { userId: UserVerified.userId },
      });
      const emailVerificationTokenResult = await EmailVerificationToken.findOne(
        {
          where: { userId: UserVerified.userId },
        }
      );
      expect(status).to.be.equal(200);
      expect(userResult).to.be.equal(null);
      expect(userTokenResult).to.be.equal(null);
      expect(emailVerificationTokenResult).to.be.equal(null);
    });
  });
};

export default DeleteAccountTests;
