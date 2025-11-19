import express from "express";
const router = express.Router();
import { verifyJWT } from "../middleware/auth.middleware.js"
import { upload } from "../middleware/multer.middleware.js"

import { register, login, logout, uploadImage, changeCurrentPassword, getCurrentUser, updateAccountDetails } from "../controllers/user.controllers.js"

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/upload-profile").patch(verifyJWT, upload.single("photoUrl"), uploadImage);
router.route("/change-password").patch(verifyJWT, changeCurrentPassword);
router.route("/profile").get(verifyJWT, getCurrentUser);
router.route("/update-info").patch(verifyJWT, updateAccountDetails);



export default router