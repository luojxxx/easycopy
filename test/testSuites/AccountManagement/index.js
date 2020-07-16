const assert = require("assert");

import { DBSetup, DBClear } from "../../MockDB";
import signup from './signup'
import login from './login'

const AccountManagementTests = () => {
  describe("Url creation/retrieval", function () {
    before(async function () {
      await DBSetup();
    });

    signup();
    login();
    describe("verifyEmail", function () {
      it("should return", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe("resendVerifyEmail", function () {
      it("should return", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe("changeEmail", function () {
      it("should return", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe("changePassword", function () {
      it("should return", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
    describe("deleteAccount", function () {
      it("should return", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });

    after(async function () {
      await DBClear();
    });
  });
};

export default AccountManagementTests;