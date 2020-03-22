import mongoose from "mongoose";

import db from "../db";
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  url: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: String, default: "" }
});

export default mongoose.model("url", UrlSchema);
