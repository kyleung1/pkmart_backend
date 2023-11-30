import mongoose from "mongoose";

export async function connectToMongo() {
  if (mongoose.connection.readyState === 0 && process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI).catch((error: any) => {
      console.log(error);
    });
  }
}

// https://masteringjs.io/tutorials/mongoose/connection-status
