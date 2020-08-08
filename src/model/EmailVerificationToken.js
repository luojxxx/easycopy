import { Sequelize, DataTypes } from "sequelize";

import db from "./../db";
import Users from './User'

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
        model: Users,
        key: "userId",
      },
    },
    verificationToken: {
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

export default EmailVerificationTokenSchema;
