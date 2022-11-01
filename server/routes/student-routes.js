const express = require("express");
const router = express.Router();
const {
  addStudents,
  getStudent,
  getStudents,
  updateStudents,
  deleteStudents,
} = require("../controllers/student-controller");
const studentValidationSchema = require("../utils/validation/student-validation");
const { validateData, checkStudentAuth } = require("../utils/middlewares");
const {
  getFeedbackForStudent,
} = require("../controllers/feedback-controller");

// set routes
router.post("/", validateData(studentValidationSchema), addStudents);
router.post("/g", getStudents);
router.get("/", getStudent);
router.put("/", updateStudents); // not working
router.delete("/", deleteStudents);
router.get("/feedback", checkStudentAuth, getFeedbackForStudent);

module.exports = router;
