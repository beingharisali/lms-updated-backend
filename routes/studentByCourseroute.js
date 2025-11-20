// routes/studentByCourse.route.js

const express = require("express");
const router = express.Router();

const {
  getStudentsByCourse,
} = require("../controllers/studentByCourse.controller");

// /api/students/course/:courseId
router.get("/course/:courseId", getStudentsByCourse);

module.exports = router;
