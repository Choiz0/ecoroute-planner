import mongoose from "mongoose";

const userSavingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  savings: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  transport: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  emission: {
    type: String,
    required: true,
  },
});

const UserSavings = mongoose.model("UserSavings", userSavingsSchema);
export default UserSavings;
