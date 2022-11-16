const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connection = require("./db");
const student_routes = require("./routes/student-routes");
const feedback_routes = require("./routes/feedback-routes");
const auth_routes = require("./routes/auth-routes");
const response_routes = require("./routes/response-routes");
const staff_routes = require("./routes/staff-routes");
// var bodyParser = require("body-parser");

// const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT;
// if (IS_DEVELOPMENT) {
//   app.use(bodyParser.json({ limit: "50mb" }));
//   app.use(
//     bodyParser.urlencoded({
//       limit: "50mb",
//       extended: true,
//       parameterLimit: 50000,
//     })
//   );
// }

// connecting to database
connection();

// Variables
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: `${process.env.FRONT_URL}`,
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true,
  methods: "GET, PUT, POST, DELETE",
  contentType: "application/json",
};

// middlewares
app.use(cors(corsOptions));
app.use(cookieParser());

morgan.token("date", function () {
  var p = new Date()
    .toString()
    .replace(/[A-Z]{3}\+/, "+")
    .split(/ /);
  return p[2] + "/" + p[1] + "/" + p[3] + ":" + p[4] + " " + p[5];
});

app.use(morgan("common"));

// set routes
app.use("/api/student", student_routes);
app.use("/api/feedback", feedback_routes);
app.use("/api/auth", auth_routes);
app.use("/api/response", response_routes);
app.use("/api/staff", staff_routes);

// listening to port
try {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}....`);
  });
} catch (error) {
  console.log(error);
}

// backup cmd
// mongodump --uri='mongodb://username:password@localhost:27017/feedback' --gzip --archive=/data/backup/backup.gz
// restore cmd "ignore this"
// mongorestore mongodb://username:password@0.0.0.0:27017/feedback --gzip --archive=./temp.gz --authenticationDatabase=admin
