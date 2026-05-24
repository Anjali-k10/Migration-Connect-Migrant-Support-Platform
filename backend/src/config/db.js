import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (!uri || uri === "memory") {
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri();
      console.log("Using in-memory MongoDB for development");
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
