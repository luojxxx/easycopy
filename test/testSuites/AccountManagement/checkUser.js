import { expect } from "chai";

import { checkUser } from "../../../src/functions/checkUser";
import {
  UserVerified,
  UserUnverified,
  UserVerifiedUserToken,
} from "../../MockDB";

const CheckUserTests = () => {
  describe("checkUser", async function () {
    it("should return user info", async function() {
      const { status, body } = await checkUser(UserVerifiedUserToken.userId);
      expect(body).to.have.property('user').to.have.property('email').equal(UserVerified.email);
      expect(body)
        .to.have.property("user")
        .to.have.property("emailVerified")
        .equal(UserVerified.emailVerified);
        expect(body)
          .to.have.property("user")
          .to.have.property("userName")
          .equal(UserVerified.userName);
    });
  });
};

export default CheckUserTests;
