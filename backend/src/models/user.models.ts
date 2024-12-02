import { Schema, model } from "mongoose";
import {
  availableUserRole,
  userRole,
  USER_TEMPORARY_TOKEN_EXPIRY,
} from "../constants.ts";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { IUser } from "../type.ts";

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
      index: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "email is required"],
      unique: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      required: [true, "phone number is required"],
      unique: true,
      minLength: 10,
      maxLength: 14,
    },
    avatar: {
      type: {
        url: String,
        publicId: String,
      },
      default: {
        url: "",
        publicId: "",
      },
    },
    role: {
      type: String,
      enum: availableUserRole,
      default: userRole.USER,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);

// Middleware for convert user password in hash before save in db.
userSchema.pre<IUser>("save", async function (next): Promise<void> {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 16);
  return next();
});

// Compare user given password and db password.
userSchema.methods.isPasswordValid = async function (
  password: string
): Promise<boolean> {
  const user = this as IUser;
  return await bcrypt.compare(password, user.password);
};

// Generate hash token
userSchema.methods.generateAccessToken = function (): string {
  const user = this as IUser;
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE!,
    }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  const user = this as IUser;
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE!,
    }
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unHashedToken: string = crypto.randomBytes(20).toString("hex");
  const hashedToken: string = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry: number = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
};
