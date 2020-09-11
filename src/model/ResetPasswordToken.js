import { Sequelize, DataTypes } from "sequelize";

import db from './../db'

const ResetPasswordTokenSchema = db.define(
  "ResetPasswordToken",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    resetPasswordToken: {
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

export default ResetPasswordTokenSchema;