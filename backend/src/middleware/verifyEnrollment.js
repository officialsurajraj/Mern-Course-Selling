import { Course } from "../models/course.models.js";

export const verifyEnrollment = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const studentId = req.user.id; // From JWT

        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }

        const course = await Course.findById(courseId).select("students title");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const isEnrolled = course.students?.includes(studentId);

        if (!isEnrolled) {
            return res.status(403).json({
                message: "You are not enrolled in this course. Access Denied.",
                isEnrolled: false,
            });
        }

        next(); // Allow access to controller
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
