const router = require("express").Router();
const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user-controller.js");
const userValidationSchema = require("../utils/validation/user-validation");
const { validateData } = require("../utils/middlewares");

router.post("/", validateData(userValidationSchema), addUser);

module.exports = router;
