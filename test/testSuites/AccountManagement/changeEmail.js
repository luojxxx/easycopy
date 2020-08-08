import { expect } from 'chai'

import { changeEmail } from "../../../src/functions/changeEmail";
import User from "../../../src/model/User";
import { UserVerified, UserUnverified } from '../../MockDB'

const ChangeEmailTests = () => {
  describe("changeEmail", async function () {
    const newEmail = "jl0087@gmail.com";

    it("should error when changing to email already in DB under 'email' column", async function () {
      const { status } = await changeEmail(UserVerified.userId, UserVerified.email);
      expect(status).to.be.equal(400)
    });
    it("should error when changing to email already in DB under 'emailVerifying' column", async function () {
      const { status } = await changeEmail(UserVerified.userId, UserUnverified.email);
      expect(status).to.be.equal(400)
    });
    it("should modify User data for new email", async function () {
      const { status, body } = await changeEmail(UserVerified.userId, newEmail)
      expect(status).to.be.equal(200)
      
      const result = await User.findOne({ where: { userId: UserVerified.userId }})
      expect(result.email).to.be.equal(null)
      expect(result.emailVerifying).to.be.equal(newEmail)
      expect(result.emailVerified).to.be.equal(false)
    });
  });
};

export default ChangeEmailTests;
