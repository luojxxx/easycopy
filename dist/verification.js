"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.oneOfType = exports.lessThanLength = exports.isString = exports.bodyContainsInt = exports.bodyContainsStrings = exports.bodyContains = void 0;

var bodyContains = function bodyContains(expected, actual) {
  if (!expected.every(function (key) {
    return Object.keys(actual).includes(key);
  })) {
    return {
      status: 400,
      body: {
        msg: "Missing arguments"
      }
    };
  }
};

exports.bodyContains = bodyContains;

var bodyContainsStrings = function bodyContainsStrings(expected, actual) {
  if (!expected.every(function (key) {
    return typeof actual[key] === "string";
  })) {
    return {
      status: 400,
      body: {
        msg: "Invalid arguments"
      }
    };
  }
};

exports.bodyContainsStrings = bodyContainsStrings;

var bodyContainsInt = function bodyContainsInt(expected, actual) {
  if (!expected.every(function (key) {
    return Number.isInteger(actual[key]);
  })) {
    return {
      status: 400,
      body: {
        msg: "Invalid arguments"
      }
    };
  }
};

exports.bodyContainsInt = bodyContainsInt;

var isString = function isString(actual) {
  if (typeof actual !== "string") {
    return {
      status: 400,
      body: {
        msg: "Invalid arguments"
      }
    };
  }
};

exports.isString = isString;

var lessThanLength = function lessThanLength(limit, actual) {
  var limitName = Object.keys(limit);
  var limitValue = limit[limitName[0]];

  if (actual.length > limitValue) {
    return {
      status: 400,
      body: {
        msg: "".concat(limitName, " is longer than the ").concat(limitValue, " limit"),
        url: ""
      }
    };
  }
};

exports.lessThanLength = lessThanLength;

var oneOfType = function oneOfType(expectedTypes, actual) {
  if (!expectedTypes.includes(actual)) {
    return {
      status: 400,
      body: {
        msg: "Type needs to be (".concat(expectedTypes, "), got ").concat(actual, " instead"),
        url: ""
      }
    };
  }
};

exports.oneOfType = oneOfType;