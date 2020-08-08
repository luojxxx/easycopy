import { expect } from "chai";

import { login } from "../../../src/functions/login";
import { UserVerified, UserUnverified } from "../../MockDB";

const LoginTests = () => {
  describe("login", async function () {
    it("try login with wrong email", async function () {
      const result = await login("wrong@email.com", "wrongPassword");
      expect(result).to.have.property("status").equal(404);
    });
    it("try login with correct email but wrong password", async function () {
      const result = await login(UserUnverified.email, "wrongPassword");
      expect(result).to.have.property("status").equal(401);
    });
    it("try login with correct unverified email and correct password", async function () {
      const result = await login(
        UserUnverified.emailVerifying,
        UserUnverified.password
      );
      expect(result).to.have.property("status").equal(200);
      expect(result)
        .to.have.property("body")
        .to.have.property("userToken")
        .to.be.a("string");
    });
    it("try login with correct verified email and and correct password", async function () {
      const result = await login(UserVerified.email, UserVerified.password);
      expect(result).to.have.property("status").equal(200);
      expect(result)
        .to.have.property("body")
        .to.have.property("userToken")
        .to.be.a("string");
    });
  });
};

export default LoginTests;
