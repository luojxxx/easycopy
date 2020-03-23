const api = process.env.REACT_APP_DEBUG === 'true' ? "http://localhost:3000" : "https://easycopy.herokuapp.com"
const contentLimit = 10000;

export default {
  api,
  contentLimit
};
