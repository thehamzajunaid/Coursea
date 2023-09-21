import express from "express";
import { register, login, logout, changePassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/change-password", changePassword)

export default router;
