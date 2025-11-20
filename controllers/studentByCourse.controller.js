// controllers/studentByCourse.controller.js

const Student = require("../models/Student");

const Course = require("../models/Course");

// GET Students by Course ID
exports.getStudentsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Find students whose 'courses.selectedCourse' matches courseId
    const students = await Student.find({
      "courses.selectedCourse": courseId,
    }).select("fullName phone email studentId");

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Error fetching students by course:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching students",
    });
  }
};
