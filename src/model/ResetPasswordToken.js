import { Sequelize, DataTypes } from "sequelize";

import db from './../db'

const ResetPasswordTokenSchema = db.define(
  "ResetPasswordToken",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    resetPasswordToken: {
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
  },
  {
    // Other model options go here
  }
);

export default ResetPasswordTokenSchema;