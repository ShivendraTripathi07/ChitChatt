const express = require("express");
// const {
//   registerUser,
//   authUser,
//   allUsers,
// } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const {
  allUsers,
  registerUser,
  authUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/signUp").post(registerUser);
router.post("/login", authUser);

module.exports = router;
