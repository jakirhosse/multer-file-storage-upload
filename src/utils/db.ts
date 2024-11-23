import mongoose from "mongoose";
import { envConfig } from "./env.config";

const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.MONGODB_URL as string);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
