const assert = require('assert');

import { DBSetup, DBClear } from './DBStub'

describe("Account Management", function () {
  before(async function() {
    await DBSetup()
  })

  describe("signup", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe("login", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
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

  after(async function() {
    await DBClear()
  })
});

describe("Account Features", function () {
  describe("getUserUrls", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe("deleteUserUrl", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("Url creation/retrieval", function () {
  describe("create", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe("*", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("Recaptcha", function () {
  describe("verifyRecaptcha", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("Payment features", function () {
  describe("donate", function () {
    it("should return", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});