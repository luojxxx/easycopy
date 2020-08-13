import { Op } from "sequelize";

import User from "../model/User";
import { sendVerificationEmail } from "./sendVerificationEmail";

export const changeUserName = async (userId, newUserName) => {
  await User.update({
    userName: newUserName,
  }, {
    where: {
      userId: userId
    }
  })

  return {
    status: 200,
    body: "Success!",
  };
};
