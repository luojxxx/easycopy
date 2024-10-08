import { Sequelize, DataTypes } from "sequelize";

import db from "./../db";
import Users from './User'

const EmailVerificationTokenSchema = db.define(
  "EmailVerificationToken",
  {
    verificationId: {
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
    verificationToken: {
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

export default EmailVerificationTokenSchema;
