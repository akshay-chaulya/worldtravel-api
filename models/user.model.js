import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    avatarUrl: {
      type: String,
      default:
        "http://res.cloudinary.com/dpwssfhtz/image/upload/v1725058336/m7jzttsqkglkvcecfjzb.png",
    },
    status: {
      type: Number,
      default: 1,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    userRole: {
      type: String,
      default: "user",
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
