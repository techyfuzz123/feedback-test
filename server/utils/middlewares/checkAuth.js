const { Responses } = require("../../models/Response");
const jwt = require("jsonwebtoken");
const { Staff } = require("../../models/Staff");
const { Student } = require("../../models/Student");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;

const updateReport = async (req, res, next) => {
  const filter = {
    batch: req.body.batch,
    degree: req.body.degree,
    section: req.body.section,
    semester: req.body.semester,
  };

  let a = [];

  let responses = await Responses.find(filter);

  responses.map(index, (response) => {
    let subjectResponses = response.subjects.response;

    subjectResponses.map(index, (singleSubjectResponse) => {});
  });
};


// middleware
//middleware function to check if the incoming request in authenticated:
const checkStaffAuth = async (req, res, next) => {
  const token = req.cookies["token"];
  //send error message if no token is found:
  if (!token)
    return res.status(401).json({ eMessage: "Access denied, token missing!" });

  try {
    //if the incoming request has a valid token, we extract the payload from the
    //  token and attach it to the request object.
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    let staff;
    try {
      staff = await Staff.findOne({ userName: payload.id });
    } catch (err) {
      return new Error(err);
    }
    if (!staff || staff.role != "ADVISOR")
      return res.status(401).json({ eMessage: "unAuthorized" });

    req.batch = staff.batch;
    req.degree = staff.degree;
    req.section = staff.section;
    next();
  } catch (error) {
    // token can be expired or invalid. Send appropriate errors in each case:
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session timed out,please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token,please login again!" });
    } else {
      //catch other unprecedented errors
      console.log("from checkAdminAuth");
      console.error(error);
      return res.status(400).json({ error });
    }
  }
};

const checkAdminAuth = async (req, res, next) => {
  const token = req.cookies["token"];
  //send error message if no token is found:
  if (!token)
    return res.status(401).json({ eMessage: "Access denied, token missing!" });

  try {
    //if the incoming request has a valid token, we extract the payload from the
    //  token and attach it to the request object.
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    let staff;
    try {
      staff = await Staff.findOne({ userName: payload.id });
    } catch (err) {
      return new Error(err);
    }
    if (!staff || staff.role != "ADMIN")
      return res.status(401).json({ eMessage: "unAuthorized" });

    next();
  } catch (error) {
    // token can be expired or invalid. Send appropriate errors in each case:
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session timed out,please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token,please login again!" });
    } else {
      //catch other unprecedented errors
      console.log("from checkAdminAuth");
      console.error(error);
      return res.status(400).json({ error });
    }
  }
};

const checkStudentAuth = async (req, res, next) => {
  const token = req.cookies["token"];
  //send error message if no token is found:
  if (!token)
    return res.status(401).json({ eMessage: "Access denied, token missing!" });

  try {
    //if the incoming request has a valid token, we extract the payload from the
    //  token and attach it to the request object.
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    if (!Number(payload.id)) {
      return res.status(401).json({ eMessage: "unAuthorized" });
    }

    let student;
    try {
      student = await Student.findOne({ regNo: payload.id });
    } catch (err) {
      return new Error(err);
    }
    if (!student) return res.status(401).json({ eMessage: "unAuthorized" });

    req.batch = student.batch;
    req.degree = student.degree;
    req.section = student.section;
    next();
  } catch (error) {
    // token can be expired or invalid. Send appropriate errors in each case:
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session timed out,please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token,please login again!" });
    } else {
      //catch other unprecedented errors
      console.error(error);
      return res.status(400).json({ error });
    }
  }
};

module.exports = {
  checkStaffAuth,
  checkStudentAuth,
  checkAdminAuth,
};
