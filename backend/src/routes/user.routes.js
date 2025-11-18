import express from "express";
const router = express.Router();
import { verifyJWT } from "../middleware/auth.middleware.js"

import { register, login, logout } from "../controllers/user.controllers.js"

router.route("/register").post(register);
router.route("/login").post(login)
router.route("/logout").post(verifyJWT, logout)

export default router