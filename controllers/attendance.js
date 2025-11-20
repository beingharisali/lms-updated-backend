
const Student = require("../models/Student");
const Course = require("../models/Course");

// @desc    Get students enrolled in a course along with their attendance
// @route   GET /api/v1/courses/:courseId/students-attendance
// @access  Private/Instructor
const getStudentsAttendance = async (req, res) => {
  const { courseId } = req.params;
  console.log("📌 Course ID received in backend:", courseId);

  try {
    // 1️⃣ Check if the course exists
    const course = await Course.findOne({ courseId }).lean();
    if (!course) {
      console.log("❌ Course not found for ID:", courseId);
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    console.log("✅ Course found:", course.courseName, "-", course.courseId);

    // 2️⃣ Find students enrolled in this course
    const students = await Student.find({ "courses.selectedCourse": courseId })
      .select("fullName phone courses")
      .lean();
    console.log(` Students found for course ${courseId}:`, students.length);

    // 3️⃣ Prepare lecture list dynamically
    const lectures = [];
    for (let i = 1; i <= (course.totalLectures || 0); i++) {
      lectures.push(`Lecture ${i}`);
    }

    // 4️⃣ Map students data for frontend
    const studentsData = students.map((s, index) => {
      const courseData = Array.isArray(s.courses)
        ? s.courses.find((c) => c.selectedCourse === courseId)
        : s.courses;

      return {
        srNo: index + 1,
        name: s.fullName || "N/A",
        contact: s.phone || "N/A",
        attendance: courseData?.attendance || {},
      };
    });

    console.log(" Students data prepared:", studentsData);

    return res.json({ success: true, lectures, students: studentsData });
  } catch (err) {
    console.error(" Error in getStudentsAttendance:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getStudentsAttendance };
