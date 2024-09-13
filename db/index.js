import mongoose from "mongoose";
import { dbUrl } from "../config/index.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error connection to MongoDB: ", err.message);
    process.exit(1); // 1 failure 0 success code
  }
};
