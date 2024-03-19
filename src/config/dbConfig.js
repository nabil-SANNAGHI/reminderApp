import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOS_URL);
  } catch (error) {
    console.log(error);
  }
}
