import bcrypt from "bcrypt";
import crypto from "crypto";
import uploadFile from "../cloudinary/cludinary.config.js";
import {
  clientUrl,
  resetPasswordTokenExpireAt,
  verificationTokenExpireAt,
} from "../config/index.js";
import { User } from "../models/index.js";
import {
  sendResetPasswordEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../nodemailer/nodemailer.sendEmail.js";
import {
  emailVerificationToken,
  generateHashPassword,
  generateToken,
} from "../utils/index.js";
import {
  loginInputsValidate,
  signupInputsValidate,
} from "../validation/index.js";
import { errorHandler } from "../utils/index.js";
import { responseHandler } from "../utils/index.js";

export const signup = async (req, res) => {
  try {
    const { success, error } = signupInputsValidate.safeParse(req.body);
    if (!success) {
      throw {
        status: 411,
        message: "Incorrect inputs",
        error: error.errors,
      };
    }
    const { email, firstName, lastName, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      throw {
        status: 411,
        message: "Email already exist",
      };
    }
    // Generate salt and hash password
    const hashPassword = await generateHashPassword(password);

    console.log(req.file);
    // upload avatar image in cloudinary
    if (req.file?.path) {
      req.avatarUrl = await uploadFile(req.file.path);
    }

    const verificationToken = emailVerificationToken();

    const newUser = await User.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      avatarUrl: req.avatarUrl,
      verificationToken,
      verificationTokenExpiresAt: verificationTokenExpireAt, // 24 hours
    });

    await sendVerificationEmail(newUser.email, newUser.verificationToken);

    return responseHandler(res, {
      message: `Account created successfully. Now go to your email:- ${newUser.email} and verify your email`,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { success, error } = loginInputsValidate.safeParse(req.body);
    if (!success) {
      throw {
        status: 403,
        message: "Invalid credentials",
        error: error.errors,
      };
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      throw {
        status: 404,
        message: "User does't exist",
      };
    }

    if (!user.status) {
      throw { status: 403, message: "Your account has been blocked." };
    }

    if (!user.isVerified) {
      throw { status: 403, message: "User not verified" };
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw {
        status: 403,
        message: "Incorrect password",
      };
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    return responseHandler(res, {
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      throw { message: "Empty code", status: 403 };
    }

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throw {
        status: 400,
        message: "Invalid or expired verification code or user doesn't exist",
      };
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.firstName);

    const token = generateToken(user._id);

    return responseHandler(res, {
      message: "Successfully verified",
      token,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw {
        status: 404,
        message: "User does't exist",
      };
    }

    if (!user.status) {
      throw { status: 403, message: "Your account has been blocked." };
    }

    if (!user.isVerified) {
      throw { status: 402, message: "User not verified" };
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordTokenExpireAt;
    await user.save();

    await sendResetPasswordEmail(
      user.email,
      `${clientUrl}/reset-password/${resetToken}`
    );

    return responseHandler(res, {
      message: "Reset password link was sended in your email address",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      throw { status: 403, message: "Empty token or password." };
    }
    if (password.length < 6) {
      throw {
        status: 411,
        message: "Password and confirmPassword doesn't match",
      };
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      throw {
        status: 404,
        message: "User does't exist or token expired",
      };
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;
    user.resetPasswordExpiresAt = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    return responseHandler(res, {
      message: "Password reset successful",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    if (!user) {
      throw {
        status: 404,
        message: "User does't exist",
      };
    }

    if (!user.status) {
      throw { status: 403, message: "Your account has been blocked." };
    }

    if (!user.isVerified) {
      throw { status: 403, message: "User not verified" };
    }

    return responseHandler(res, { success: true, user });
  } catch (error) {
    console.log("Error in checkAuth controler: ", error)
    errorHandler(res, error);
  }
};
