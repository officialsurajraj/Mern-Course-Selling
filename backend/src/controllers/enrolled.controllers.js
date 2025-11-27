// /* 

import { Course } from "../models/course.models.js";
import { User } from "../models/user.models.js";

// 1️⃣ Enroll Student in a Course
// 2️⃣ Get All Enrolled Courses of a Student
// 3️⃣ Get All Students Enrolled in a Course
// 4️⃣ Unenroll / Remove Student from Course (optional)
// 5️⃣ Check Enrollment Status (optional but useful)


export const enrollStudent = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user.id;

    if (!courseId || !studentId) {
        return res.status(400).json({ message: "Course ID & Student ID is Required now" })
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json(
            {
                message: "Course is not found"
            }
        )
    }

    const student = await User.findById(studentId)

    if (!student) {
        return res.status(404).json(
            {
                message: "User is not found"
            }
        )
    }
    const isAlreadyEnrolled = course.enrolledStudents.includes(studentId);

    if (isAlreadyEnrolled) {
        return res.status(409).json(
            {
                message: "User is already enrolled"
            }
        )
    }

    course.enrolledStudents.push(studentId);
    student.enrolledCourses.push(courseId)

    await course.save()
    await student.save()

    return res.status(200).json({
        message: "Enrollment successful",
        course: {
            id: course._id,
            title: course.title,
        },
        student: {
            id: student._id,
            name: student.name,
            email: student.email,
        },
    });
}

export const getEnrolledCoursesOfStudent = async (req, res) => {
    try {
        const studentId = req.user.id;

        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" });
        }

        const student = await User.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        if (!student.enrolledCourses || student.enrolledCourses.length === 0) {
            return res.status(200).json({
                message: "You have not enrolled in any courses yet",
                enrolledCourses: [],
            });
        }

        const enrolledCourses = await Course.find({
            _id: { $in: student.enrolledCourses },
        })
            .select("title description thumbnail instructor price lectures")
            .populate("creator", "name email");

        return res.status(200).json({
            message: "Enrolled courses fetched successfully",
            totalCourses: enrolledCourses.length,
            enrolledCourses,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const getStudentsOfCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        const course = await Course.findById(courseId)
            .populate("enrolledStudents", "name email profilePic createdAt") // only required fields
            .select("title students");

        // 3️⃣ If course not found
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // 4️⃣ If no students enrolled yet
        if (!course.students || course.students.length === 0) {
            return res.status(200).json({
                message: "No students have enrolled in this course yet",
                totalStudents: 0,
                students: [],
            });
        }

        // 5️⃣ Success response
        return res.status(200).json({
            message: "Enrolled students fetched successfully",
            courseTitle: course.title,
            totalStudents: course.students.length,
            students: course.students, // student list
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const checkEnrollmentStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id; // student identity from token

        // 1️⃣ Validate inputs
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        // 2️⃣ Find course
        const course = await Course.findById(courseId).select("students title");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // 3️⃣ Check if studentId exists in course.students
        const isEnrolled = course.students?.includes(studentId);

        // 4️⃣ Return response
        return res.status(200).json({
            course: course.title,
            courseId,
            isEnrolled,  // true / false
            message: isEnrolled
                ? "You are already enrolled in this course"
                : "You are not enrolled in this course",
        });

    } catch (error) {
        console.error("Error in checkEnrollmentStatus:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const getCourseLecturesForStudent = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Fetch only lectures (and maybe title)
        const course = await Course.findById(courseId)
            .select("title lecture")
            .populate("lecture", "lectureTitle videoUrl duration isPreviewFree");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({
            message: "Lectures fetched successfully",
            title: course.title,
            totalLectures: course.lecture.length,
            lectures: course.lecture,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch lectures",
            error: error.message,
        });
    }
};

