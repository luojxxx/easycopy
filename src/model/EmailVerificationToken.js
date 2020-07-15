import { Sequelize, DataTypes } from "sequelize";

import db from "./../db";

const EmailVerificationTokenSchema = db.define(
  "EmailVerificationToken",
  {
    // Model attributes are defined here
    verificationId: {
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
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

export default EmailVerificationTokenSchema;
