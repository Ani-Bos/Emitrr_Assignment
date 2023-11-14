import mongoose from "mongoose";

const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.jzadva4.mongodb.net/?retryWrites=true&w=majority`;

const mongoconnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default mongoconnect;
