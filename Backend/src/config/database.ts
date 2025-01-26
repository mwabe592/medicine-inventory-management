import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB has been connected successfully: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

export default connectDB;
