import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("Connected to DB Successfully")
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
