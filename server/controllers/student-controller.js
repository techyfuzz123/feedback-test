require("dotenv").config();
const { Student } = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT;

/* 
    This Controller can add students to the students 
    collection in the database
*/
const addStudents = async (req, res) => {
  const { regNo, dob } = req.body;
  // Student.insertMany(req.body, (error, docs) => {
  //     if (error) {
  //         console.log(error);
  //         return res.status(500).json({ error });
  //     }
  //     return res.status(200).json({ message: `${docs.length } students added successfully`, docs });
  // })

  let student;

  try {
    student = await Student.findOne({ regNo: regNo });
    if (student) {
      return res.status(409).json({ message: "student already exists" });
    }
  } catch (error) {
    console.log(error);
  }
  let hashPassword;

  try {
    hashPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    return res.status(409).json({ message: "need password" });
  }

  try {
    student = await Student({ ...req.body, password: hashPassword }).save();
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
  }
};

/*  
    This Controller will send the data of the student whose register
    number is provided from the client
*/
const getStudent = async (req, res) => {
  const cookies = req.headers.cookie;
  let prevToken = cookies;
  if (prevToken) {
    prevToken = prevToken.split("=")[1];
  }
  console.log(prevToken);
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  // verifying the token
  jwt.verify(String(prevToken), JWT_SECRET_KEY, async (err, student) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }

    body = {
      _id: student.id,
    };

    let feedback = await Student.find(body);

    return res.status(200).json({ message: "Successfully got data", feedback });
  });
};

const getStudents = async (req, res) => {
  let students = await Student.find(req.body);

  return res
    .status(200)
    .json({ strength: students.length, students: students });
};

/* 
    this Controller can add students to the students 
    collection in the database
*/
const updateStudents = async (req, res) => {
  let filter = {
    batch: req.body[0].batch,
    degree: req.body[0].degree,
    section: req.body[0].section,
  };

  let a = await Student.updateMany(filter, req.body);
  return res.status(500).json({ a: a });
};

/* 
    This Controller will delete the particular student
*/
const deleteStudents = async (req, res) => {
  const { regNo } = req.body;

  if (!regNo) {
    return res.status(400).json({ message: "need regNo" });
  }

  // see if the register number already exists
  let existingStudent;
  try {
    existingStudent = await Student.find({ regNo: regNo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!existingStudent) {
    return res.status(404).json({ message: "Student does'nt exists" });
  }

  try {
    await Student.deleteOne({ regNo: regNo });
    return res.status(200).json({ message: "Student Deleted" });
  } catch (error) {
    console.log(error);
  }
};

const getStudentsForAdvisor = async (req, res) => {
  const filter = {
    batch: req.batch,
    degree: req.degree,
    section: req.section,
  };

  let students;

  try {
    students = await Student.find(filter, "regNo name -_id");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

  if (!students[0]) {
    return res.status(409).json({ message: "no students" });
  }
  res.status(200).json([...students]);
};

const getStudentsForAdmin = async (req, res) => {


  let students;

  try {
    students = await Student.find({}, "regNo name batch degree section -_id");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }

  if (!students[0]) {
    return res.status(409).json({ message: "no students" });
  }
  res.status(200).json([...students]);
};

module.exports = {
  addStudents,
  getStudent,
  getStudents,
  updateStudents,
  deleteStudents,
  getStudentsForAdvisor,
  getStudentsForAdmin,
};
