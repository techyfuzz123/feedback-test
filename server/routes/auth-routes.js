const router = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  studentLogin,
  studentLogout,
  staffLogin,
  staffLogout,
} = require("../controllers/auth-controller.js");
const { Staff } = require("../models/Staff.js");
const { Student } = require("../models/Student.js");

router.post("/student/login", studentLogin);
router.post("/student/logout", studentLogout);
router.post("/staff/login", staffLogin);
router.post("/staff/logout", staffLogout);
router.get("/loggedIn", async (req, res) => {
  function parseJwt(token) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }
  try {
    const token = req.cookies["token"];
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT);
    const payload = parseJwt(token);

    if (!Number(payload.id)) {
      const staff = await Staff.findOne({ userName: payload.id }, "-password");
      return res.status(200).json(staff);
    } else {
      const student = await Student.findOne({ regNo: payload.id }, "-password");
      return res.status(200).json(student);
    }
    return res.status(403);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
