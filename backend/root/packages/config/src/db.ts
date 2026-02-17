import mongoose from "mongoose";

let isConnected = false;

export const db = mongoose;

export const connectDB = async () => {
  if (isConnected) return;

  const conn = await mongoose.connect(process.env.MONGO_URI!, {
    serverSelectionTimeoutMS: 5000,
  });
  
  isConnected = true;

  console.log("✅ MongoDB connected:", conn.connection.host);
};
