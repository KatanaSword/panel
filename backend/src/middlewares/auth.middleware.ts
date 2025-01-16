import db from "../db/index.ts";
import { JwtPayload } from "../type.ts";
import { ApiError } from "../utils/ApiError.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as x from "drizzle-orm";
import { users } from "../drizzle/user.schema.ts";

const verifyJWT = asyncHandler(async (req: Request, _, next: NextFunction) => {
  try {
    const token: string =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Missing or invalid access token");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECURE!
    ) as JwtPayload;
    if (!decodedToken) {
      throw new ApiError(401, "Invalid access token");
    }

    const user = await db.query.users.findFirst({
      where: decodedToken.id ? x.eq(users.id, decodedToken.id) : undefined,
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Authorization token missing or invalid");
  }
});

const verifyPermission = (roles: string[] = []) => {
  return asyncHandler(async (req: Request, _, next: NextFunction) => {
    if (!req.user?.id) {
      throw new ApiError(401, "Unauthorized request");
    }
    if (roles.includes(req.user.role)) {
      next();
    } else {
      throw new ApiError(403, "You are not authorized to perform this action");
    }
  });
};

export { verifyJWT, verifyPermission };
