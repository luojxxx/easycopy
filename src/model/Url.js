import { Sequelize, DataTypes } from "sequelize";

import db from './../db'
import Users from './User'
import UrlTypes from './UrlTypes'
import { userNameLimit, contentLimit } from "../constants";

const UrlSchema = db.define(
  "Url",
  {
    urlId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlRaw: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: Users,
        key: "userId",
      },
    },
    userName: {
      type: DataTypes.STRING(userNameLimit),
      default: "",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UrlTypes,
        key: "typeName",
      },
    },
    content: {
      type: DataTypes.STRING(contentLimit),
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
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

export default UrlSchema;
