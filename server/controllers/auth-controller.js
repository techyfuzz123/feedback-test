const { Student } = require("../models/Student");
const { Staff } = require("../models/Staff");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;
const IS_PRODUCTION = process.env.IS_PRODUCTION;

let secureAndSameSite = {};

if (IS_PRODUCTION) {
  secureAndSameSite = {
    secure: true,
    sameSite: "none",
  };
}

// * this function will run when a student tries to login
const studentLogin = async (req, res) => {
  const { regNo, dob, password } = req.body;

  // * checking if all three values are available
  if (!regNo || !dob || !password) {
    return res.status(401).json({
      eMessage: "need register number, date of birth and password",
      path: "student",
    });
  }

  // * find the student if available
  let student;
  try {
    student = await Student.findOne({ regNo: regNo });
  } catch (err) {
    return new Error(err);
  }
  if (!student) {
    return res
      .status(404)
      .json({ eMessage: "user not found", path: "student" });
  }

  // * Check if the dob and password are correct
  const isDobCorrect = dob === student.dob;
  const isPasswordCorrect = bcrypt.compareSync(password, student.password);

  if (!isPasswordCorrect || !isDobCorrect) {
    return res
      .status(400)
      .json({ eMessage: "Invalid Credential", path: "student" });
  }

  // * Generating Token
  const token = jwt.sign({ id: student.regNo }, JWT_SECRET_KEY, {
    expiresIn: "900s",
  });

  // * Adding token to cookie
  res.cookie("token", token, {
    path: "/",
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes , (60 * 1000) = 1 min
    httpOnly: true,
    ...secureAndSameSite,
  });

  // * data that has to be sent minimum
  let studentData = {
    name: student.name,
    regNo: student.regNo,
    batch: student.batch,
    degree: student.degree,
    section: student.section,
  };

  // let liveFeedback;
  // let isFeedbackSubmitted;
  // const feedbackFilter = {
  //   batch: student.batch,
  //   degree: student.degree,
  //   section: student.section,
  //   isLive: true,
  // };

  // // * Checking if there is any feedback is alive for the student
  // try {
  //   liveFeedback = await Feedback.findOne(feedbackFilter);
  //   if (!liveFeedback) {
  //     return res
  //       .status(200)
  //       .json({ ...studentData, message: "No feedback to Submit" });
  //   }
  //   isFeedbackSubmitted =
  //     student.isFeedbackSubmitted[liveFeedback.semester][
  //       liveFeedback.feedbackNo
  //     ];
  // } catch (error) {
  //   return new Error(error);
  // }

  // // * Checking if the student have submitted the alive feedback
  // if (isFeedbackSubmitted) {
  //   return res
  //     .status(200)
  //     .json({ ...studentData, message: "No feedback to Submit" });
  // }

  // // * combining the subjects and electives from feedback and student
  // let subs = [...liveFeedback.subjects, ...student.subjects.include];

  // const subjects = [];
  // const map = new Map();
  // for (const subject of subs) {
  //   if (!map.has(subject.subjectCode)) {
  //     map.set(subject.subjectCode, true); // set any value to Map
  //     subjects.push({
  //       subjectCode: subject.subjectCode,
  //       subjectName: subject.subjectName,
  //       faculty: subject.faculty,
  //     });
  //   }
  // }

  // // * Defining the data which has to be return to the user
  // let feedback = {
  //   semester: liveFeedback.semester,
  //   feedbackNo: liveFeedback.feedbackNo,
  //   subjects: subjects,
  // };

  return res.status(200).json({ ...studentData });
};

// * this function will run when a student tries to logout
const studentLogout = async (req, res) => {
  // * Checking if token exists and Getting the token from cookie
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      ...secureAndSameSite,
    })
    .json({ message: "logged out" });
};

const staffLogin = async (req, res) => {
  const { userName, password } = req.body;

  // * checking if all three values are available
  if (!userName || !password) {
    return res
      .status(401)
      .json({ eMessage: "need userName and password", path: "staff" });
  }

  // * find the student if available
  let staff;
  try {
    staff = await Staff.findOne({ userName: userName });
  } catch (err) {
    return new Error(err);
  }
  if (!staff) {
    return res.status(404).json({ eMessage: "user not found", path: "staff" });
  }

  // * Check if the password are correct
  const isPasswordCorrect = bcrypt.compareSync(password, staff.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ eMessage: "Invalid Credential", path: "staff" });
  }

  // * Generating Token
  const token = jwt.sign({ id: String(staff.userName) }, JWT_SECRET_KEY, {
    expiresIn: "900s",
  });

  // * removing old token if it exists
  if (req.cookies[`token`]) {
    req.cookies[`token`] = "";
  }

  // * Adding token to cookie
  res.cookie("token", token, {
    path: "/",
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes , (60 * 1000) = 1 min
    httpOnly: true,
    ...secureAndSameSite,
  });

  // * Defining the data which has to be return to the user
  let userData = {
    userName: staff.userName,
    role: staff.role,
    batch: staff.batch,
    degree: staff.degree,
    section: staff.section,
  };

  return res.status(200).json({ ...userData });
};

const staffLogout = async (req, res) => {
  // * Checking if token exists and Getting the token from cookie

  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      ...secureAndSameSite,
    })
    .json({ message: "logged out" });
};

module.exports = { studentLogin, studentLogout, staffLogin, staffLogout };
