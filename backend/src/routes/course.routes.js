import express from "express";

import { createCourse, getPublishedCourses, getCreatorCourses, } from "../controllers/course.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/create-course").post(verifyJWT, createCourse);
router.route("/published-course").post(verifyJWT, getPublishedCourses)
router.route("/creator-course").get(verifyJWT, getCreatorCourses)

export default router