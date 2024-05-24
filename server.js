import http from "http";
import express from 'express';
const app = express();
import * as dotenv from "dotenv";
// import requestIp from "request-ip";
// import useragent from "express-useragent";
import bodyParser from "body-parser";
import { connectToDB } from "./config/dbConfig.js";
import path from "path";
import cors from "cors";
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectToDB();

const corsOptions = {
  origin: [
    "http://localhost:4095",  
  ],
};

app
  .use(bodyParser.json({ limit: "50mb" }))
  .use(
    bodyParser.urlencoded({
      extended: false,
      limit: "100mb",
    })
  )  
  .use(cors(corsOptions))
  .use("/", [
    userRoutes  
  ]) 
  
http.createServer({}, app).listen(process.env.PORT || 4000, () => {
  console.info(`Authentication server is running at ${process.env.PORT} PORT`);
});


