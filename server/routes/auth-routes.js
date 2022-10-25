const router = require("express").Router();
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {
  studentLogin,
  studentLogout,
  userLogin,
  userLogout,
} = require("../controllers/auth-controller.js");

router.post("/login", studentLogin);
router.post("/logout", studentLogout);
router.post("/user/login", userLogin);
router.post("/user/logout", userLogout);
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies['token'];
    console.log(token);
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
