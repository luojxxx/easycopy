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
    },
    content: {
      type: DataTypes.STRING(contentLimit),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: UrlTypes,
        key: "typeName",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      default: Date.now,
    },
    updatedAt: {
      type: DataTypes.DATE,
      default: Date.now,
    },
    expiredAt: {
      type: DataTypes.DATE,
    },
    userName: {
      type: DataTypes.STRING(userNameLimit),
      default: "",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Users,
        key: "userId",
      },
    },
  },
  {
    // Other model options go here
  }
);

export default UrlSchema;
