const api =
  process.env.REACT_APP_DEBUG === "true"
    ? "http://localhost:3000"
    : "https://easycopy.herokuapp.com";
const contentLimit = 10000;
const userLimit = 256;
const acceptedTypes = ["text", "url"];
const recaptchaSiteKey = "6LdPW64ZAAAAAA9CYgNohsoJeUz8Wna-egnYZDfz";

export default {
  api,
  contentLimit,
  userLimit,
  acceptedTypes,
  recaptchaSiteKey
};
