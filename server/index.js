const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "ar0330",
  database: "mydb",
});

app.post("/registory", (req, res) => {
  const username = req.body.useremail;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (username, password) VALUES (?,?)",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong useremail/password combination!" });
      }
    }
  );
});

app.post("/login", (req, res) => {

  const useremail = req.body.useremail;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE useremail = ? AND password = ?",
    [useremail, password],
    (err, result) => {
      console.log(err);
    }
  );
});
app.listen(3001, () => {
  console.log("running server");
});
