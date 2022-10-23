const router = require("express").Router();
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

module.exports = router;
