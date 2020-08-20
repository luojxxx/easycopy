const expect = require("chai").expect;

import {
  DBSetup,
  DBClear,
  UrlNoAccount,
  UrlAccount,
  sampleRecaptchaToken,
} from "../../MockDB";

import { getUrl } from "../../../src/functions/getUrl";
import { createUrl } from "../../../src/functions/createUrl";
import { encryptString, decryptString } from "../../../src/lib";

const UrlTestSuite = () => {
  describe("Url creation/retrieval", function () {
    before(async function () {
      await DBSetup();
    });

    const userName = "BobTestDummy";
    const content = "I hope todays test goes well";
    const type = "text";
    describe("retrieve url", function () {
      it("should be able to retrieve the url in the mock DB (case insensitive)", async function () {
        const url = UrlNoAccount.url.toUpperCase();
        const { body } = await getUrl(url);
        expect(body).to.be.a("object");
        expect(body).to.have.property("url").equal(UrlNoAccount.url);
        expect(body).to.have.property("userName").equal(UrlNoAccount.userName);
        expect(body).to.have.property("content").equal(UrlNoAccount.content);
        expect(body).to.have.property("type").equal(UrlNoAccount.type);
      });
    });
    describe("create text url and retrieve it", function () {
      let url;
      it("should create a url", async function () {
        const { body } = await createUrl(content, userName, type);
        url = body.url;
        expect(url).to.be.a("string");
      });
      it("should retrieve the created url", async function () {
        const { body } = await getUrl(url);
        expect(body).to.be.a("object");
        expect(body).to.have.property("url").equal(url);
        expect(body).to.have.property("userName").equal(userName);
        expect(body).to.have.property("content").equal(content);
        expect(body).to.have.property("type").equal(type);
      });
    });
    describe("try to create urls with bad inputs", function () {
      it("creating url with bad type should fail", async function () {
        const { status } = await createUrl(content, userName, "wrongType");
        expect(status).to.be.equal(400);
      });
      it("creating url with bad userName should fail", async function () {
        const userName = "a".repeat(300) 
        const { status } = await createUrl(content, userName, type);
        expect(status).to.be.equal(400);
      });
      it("creating url with bad content should fail", async function () {
        const content = "a".repeat(11000);
        const { status } = await createUrl(content, userName, type);
        expect(status).to.be.equal(400);
      });
    });

    after(async function () {
      await DBClear();
    });
  });
};

export default UrlTestSuite;
