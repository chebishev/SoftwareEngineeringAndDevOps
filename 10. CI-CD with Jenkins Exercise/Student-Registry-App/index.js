const express = require("express");
const app = express();
app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({ extended: true }));

const studentsController = require("./controllers/students-controller");

let students = require("./models/students-model");

studentsController.setup(app, students);

let port = process.argv[2];
if (!port) port = process.env["PORT"];
// Default: 8080, change to 3030 in order to work with Jenkins, and to be able to create proper image for docker
if (!port) port = 3030;

app
  .listen(port, () => {
    console.log(`App started. Listening at http://localhost:${port}`);
  })
  .on("error", function (err) {
    if (err.errno === "EADDRINUSE") console.error(`Port ${port} busy.`);
    else throw err;
  });
