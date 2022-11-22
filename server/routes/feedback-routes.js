const {
  addFeedback,
  deleteFeedback,
  updateFeedbackSubject,
  addFeedbackSubject,
  deleteFeedbackSubject,
  updateFeedback,
} = require("../controllers/feedback-controller");
const express = require("express");
const router = express.Router();
const feedbackValidationSchema = require("../utils/validation/feedback-validation");
const { validateData, checkStaffAuth } = require("../utils/middlewares");

// staff routes
router.post("/staff", checkStaffAuth, addFeedback);
router.post("/staff/delete", checkStaffAuth, deleteFeedback);
router.post("/staff/subject/update", checkStaffAuth, updateFeedbackSubject);
router.post("/staff/subject/delete", checkStaffAuth, deleteFeedbackSubject);
router.post("/staff/update/", checkStaffAuth, updateFeedback);
router.post("/staff/subject/", checkStaffAuth, addFeedbackSubject);

module.exports = router;
