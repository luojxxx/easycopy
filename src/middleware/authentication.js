import Joi from 'joi'

import UserToken from '../model/UserToken'
import { genericInputLimit } from '../constants'

export const authentication = async function (req, res, next) {
  if (!("authorization" in req.headers)) {
    next();
  } else {
    const userToken = req.headers.authorization.replace("Bearer ", "");
    Joi.assert(userToken, Joi.string().max(genericInputLimit).required());
    const user = await UserToken.findOne({
      where: { userToken: userToken },
    });
    if (user) {
      req.userId = user.userId;
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  }
};