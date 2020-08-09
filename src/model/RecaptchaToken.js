import { Sequelize, DataTypes } from "sequelize";

import db from './../db'

const RecaptchaTokenSchema = db.define(
  "RecaptchaToken",
  {
    // Model attributes are defined here
    recaptchaTokenId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    recaptchaToken: {
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

export default RecaptchaTokenSchema;