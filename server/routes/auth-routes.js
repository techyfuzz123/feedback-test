const router = require("express").Router();
const { studentLogin, studentLogout } = require("../controllers/auth-controller.js");


router.post("/login", studentLogin);
router.post("/logout", studentLogout);


module.exports = router;