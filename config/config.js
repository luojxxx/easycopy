require("dotenv").config();
const fs = require("fs");

module.exports = {
  development: {
    username: "jingluo",
    password: null,
    database: "jingluo",
    host: "localhost",
    port: 5432,
    dialect: "postgresql",
  },
  test: {
    username: "jingluo",
    password: null,
    database: "jingluo",
    host: "localhost",
    port: 5432,
    dialect: "postgresql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    dialect: "postgresql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
