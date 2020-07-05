require("dotenv").config();
import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DB_STRING);

const dbCheck = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    // await db.sync({ force: true });
    // console.log("Models are synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

dbCheck()

export default db