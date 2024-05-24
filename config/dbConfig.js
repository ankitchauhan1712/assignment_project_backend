//Import------------------------------------------------------------------------------------------
import mongoose from "mongoose";
import * as dotenv from "dotenv";
//END---------------------------------------------------------------------------------------------

dotenv.config();

export function connectToDB() {
  if (process.env.HOST == "localhost") {
    return mongoose
      .connect(process.env.DB_URL, {})
      .then(() => console.log("Database connected"))
      .catch((err) => console.log(err, "mongoConfigError"));
  } else {
    const DB_URL = `mongodb+srv://ankitchauhan:Sankysingh%40123@cluster0.iilv4av.mongodb.net/Assingment`;

    return mongoose
      .connect(DB_URL, {})
      .then(() => console.log("Database connected"))
      .catch((err) => console.log(err, "mongoConfigError"));
  }
}
