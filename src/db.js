require("dotenv").config();

import mongoose from "mongoose";

const main = async () => {
  try {
  const db = await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@easycopy.njrb5.mongodb.net/easycopy?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  console.info('Connected to DB')
  return db
  } catch (err) {
    console.error('Error connecting to DB')
    console.error(err)
  }
}

const db = main()

export default db