import UserToken from '../model/UserToken'

export const authentication = async function (req, res, next) {
  if (!("authorization" in req.headers)) {
    next();
  } else {
    const userToken = req.headers.authorization.replace("Bearer ", "");
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