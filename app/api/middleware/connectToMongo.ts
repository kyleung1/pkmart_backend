import mongoose from "mongoose";

export async function connectToMongo() {
  if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI).catch((error: any) => {
      console.log(error);
    });
  }
}
