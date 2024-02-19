import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URL;

export const connectDB = async (): Promise<void> => {
  try {
    // console.log(MONGODB_URI);
    await mongoose.connect(
      "mongodb+srv://adminuser:rel40417@cluster0.e7hmk89.mongodb.net/"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
