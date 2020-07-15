export const bodyContains = (expected, actual) => {
  if (!expected.every((key) => Object.keys(actual).includes(key))) {
    return {
      status: 400,
      body: {
        msg: "Missing arguments",
      },
    };
  }
};

export const bodyContainsStrings = (expected, actual) => {
  if (!expected.every((key) => typeof actual[key] === "string")) {
    return {
      status: 400,
      body: {
        msg: "Invalid arguments",
      },
    };
  }
};

export const bodyContainsInt = (expected, actual) => {
  if (!expected.every((key) => Number.isInteger(actual[key]))) {
    return {
      status: 400,
      body: {
        msg: "Invalid arguments",
      },
    };
  }
};

export const isString = (actual) => {
  if (typeof actual !== "string") {
    return {
      status: 400,
      body: {
        msg: "Invalid arguments",
      },
    };
  }
};

export const lessThanLength = (limit, actual) => {
  const limitName = Object.keys(limit);
  const limitValue = limit[limitName[0]];
  if (actual.length > limitValue) {
    return {
      status: 400,
      body: {
        msg: `${limitName} is longer than the ${limitValue} limit`,
        url: "",
      },
    };
  }
};

export const oneOfType = (expectedTypes, actual) => {
  if (!expectedTypes.includes(actual)) {
    return {
      status: 400,
      body: {
        msg: `Type needs to be (${expectedTypes}), got ${actual} instead`,
        url: "",
      },
    };
  }
};
