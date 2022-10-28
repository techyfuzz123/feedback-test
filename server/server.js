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
const user_routes = require("./routes/user-routes");

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
app.use(morgan("common"));
app.use(express.json());

// set routes
app.use("/api/student", student_routes);
app.use("/api/feedback", feedback_routes);
app.use("/api/auth", auth_routes);
app.use("/api/response", response_routes);
app.use("/api/user", user_routes);

// listening to port
try {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}....`);
  });
} catch (error) {
  console.log(error);
}
