import { Sequelize, DataTypes } from "sequelize";

import db from './../db'

const UrlSchema = db.define(
  "Url",
  {
    // Model attributes are defined here
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlChar: {
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
    user: {
      type: DataTypes.STRING(256),
      default: "",
    },
    userId: {
      type: DataTypes.STRING,
      default: "",
    },
  },
  {
    // Other model options go here
  }
);

export default UrlSchema;
