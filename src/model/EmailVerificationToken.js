import { Sequelize, DataTypes } from "sequelize";

import db from "./../db";

const EmailVerificationTokenSchema = db.define(
  "EmailVerificationToken",
  {
    // Model attributes are defined here
    verificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
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
