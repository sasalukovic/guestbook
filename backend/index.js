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

app.get("guestbook", (req, res) => {
  // Using ID(autoincrement) to get last 10 messages
  const q = "SELECT * FROM guestbook ORDER BY id DESC LIMIT 10";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/guestbook", (req, res) => {
  const q = "INSERT INTO guestbook (`name`, `message`) VALUES (?)";
  const values = [req.body.name, req.body.message];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to BE");
});
