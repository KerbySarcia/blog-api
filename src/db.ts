import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/blog");
    console.log("mongodb successully connected");
  } catch (error) {
    console.log("MONGO DB ERROR => ", error);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};
