import { expect } from 'chai'

import { login } from "../../../src/functions/login";
import { UserVerified, UserUnverified } from '../../MockDB'

const LoginTests = () => {
  describe("login", async function () {

    it("try login with wrong email", async function () {
      const result = await login('wrong@email.com', 'wrongPassword');
    });
    it("try login with correct email but wrong password", async function () {
      const result = await login(UserUnverified.email, 'wrongPassword');
    });
    it("try login with correct unverified email and correct password", async function () {
      const result = await login(UserUnverified.email, UserUnverified.password);
    });
    it("try login with correct verified email and and correct password", async function () {
      const result = await login(UserVerified.email, UserVerified.password);
    });
  });
};

export default LoginTests;
