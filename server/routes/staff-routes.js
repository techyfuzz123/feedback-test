const router = require("express").Router();
const {
  addStaff,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/staff-controller.js");
const userValidationSchema = require("../utils/validation/staff-validation");
const { validateData, checkStaffAuth } = require("../utils/middlewares");
const {
  getFeedbacksForAdvisor,
} = require("../controllers/feedback-controller.js");

router.post("/", validateData(userValidationSchema), addStaff);
router.get("/feedbacks", checkStaffAuth, getFeedbacksForAdvisor);

module.exports = router;
