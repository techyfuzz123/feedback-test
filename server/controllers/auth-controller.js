const { Student } = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Feedback } = require("../models/Feedback");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;

const studentLogin = async (req, res) => {
  const { regNo, dob, password } = req.body;
  // const { regNo,  password } = req.body;

  if (!regNo || !dob || !password) {
    return res
      .status(401)
      .json({ message: "need register number, date of birth and password" });
  }

  let student;
  try {
    student = await Student.findOne({ regNo: regNo });
  } catch (err) {
    return new Error(err);
  }
  if (!student) {
    return res.status(400).json({ message: "Invalid Credential" });
  }

  const isDobCorrect = dob === student.dob;
  const isPasswordCorrect = bcrypt.compareSync(password, student.password);

  if (!isPasswordCorrect) {
    // || !isDobCorrect
    return res.status(400).json({ message: "Invalid Credential" });
  }


  // Generating Token
  const token = jwt.sign({id:student._id}, JWT_SECRET_KEY, {
    expiresIn: "900s"
  });

  // console.log("Generated Token\n", token);

  if (req.cookies[`token`]) {
    req.cookies[`token`] = "";
  }

  // Adding token to cookie
  // String(student._id)
  res.cookie("token", token, {
    path: "/",
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes , (60 * 1000) = 1 min
    httpOnly: true,
    secure: true,
    // sameSite: "lax",
    // SameSite=SameSiteMode.None,
  });

  let liveFeedback;
  let isFeedbackSubmitted;
  const feedbackFilter = {
    batch: student.batch,
    degree: student.degree,
    section: student.section,
    isLive: true,
  };

  try {
    liveFeedback = await Feedback.findOne(feedbackFilter);
    isFeedbackSubmitted =
      student.isFeedbackSubmitted[liveFeedback.semester][
        liveFeedback.feedbackNo
      ];
  } catch (error) {
    console.log(error);
    return new Error(error);
  }

  if (isFeedbackSubmitted) {
    return res.status(200).json({ message: "No feedback to Submit" });
  }

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

  let feedback = {
    name: student.name,
    regNo: student.regNo,
    batch: liveFeedback.batch,
    degree: liveFeedback.degree,
    section: liveFeedback.section,
    semester: liveFeedback.semester,
    feedbackNo: liveFeedback.feedbackNo,
    subjects: subjects,
  };

  // let subjects =[
  //       {
  //         "subjectCode" : "20CS4343",
  //         "subjectName": "Cs for nobody",
  //         "faculty": "Ajith",
  //         "_id": "6340b16d3b3e449c0298517c"
  //     },
  //      {
  //         "subjectCode" : "20CS4344",
  //         "subjectName": "Cs for everybody",
  //         "faculty": "vijay",
  //         "_id": "6340b16d3b3e449c0298517d"
  //     }
  // ]

  // let include = [
  //      {
  //         "subjectCode" : "20CS4353",
  //         "subjectName": "Cs for them",
  //         "faculty": "Billa",
  //         "_id": "6340b16d3b3e449c0298517c"
  //     },
  //     {
  //         "subjectCode" : "20CS4373",
  //         "subjectName": "Cs for him",
  //         "faculty": "gilli",
  //         "_id": "6340b16d3b3e449c0298517c"
  //     }
  // ]

  // let exclude = [
  //     {
  //         "subjectCode" : "20CS4343",
  //         "subjectName": "Cs for nobody",
  //         "faculty": "Ajith",
  //         "_id": "6340b16d3b3e449c0298517c"
  //     }
  // ]

  // include.map(incSubject=> {
  //     subjects.map(subject => {
  //         console.log(subject['subjectCode']==incSubject['subjectCode'])
  //         if(subject['subjectCode']==incSubject['subjectCode']){

  //         }
  //     })
  // })

  // let a = [
  //     ...subjects,
  //     ...include
  // ]

  // let distincta = [...new Set(a)]

  //     if(map.has(exclude.subjectCode)){
  //         console.log(exclude.subjectCode)
  //     }
  // }

  // const mapq = new Map();
  // for (const subject of distincta) {
  //     if(mapq.has(exclude.subjectCode)){
  //         mapq.set(exclude.subjectCode, false);    // set any value to Map
  //         result.push({
  //             subjectCode: subject.subjectCode,
  //             subjectName: subject.subjectName,
  //             faculty: subject.faculty,
  //         });
  //     }
  // }

  // let b = new Map(result)

  // delete b.has(exclude.subjectCode)
  // console.log(b)

  // console.log(distincta)

  return res.status(200).json({ message: "Successfully Logged In", feedback });
};

const studentLogout = async (req, res) => {
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
  jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, student) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`token`); // ${student.id}
    req.cookies[`token`] = "";
    return res
      .status(200)
      .json({ message: "Successfully Logged Out", student });
  });
};

module.exports = { studentLogin, studentLogout };
