import UserToken from "../model/UserToken";

export const signOut = async (userId) => {
  await UserToken.destroy({
    where: { userId: userId },
  });

  return {
    status: 200,
    body: {
      msg: 'Success!',
    },
  };
};
