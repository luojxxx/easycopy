const assert = require("assert");

import { DBSetup, DBClear } from "./../MockDB";

const UrlTestSuite = () => {
  describe("Recaptcha", function () {
    before(async function () {
      await DBSetup();
    });

    describe("verifyRecaptcha", function () {
      it("should return", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });

    after(async function () {
      await DBClear();
    });
  });
};

export default UrlTestSuite;