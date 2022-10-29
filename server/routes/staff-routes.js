const router = require("express").Router();
const {
  addStaff,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/staff-controller.js");
const userValidationSchema = require("../utils/validation/staff-validation");
const { validateData } = require("../utils/middlewares");

router.post("/", validateData(userValidationSchema), addStaff);

module.exports = router;
