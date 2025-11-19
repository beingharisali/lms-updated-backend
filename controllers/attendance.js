// controllers/attendance.js
const Student = require("../models/Student");
const Course = require("../models/Course");

// Get students enrolled in a course along with their attendance
const getStudentsAttendance = async (req, res) => {
  const { courseId } = req.params;

  try {
    // 1️ Check if course exists
    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // 2️ Find students enrolled in this course
    const students = await Student.find({ "courses.selectedCourse": courseId }).select(
      "fullName phone courses.attendance"
    );

    // 3️ Prepare lecture list dynamically
    const lectures = [];
    for (let i = 1; i <= course.totalLectures; i++) {
      lectures.push(`Lecture ${i}`);
    }

    // 4️ Format students for frontend
    const studentsData = students.map((s, index) => ({
      srNo: index + 1,
      name: s.fullName,
      contact: s.phone,
      attendance: s.courses.attendance || {}, 
    }));

    res.json({ success: true, lectures, students: studentsData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getStudentsAttendance };
