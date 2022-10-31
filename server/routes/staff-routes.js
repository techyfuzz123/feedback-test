const router = require("express").Router();
const {
  addStaff,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/staff-controller.js");
const userValidationSchema = require("../utils/validation/staff-validation");
const { validateData, checkStaff } = require("../utils/middlewares");
const {
  getFeedbackForAdvisor,
} = require("../controllers/feedback-controller.js");

router.post("/", validateData(userValidationSchema), addStaff);
router.get("/feedbacks", checkStaff, getFeedbackForAdvisor);

module.exports = router;
