require("dotenv").config();
import { Sequelize } from "sequelize";

const SSL = process.env.DB_SSL_OFF ? {} : {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
}

const db = new Sequelize(process.env.DB_STRING, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: SSL,
});

const dbCheck = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    if (process.env.DB_SYNC) {
      await db.sync({ force: true });
      console.log("Models are synchronized");
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

dbCheck()

export default db