import mongoose from "mongoose";
import { config } from "./config/config";

const connectMongo = async () => {
  try {
    if (!config.mongoUrl || !config.dbName)
      throw new Error("mongolink is undefined");
    const con = await mongoose.connect(`${config.mongoUrl}`);
    console.log(`Connected to MongoDB: ${con.connection.host}`);
    return con;
  } catch (error) {
      console.log(`Mongo server is not connected`);
      console.log(error)
  }
};

export default connectMongo; 