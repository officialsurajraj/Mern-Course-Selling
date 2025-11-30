import express from "express";

import {
    createCourse,
    getPublishedCourses,
    getCreatorCourses,
    editCourse,
    removeCourse,
    createLecture,
    getCourseLecture,
    editLecture,
    removeLecture,
    getCreatorById
} from "../controllers/course.controllers.js"

import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router();

router.route("/create-course").post(verifyJWT, createCourse);
router.route("/published-course").get(verifyJWT, getPublishedCourses)
router.route("/creator-course").get(verifyJWT, getCreatorCourses)
router.route("/editcourse/:courseId").patch(verifyJWT, upload.single("thumbnail"), editCourse)
router.route("/removecourse/:courseId").delete(verifyJWT, removeCourse)
router.route("/create-lecture/:courseId").post(verifyJWT, createLecture);
router.route("/getCourseLecture/:courseId").get(verifyJWT, getCourseLecture)
router.route("/edit-lecture/:lectureId").patch(verifyJWT, upload.single("videoUrl"), editLecture)
router.route("/removelecture/:lectureId").delete(verifyJWT, removeLecture)
router.route("/getcreator").get(verifyJWT, getCreatorById)


export default router