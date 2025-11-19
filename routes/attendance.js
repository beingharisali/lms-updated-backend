const express = require("express");
const router = express.Router();
const { getStudentsAttendance } = require("../controllers/attendance");
const authenticateUser = require("../middleware/authentication");

// Protect route
router.use(authenticateUser);

// GET students for a specific course
router.get("/:courseId/students-attendance", getStudentsAttendance);

module.exports = router;
