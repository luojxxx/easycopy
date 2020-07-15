import { Sequelize, DataTypes } from "sequelize";

import db from './../db'

const UserTokenSchema = db.define(
  "UserToken",
  {
    // Model attributes are defined here
    userTokenId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "userId",
      },
    },
    userToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export default UserTokenSchema;