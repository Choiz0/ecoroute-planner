import express from "express";
import { authenticateToken } from "../Middlewares/AuthMiddleware.js";
import UserSavings from "../models/UserSavings.js";

const router = express.Router();

router.post("/savings", authenticateToken, async (req, res) => {
  try {
    const {
      savings,
      transport,
      origin,
      destination,
      distance,
      duration,
      emission,
    } = req.body;

    const newSaving = new UserSavings({
      userId: req.user.id,
      savings,
      transport,
      origin,
      destination,
      distance,
      duration,
      emission,
      createdAt: new Date(),
    });
    await newSaving.save();
    res.status(201).json({
      message: "Savings added successfully",
      success: true,
      newSaving,
    });
  } catch (error) {
    console.error("fail to create savings", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
