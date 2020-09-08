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
  },
  {
    // Other model options go here
  }
);

export default UrlSchema;
