import Url from "../model/Url";

export const getUrl = async url => {
  const result = await Url.findOne({
    url: url
  });
  if (!result) {
    return {
      status: 404,
      body: {
        msg: "",
        content: "",
        user: "",
        type: "",
        createdAt: ""
      }
    };
  }
  return {
    status: 200,
    body: {
      msg: "",
      content: result.content,
      user: result.user,
      type: result.type,
      createdAt: result.createdAt
    }
  };
};
