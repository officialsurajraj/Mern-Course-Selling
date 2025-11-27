import express from "express";
import { enrollStudent, getEnrolledCoursesOfStudent, getStudentsOfCourse, checkEnrollmentStatus, getCourseLecturesForStudent } from "../controllers/enrolled.controllers.js"
import { verifyJWT, } from "../middleware/auth.middleware.js"
import { verifyEnrollment } from "../middleware/verifyEnrollment.js"
const router = express.Router()

router.route("/enrollStudent/:courseId").post(verifyJWT, enrollStudent);
router.route("/student/enrolled-courses").get(verifyJWT, getEnrolledCoursesOfStudent)
router.route("/course/:courseId/students").get(verifyJWT, getStudentsOfCourse)
router.route("/course/:courseId/is-enrolled").get(verifyJWT, verifyEnrollment, checkEnrollmentStatus);
router.route("/course/:courseId/lectures").get(verifyJWT, verifyEnrollment, getCourseLecturesForStudent)




export default router;