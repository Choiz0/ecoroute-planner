import { Signup, Login } from "../Controllers/AuthContoller.js";
import { Router } from "express";
import { authenticateToken } from "../Middlewares/AuthMiddleware.js";
import User from "../models/UserModel.js";
import UserSavings from "../models/UserSavings.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
// router.post("/", userVerification);
router.get("/verify", authenticateToken, (req, res) => {
  res.json({ status: true, user: req.user });
});
router.get("/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // 토큰에서 얻은 사용자 ID로 DB 조회
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username, email: user.email }); // 필요한 정보만 클라이언트에 전달
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/savings", authenticateToken, async (req, res) => {
//   try {
//     const {
//       savings,
//       transport,
//       origin,
//       destination,
//       distance,
//       duration,
//       emission,
//     } = req.body;

//     const newSaving = new UserSavings({
//       userId: req.user.id,
//       savings,
//       transport,
//       origin,
//       destination,
//       distance,
//       duration,
//       emission,
//       createdAt: new Date(),
//     });
//     await newSaving.save();
//     res.status(201).json({
//       message: "Savings added successfully",
//       success: true,
//       newSaving,
//     });
//   } catch (error) {
//     console.error("fail to create savings", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export default router;
