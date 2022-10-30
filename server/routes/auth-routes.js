const router = require("express").Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  studentLogin,
  studentLogout,
  staffLogin,
  staffLogout,
} = require("../controllers/auth-controller.js");

router.post("/student/login", studentLogin);
router.get("/student/logout", studentLogout);
router.post("/staff/login", staffLogin);
router.get("/staff/logout", staffLogout);
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies["token"];
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
