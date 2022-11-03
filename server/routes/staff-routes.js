const router = require("express").Router();
const {
  addStaff,
  getUser,
  updateUser,
  deleteUser,
  getDashboardDetailsForAdvisor,
  getAdvisorsForAdmin,
} = require("../controllers/staff-controller.js");
const userValidationSchema = require("../utils/validation/staff-validation");
const {
  validateData,
  checkStaffAuth,
  checkAdminAuth,
} = require("../utils/middlewares");
const {
  getFeedbacksForAdvisor,
  getFeedbackForAdvisor,
  getFeedbacksForAdmin,
} = require("../controllers/feedback-controller.js");
const {
  getStudentsForAdvisor,
  getStudentsForAdmin,
} = require("../controllers/student-controller");

router.post("/", validateData(userValidationSchema), addStaff);
router.get("/feedbacks", checkStaffAuth, getFeedbacksForAdvisor);
router.post("/feedback", checkStaffAuth, getFeedbackForAdvisor);
router.get("/students", checkStaffAuth, getStudentsForAdvisor);
router.get("/dashboard", checkStaffAuth, getDashboardDetailsForAdvisor);

// admin
router.get("/a/feedbacks", checkAdminAuth, getFeedbacksForAdmin);
router.get("/a/students", checkAdminAuth, getStudentsForAdmin);
router.get("/a/advisors", checkAdminAuth, getAdvisorsForAdmin);

module.exports = router;
