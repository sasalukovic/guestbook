import express from "express";

// using mysql2 because of auth problem with DB
import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "test",
});

app.listen(8800, () => {
  console.log("Connected to BE");
});
