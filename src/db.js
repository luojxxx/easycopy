require("dotenv").config();
import { Sequelize } from "sequelize";
import { urlencoded } from "express";

const SSL = process.env.DB_SSL_OFF
  ? {}
  : {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };

const db = new Sequelize(process.env.DB_STRING, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: SSL,
  logging: false,
});

const dbCheck = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    if (process.env.DB_SYNC === "true") {
      try {
        await db.sync({ force: true });
        console.log("Models are synchronized");
      } catch (err) {
        console.log("Error!");
        console.log(err);
      }
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dbCheck();

export default db;
