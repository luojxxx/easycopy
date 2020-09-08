import { Sequelize, DataTypes } from "sequelize";

import db from './../db'
import Users from './User'
import { userNameLimit, contentLimit } from "../constants";

const UrlSchema = db.define(
  "UrlTypes",
  {
    typeName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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

export default UrlSchema;
