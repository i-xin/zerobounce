const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const zerobounce = require("./zerobounce");

const port = 3333;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to zerobounce test server");
});

app.post("/process", (req, res) => {
  console.log("Headers start ===================");
  console.log(JSON.stringify(req.headers));
  console.log("Headers end =====================");

  console.log("Body start =======================");
  console.log(req.body);
  console.log("Body end =========================");
  console.log(`request has file id as ${req.body.file_id}`);
  zerobounce.getFile(req.body.file_id);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
