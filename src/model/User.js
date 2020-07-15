import { Sequelize, DataTypes } from "sequelize";

import db from "./../db";
import { userLimit } from '../constants'

const UserSchema = db.define(
  "User",
  {
    // Model attributes are defined here
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(userLimit),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerifying: {
      type: DataTypes.STRING,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      default: Date.now,
    },
  },
  {
    // Other model options go here
  }
);

export default UserSchema;
