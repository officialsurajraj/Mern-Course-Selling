import express from "express";
const router = express.Router();
import { verifyJWT } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

import { register, login, logout, uploadImage } from "../controllers/user.controllers.js"

router.route("/register").post(register);
router.route("/login").post(login)
router.route("/logout").post(verifyJWT, logout)
router.route("/upload-profile").patch(verifyJWT, upload.single("photoUrl"), uploadImage)

export default router