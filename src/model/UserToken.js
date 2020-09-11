import { Sequelize, DataTypes } from "sequelize";

import db from './../db'
import Users from './User'

const UserTokenSchema = db.define(
  "UserToken",
  {
    userTokenId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Users,
        key: "userId",
      },
    },
    userToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      default: Date.now,
    },
    updatedAt: {
      type: DataTypes.DATE,
      default: Date.now,
    },
  }
);

export default UserTokenSchema;