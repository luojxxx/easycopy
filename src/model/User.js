import { Sequelize, DataTypes } from "sequelize";

import db from "./../db";
import { userNameLimit } from '../constants'

const UserSchema = db.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(userNameLimit),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    emailVerifying: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default UserSchema;
