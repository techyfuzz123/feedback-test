const { Student } = require("../models/Student");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Feedback } = require("../models/Feedback");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;

// * this function will run when a student tries to login
const studentLogin = async (req, res) => {
  const { regNo, dob, password } = req.body;

  // * checking if all three values are available
  if (!regNo || !dob || !password) {
    return res
      .status(401)
      .json({ message: "need register number, date of birth and password" });
  }

  // * find the student if available
  let student;
  try {
    student = await Student.findOne({ regNo: regNo });
  } catch (err) {
    return new Error(err);
  }
  if (!student) {
    return res.status(404).json({ message: "user not found" });
  }

  // * Check if the dob and password are correct
  const isDobCorrect = dob === student.dob;
  const isPasswordCorrect = bcrypt.compareSync(password, student.password);

  if (!isPasswordCorrect || !isDobCorrect) {
    return res.status(400).json({ message: "Invalid Credential" });
  }

  // * Generating Token
  const token = jwt.sign({ regNo: student.regNo }, JWT_SECRET_KEY, {
    expiresIn: "900s",
  });

  // console.log("Generated Token\n", token);

  // * removing old token if it exists
  if (req.cookies[`${student.regNo}`]) {
    req.cookies[`${student.regNo}`] = "";
  }

  // * Adding token to cookie
  res.cookie(String(student.regNo), token, {
    path: "/",
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes , (60 * 1000) = 1 min
    httpOnly: true,
    // secure: true,
    // sameSite: "lax",
  });

  let liveFeedback;
  let isFeedbackSubmitted;
  const feedbackFilter = {
    batch: student.batch,
    degree: student.degree,
    section: student.section,
    isLive: true,
  };

  // * Checking if there is any feedback is alive for the student
  try {
    liveFeedback = await Feedback.findOne(feedbackFilter);
    if (!liveFeedback) {
      return res.status(200).json({ message: "No feedback to Submit" });
    }
    isFeedbackSubmitted =
      student.isFeedbackSubmitted[liveFeedback.semester][
        liveFeedback.feedbackNo
      ];
  } catch (error) {
    return new Error(error);
  }

  // * Checking if the student have submitted the alive feedback
  if (isFeedbackSubmitted) {
    return res.status(200).json({ message: "No feedback to Submit" });
  }

  // * combining the subjects and electives from feedback and student
  let subs = [...liveFeedback.subjects, ...student.subjects.include];

  const subjects = [];
  const map = new Map();
  for (const subject of subs) {
    if (!map.has(subject.subjectCode)) {
      map.set(subject.subjectCode, true); // set any value to Map
      subjects.push({
        subjectCode: subject.subjectCode,
        subjectName: subject.subjectName,
        faculty: subject.faculty,
      });
    }
  }

  // * Defining the data which has to be return to the user
  let userData = {
    name: student.name,
    regNo: student.regNo,
    batch: liveFeedback.batch,
    degree: liveFeedback.degree,
    section: liveFeedback.section,
    semester: liveFeedback.semester,
    feedbackNo: liveFeedback.feedbackNo,
    subjects: subjects,
  };

  return res.status(200).json({ userData });
};

const studentLogout = async (req, res) => {
  // * Checking if token exists and Getting the token from cookie
  const cookies = req.headers.cookie;
  let prevToken = cookies;
  if (prevToken) {
    prevToken = prevToken.split("=")[1];
  }
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  // * Verifying the token and deleting it
  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${data.regNo}`);
    req.cookies[`${data.regNo}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

const userLogin = async (req, res) => {
  const { userName, password } = req.body;

  // * checking if all three values are available
  if (!userName || !password) {
    return res.status(401).json({ message: "need userName and password" });
  }

  // * find the student if available
  let user;
  try {
    user = await User.findOne({ userName: userName });
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // * Check if the password are correct
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Credential" });
  }

  // * Generating Token
  const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: "900s",
  });

  // console.log("Generated Token\n", token);

  // * removing old token if it exists
  if (req.cookies[`${user._id}`]) {
    req.cookies[`${user._id}`] = "";
  }

  // * Adding token to cookie
  res.cookie(String(user._id), token, {
    path: "/",
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes , (60 * 1000) = 1 min
    httpOnly: true,
    // secure: true,
    // sameSite: "lax",
  });

  // * Defining the data which has to be return to the user
  let userData = {
    userName: user.userName,
    role : 'admin',
    a : 'a'
  };

  return res.status(200).json({ userData });
};

const userLogout = async (req, res) => {
  // * Checking if token exists and Getting the token from cookie
  const cookies = req.headers.cookie;
  let prevToken = cookies;
  if (prevToken) {
    prevToken = prevToken.split("=")[1];
  }
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  // * Verifying the token and deleting it
  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${data.id}`);
    req.cookies[`${data.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

module.exports = { studentLogin, studentLogout, userLogin, userLogout };
