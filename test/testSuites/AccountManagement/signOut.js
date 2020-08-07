import { expect } from "chai";

import { signOut } from "../../../src/functions/signOut";
import UserToken from "../../../src/model/UserToken";
import { UserVerified, UserUnverified } from "../../MockDB";

const SignOutTests = () => {
  describe("signOut", async function () {
    it("should delete UserToken", async function () {
      const { status } = await signOut(
        UserUnverified.userId,
      );
      const result = await UserToken.findOne({
        where: {
          userId: UserUnverified.userId
        }
      })
      expect(status).to.be.equal(200);
      expect(result).to.be.equal(null);
    });
  });
};

export default SignOutTests;
