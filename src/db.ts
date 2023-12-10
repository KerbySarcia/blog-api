import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || "mongodb://localhost:27017/blog");
    console.log("mongodb successully connected");
  } catch (error) {
    console.log("MONGO DB ERROR => ", error);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};
