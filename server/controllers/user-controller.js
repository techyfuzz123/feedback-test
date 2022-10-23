require("dotenv").config();
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT;

/* 
    This Controller can add user to the users 
    collection in the database
*/
const addUser = async (req, res) => {
  const { userName, password } = req.body;

  let user;

  try {
    user = await User.findOne({ userName: userName });
    if (user) {
      return res.status(409).json({ message: "user already exists" });
    }
  } catch (error) {
    console.log(error);
  }
  let hashPassword;

  try {
    hashPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return res.status(409).json({ message: "need password" });
  }

  try {
    user = await User({ ...req.body, password: hashPassword }).save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

/*  
    This Controller will send the data of the user whose user
    name is provided from the client
*/
const getUser = async (req, res) => {
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

/* 
    this Controller can update user to the users 
    collection in the database
*/
const updateUser = async (req, res) => {
  let filter = {
    batch: req.body[0].batch,
    degree: req.body[0].degree,
    section: req.body[0].section,
  };

  let a = await Student.updateMany(filter, req.body);
  return res.status(500).json({ a: a });
};

/* 
    This Controller will delete the particular user
*/
const deleteUser = async (req, res) => {
  const { regNo } = req.body;

  if (!regNo) {
    return res.status(400).json({ message: "need regNo" });
  }

  // see if the userName already exists
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

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
