import { Sequelize, DataTypes } from "sequelize";

import db from './../db'

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
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      default: Date.now,
    },
    expiredAt: {
      type: DataTypes.DATE,
    },
    user: {
      type: DataTypes.STRING(256),
      default: "",
    },
    userId: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
  }
);

export default UrlSchema;
