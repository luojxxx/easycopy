import { expect } from 'chai'

import { changeUserName } from "../../../src/functions/changeUserName";
import User from "../../../src/model/User";
import { UserVerified, UserUnverified } from '../../MockDB'

const ChangeEmailTests = () => {
  describe("changeEmail", async function () {
    const newUserName = "EasyCopier";

    it("should change username", async function () {
      const { status } = await changeUserName(UserVerified.userId, newUserName);
      expect(status).to.be.equal(200)
      const result = await User.findOne({ where: { userId: UserVerified.userId }})
      expect(result.userName).to.be.equal(newUserName)
    });
  });
};

export default ChangeEmailTests;
