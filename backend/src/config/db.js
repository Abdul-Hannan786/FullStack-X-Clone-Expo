import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    // await mongoose.connect(ENV.MONGO_URI);
    // console.log("Connected to DB Successfully")

    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
      await mongoose.connect(ENV.MONGO_URI);
  } catch (error) {
     console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};
