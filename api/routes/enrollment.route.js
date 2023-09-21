import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getEnrollments, intent, confirm } from "../controllers/enrollment.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getEnrollments);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;
