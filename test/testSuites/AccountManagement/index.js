const assert = require("assert");

import { DBSetup, DBClear } from "../../MockDB";
import signup from "./signup";
import login from "./login";
import checkUser from './checkUser'
import sendVerifyEmail from "./sendVerifyEmail";
import changeEmail from "./changeEmail";
import changePassword from "./changePassword";
import changeUserName from './changeUserName'
import resetPassword from './resetPassword'
import signOut from './signOut'
import deleteAccount from "./deleteAccount";
import verifyEmail from './verifyEmail'

const AccountManagementTests = () => {
  describe("Account Management", function () {
    beforeEach(async function () {
      await DBSetup();
    });

    signup();
    login();
    checkUser();
    sendVerifyEmail();
    changeEmail();
    changePassword();
    changeUserName();
    resetPassword();
    signOut();
    // deleteAccount();
    verifyEmail();

    afterEach(async function () {
      await DBClear();
    });
  });
};

export default AccountManagementTests;
