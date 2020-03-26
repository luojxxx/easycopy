const api =
  process.env.REACT_APP_DEBUG === "true"
    ? "http://localhost:3000"
    : "https://easycopy.herokuapp.com";
const contentLimit = 10000;
const userLimit = 256;

export default {
  api,
  contentLimit,
  userLimit
};
