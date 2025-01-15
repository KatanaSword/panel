import { pgEnum } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../drizzle/user.schema";
import { USER_TEMPORARY_TOKEN_EXPIRY } from "../constants";

export const availablePaymentMethodEnum = pgEnum("payment_method", [
  "UNKNOWN",
  "RAZORPAY",
]);

export const timestamp = {
  updated_at: t.timestamp("updated_at"),
  created_at: t.timestamp("created_at").defaultNow().notNull(),
  deleted_at: t.timestamp("deleted_at"),
};

// To hash a password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

// To check a password
export async function isPasswordValid(
  password: string,
  hashPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashPassword);
}

// Generate Token
export function generateAccessToken() {
  return jwt.sign(
    {
      id: users.id,
      username: users.username,
      email: users.email,
    },
    process.env.ACCESS_TOKEN_SECURE!,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  ) as string;
}

export function generateRefreshToken() {
  return jwt.sign(
    {
      id: users.id,
    },
    process.env.REFRESH_TOKEN_SECURE!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
  ) as string;
}

export function generateTemporaryToken(): {
  unHashedToken: string;
  hashedToken: string;
  tokenExpiry: number;
} {
  const unHashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
}
