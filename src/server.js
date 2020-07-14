import express from "express";
import { json } from "body-parser";
require("dotenv").config({ path: ".env" });
import cors from "cors";

const server = express();

import { userRoute } from "./routes";

require("./config/connection");

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "localhost";

server.use(json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
server.use(cors());

server.use(userRoute);

server.listen(PORT, () => {
  console.log(`Server Running at http://${HOST}:${PORT}/`);
});
