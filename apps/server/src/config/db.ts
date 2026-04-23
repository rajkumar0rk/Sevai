import mongoose from 'mongoose';
import { env } from "./env.js";

export async function connectDB():Promise<void>{
  mongoose.set("sanitizeFilter",true)
  mongoose.connect(env.MONGO_URL,{
    maxPoolSize:10,
    serverSelectionTimeoutMS:5000
  })
  //logger
}

