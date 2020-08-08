const expect = require("chai").expect;

import { DBSetup, DBClear, UrlNoAccount, UrlAccount } from "../../MockDB";
import { getUserUrls } from "../../../src/functions/getUserUrls";
import { deleteUserUrl } from "../../../src/functions/deleteUserUrl";
import Url from "../../../src/model/Url";

const AccountFeaturesTests = () => {
  describe("Account Features", function () {
    before(async function () {
      await DBSetup();
    });

    describe("getUserUrls", function () {
      it("should retrieve the url assigned to a userId", async function () {
        const results = await getUserUrls(UrlAccount.userId);
        expect(results).to.have.property("body").lengthOf(1);
      });
    });
    describe("deleteUserUrl", function () {
      it("should delete the user's url", async function () {
        const resultBefore = await Url.findAll({
          where: { urlId: UrlAccount.urlId },
        });
        await deleteUserUrl(UrlAccount.userId, UrlAccount.urlId);
        const resultAfter = await Url.findAll({
          where: { urlId: UrlAccount.urlId },
        });
        expect(resultBefore).to.have.lengthOf(1);
        expect(resultAfter).to.have.lengthOf(0);
      });
    });

    after(async function () {
      await DBClear();
    });
  });
};

export default AccountFeaturesTests;
