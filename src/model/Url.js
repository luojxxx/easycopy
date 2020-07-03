import mongoose from "mongoose";

import db from "../db";
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  url: String,
  urlChar: String,
  content: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
  user: { type: String, default: "" },
  userId: { type: String, default: "" }
});

export default mongoose.model("url", UrlSchema);
