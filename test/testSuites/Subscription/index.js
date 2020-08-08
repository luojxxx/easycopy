const assert = require("assert");

import { DBSetup, DBClear } from "../../MockDB";

const SubscriptionTests = () => {
  describe("Subscription features", function () {
    before(async function () {
      await DBSetup();
    });

    describe("donate", function () {
      it("should return", function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });

    after(async function () {
      await DBClear();
    });
  });
};

export default SubscriptionTests;