import mongoose from "mongoose";

const connectToDatabase = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.error(" MONGO_URI is missing in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
