export const api =
  process.env.REACT_APP_DEBUG === "true"
    ? "http://localhost:3000"
    : "https://easycopy.herokuapp.com";
export const contentLimit = 10000;
export const userNameLimit = 256;
export const acceptedTypes = ["text", "url"];
export const recaptchaSiteKeyV3 = "6LdPW64ZAAAAAA9CYgNohsoJeUz8Wna-egnYZDfz";
export const recaptchaSiteKeyV2 = "6LeRm7wZAAAAAFunidWbJu4apHdzQ_fweS1wrQu0";
export const dateFormat = "YYYY-MM-DD hh:mm:ssA";
export const pageSize = 10;