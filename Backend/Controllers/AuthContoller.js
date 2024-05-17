import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { createSecretToken } from "../uitls/SecretToken.js";

export const Signup = async (req, res, next) => {
  try {
    const { email, username, password, createAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, username, password, createAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      secure: true,
    });
    res
      .status(201)
      .json({ message: "User created successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      path: "/",
      secure: true,
    });
    res.status(201);
    res.status(201).json({
      message: "User logged in successfully",
      success: true,
      token: token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};
