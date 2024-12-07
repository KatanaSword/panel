import { userRole } from "../constants.ts";
import { User } from "../models/user.models.ts";
import { ApiError } from "../utils/ApiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req: Request, _, next: NextFunction) => {
  try {
    const token: string | undefined =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace(Bearer, "");
    if (!token) {
      throw new ApiError(401, "Missing or invalid access token");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECURE!);
    if (!decodedToken) {
      throw new ApiError(401, "Invalid access token");
    }

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      401,
      message?.error || "Authorization token missing or invalid"
    );
  }
});

const verifyPermission = (role: string[] = []) => {
  console.log("role1:", role);
  asyncHandler(async (req: Request, _, next: NextFunction) => {
    if (!req.user?._id) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (role.includes(req.user?.role)) {
      console.log("Includes:", role.includes(req.user?.role));
      next();
    } else {
      throw new ApiError(403, "You are not authorized to perform this action");
    }
  });
};

export { verifyJWT, verifyPermission };
