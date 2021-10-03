const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.route("/process", (req, res) => {
  console.log("Headers start ===================");
  console.log(JSON.stringify(req.headers));
  console.log("Headers end =====================");

  console.log("Body start =======================");
  console.log(req.body);
  console.log("Body end =========================");
  console.log(req.body[0]);
  console.log(JSON.parse(req.body));
});
