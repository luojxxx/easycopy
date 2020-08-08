const expect = require("chai").expect;

import { DBSetup, DBClear, UrlNoAccount, UrlAccount } from "../../MockDB";

import { getUrl } from '../../../src/functions/getUrl'
import { createUrl } from "../../../src/functions/createUrl";
import { encryptString, decryptString } from '../../../src/lib'

const UrlTestSuite = () => {
  describe("Url creation/retrieval", function () {
    before(async function () {
      await DBSetup();
    });

    describe("retrieve url", function () {
      it("should be able to retrieve the url in the mock DB (case insensitive)", async function () {
        const url = UrlNoAccount.url.toUpperCase()
        const { body } = await getUrl(url)
        expect(body).to.be.a("object");
        expect(body).to.have.property("url").equal(UrlNoAccount.url);
        expect(body).to.have.property("userName").equal(UrlNoAccount.userName);
        expect(body).to.have.property("content").equal(UrlNoAccount.content);
        expect(body).to.have.property("type").equal(UrlNoAccount.type);
      });
    });
    describe("create text url and retrieve it", function () {
      const userName = 'BobTestDummy'
      const content = 'I hope todays test goes well'
      const type = 'text'
      let url
      it("should create a url", async function () {
        const { body } = await createUrl(content, userName, type);
        url = body.url
        expect(url).to.be.a('string')
      });
      it("should retrieve the created url", async function () {
        const { body } = await getUrl(url)
        expect(body).to.be.a("object");
        expect(body).to.have.property("url").equal(url);
        expect(body).to.have.property("userName").equal(userName);
        expect(body).to.have.property("content").equal(content);
        expect(body).to.have.property("type").equal(type);
      })
    });

    after(async function () {
      await DBClear();
    });
  });
};

export default UrlTestSuite;