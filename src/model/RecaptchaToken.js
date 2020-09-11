import { Sequelize, DataTypes } from "sequelize";

import db from './../db'

const RecaptchaTokenSchema = db.define(
  "RecaptchaToken",
  {
    recaptchaTokenId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    recaptchaToken: {
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

export default RecaptchaTokenSchema;