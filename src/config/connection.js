import { set, connect, connection } from "mongoose";

// We need to define the URL
const CONNECTION_URL =
  process.env.CONNECTION_URL || "mongodb://127.0.0.1:27017/userBook";
const DATABASE_NAME = process.env.DATABASE_NAME || "userBook";

set("useFindAndModify", false);

//Connection establishment
connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = connection;

db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log(`DB Connection with ${DATABASE_NAME} established successfully`);
});
