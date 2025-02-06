import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { options } from "../constants";
import jwt from "jsonwebtoken";
import {
  signInUserSchema,
  userRegisterSchema,
  accountDetailUpdateSchema,
  changePasswordSchema,
  assignRoleSchema,
  userIdSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  tokenSchema,
} from "../validations/schemas/userSchema";
import db from "../db";
import { users } from "../drizzle/user.schema";
import {
  hashPassword,
  isPasswordValid,
  generateAccessToken,
  generateRefreshToken,
  generateTemporaryToken,
} from "../utils/helpers";
import * as x from "drizzle-orm";
import { JwtPayload } from "../type";
import {
  forgotPasswordEmailMailgen,
  sendEmail,
  verifyUserEmailMailgen,
} from "../utils/mail";
import crypto from "crypto";

const generateAccessRefreshToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await db.query.users.findFirst({
      where: userId ? x.eq(users.id, userId) : undefined,
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = generateAccessToken();
    const refreshToken = generateRefreshToken();

    // save refresh token in user document
    user.refreshToken = refreshToken;

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "An error occurred while generating tokens. Please try again later."
    );
  }
};

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  // await db.delete(users)
  const parserData = userRegisterSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Fields is empty", errorMessage);
  }

  const userExist = await db.query.users.findFirst({
    where: x.or(
      parserData.data.email
        ? x.eq(users.email, parserData.data.email)
        : undefined,
      parserData.data.username
        ? x.eq(users.username, parserData.data.username)
        : undefined
    ),
  });
  if (userExist) {
    throw new ApiError(409, "User already exist");
  }

  const setPassword = (await hashPassword(parserData.data.password)) as string;
  if (!setPassword) {
    throw new ApiError(
      400,
      "Password generation failed due to invalid input parameters"
    );
  }

  const user = await db
    .insert(users)
    .values({
      username: parserData.data.username,
      email: parserData.data.email,
      password: setPassword,
      role: parserData.data.role,
    })
    .returning({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
      avatar: users.avatar,
      isEmailVerified: users.isEmailVerified,
      created_at: users.created_at,
    });
  if (!user) {
    throw new ApiError(500, "User not created due to an internal server error");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { user }, "User register successfully"));
});

const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const parserData = signInUserSchema.safeParse(req.body);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty");
  }

  const user = await db.query.users.findFirst({
    where: x.or(
      parserData.data.email
        ? x.eq(users.email, parserData.data.email)
        : undefined,
      parserData.data.username
        ? x.eq(users.username, parserData.data.username)
        : undefined
    ),
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = (await isPasswordValid(
    parserData.data.password,
    user.password
  )) as boolean;
  if (!isPasswordCorrect) {
    throw new ApiError(400, "User password invalid");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user.id
  );

  const signedInUser = await db.query.users.findFirst({
    columns: { password: false },
    where: user.id ? x.eq(users.id, user.id) : undefined,
  });
  if (!signedInUser) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: signedInUser, accessToken, refreshToken },
        "User sign in successfully"
      )
    );
});

const signOutUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    await db.query.users.findFirst({
      where: req.user.id ? x.eq(users.id, req.user.id) : undefined,
    });
    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .json(new ApiResponse(200, {}, "User sign out successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      "User not sign out due to an internal server error"
    );
  }
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "Fetch user successfully"));
  } catch (error) {
    throw new ApiError(500, "User not found due to an internal server error");
  }
});

const accountDetailUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = accountDetailUpdateSchema.safeParse(req.body);
    const errorMessage = parserData.error?.issues.map((issue) => issue.message);
    if (!parserData.success) {
      throw new ApiError(400, "", errorMessage);
    }

    const accountUpdate = await db
      .update(users)
      .set({
        fullName: parserData.data.fullName,
        phoneNumber: parserData.data.phoneNumber,
        updated_at: users.updated_at,
      })
      .where(x.eq(users.id, req.user.id))
      .returning({
        id: users.id,
        username: users.username,
        fullName: users.fullName,
        email: users.email,
        role: users.role,
        avatar: users.avatar,
        phoneNumber: users.phoneNumber,
        isEmailVerified: users.isEmailVerified,
        created_at: users.created_at,
        updated_at: users.updated_at,
      });
    if (!accountUpdate) {
      throw new ApiError(
        500,
        "Account not update due to an internal server error"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, accountUpdate, "Update account successfully"));
  }
);

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const incomingRefreshToken: string =
      req.cookies?.refreshToken || req.body?.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Missing or invalid refresh token");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECURE!
    ) as JwtPayload;

    const user = await db.query.users.findFirst({
      where: decodedToken.id ? x.eq(users.id, decodedToken.id) : undefined,
    });
    if (!user) {
      throw new ApiError(401, "Missing or invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(
        401,
        "Refresh token mismatch. Please reauthenticate to obtain a new access token"
      );
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessRefreshToken(user?.id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access and refresh tokens generated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, "Refresh token missing or invalid");
  }
});

/*const updateProfileImage = asyncHandler(async (req: Request, res: Response) => {
  const parserData = updateProfileImageSchema.safeParse(req.body);
  if (!parserData.success) {
    throw new ApiError(400, "");
  }
});*/

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const parserData = changePasswordSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const user = await db.query.users.findFirst({
    where: req.user.id ? x.eq(users.id, req.user.id) : undefined,
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = (await isPasswordValid(
    parserData.data.currentPassword,
    user.password
  )) as boolean;
  if (!isPasswordCorrect) {
    throw new ApiError(400, "User password invalid");
  }

  const setNewPassword = (await hashPassword(
    parserData.data.newPassword
  )) as string;
  if (!setNewPassword) {
    throw new ApiError(
      400,
      "Password generation failed due to invalid input parameters"
    );
  }

  user.password = setNewPassword;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User password change successfully"));
});

const assignRole = asyncHandler(async (req: Request, res: Response) => {
  const parserData = assignRoleSchema.safeParse(req.body);
  const parserId = userIdSchema.safeParse(req.params);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty");
  }
  if (!parserId.success) {
    throw new ApiError(400, "The userId field is missing or invalid");
  }

  const user = await db.query.users.findFirst({
    where: parserId.data?.userId
      ? x.eq(users.id, parserId.data?.userId)
      : undefined,
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.role = parserData.data.role;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Assign user role successfully"));
});

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const parserData = forgotPasswordSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const user = await db.query.users.findFirst({
    where: parserData.data.email
      ? x.eq(users.email, parserData.data.email)
      : undefined,
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { unHashedToken, hashedToken, tokenExpiry } = generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;

  await sendEmail({
    email: user.email,
    subject: "Reset password",
    mailgenContent: forgotPasswordEmailMailgen(
      user.username,
      `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Email sent on your email Id. Please check your inbox for further instructions"
      )
    );
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const parserData = resetPasswordSchema.safeParse(req.body);
  const parserToken = tokenSchema.safeParse(req.params);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }
  if (!parserToken.success) {
    throw new ApiError(
      401,
      "Reset token is missing or empty. Please provide a valid token"
    );
  }

  let hashedToken: string = crypto
    .createHash("sha256")
    .update(parserToken.data.token)
    .digest("hex");

  const user = await db.query.users.findFirst({
    where: x.and(
      hashedToken ? x.eq(users.forgotPasswordToken, hashedToken) : undefined,
      new Date() ? x.gt(users.forgotPasswordExpiry, new Date()) : undefined
    ),
  });
  if (!user) {
    throw new ApiError(
      489,
      "Token mismatch or expire, Please request a new token"
    );
  }

  user.forgotPasswordToken = null;
  user.forgotPasswordExpiry = null;

  user.password = parserData.data.resetPassword;

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Reset password successfully"));
});

const sendVerifyEmailRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await db.query.users.findFirst({
      where: x.eq(users.id, req.user?.id),
    });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
      throw new ApiError(409, "Email already verified!");
    }

    const { unHashedToken, hashedToken, tokenExpiry } =
      generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await sendEmail({
      email: user.email,
      subject: "Email verify",
      mailgenContent: verifyUserEmailMailgen(
        user.username,
        `${req.protocol}://${req.get("host")}/api/v1/users/verify_email/${unHashedToken}`
      ),
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Email sent on your email Id. Please check your inbox for further instructions"
        )
      );
  }
);

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const parserToken = tokenSchema.safeParse(req.params);
  if (!parserToken.success) {
    throw new ApiError(
      401,
      "Verify token is missing or empty. Please provide a valid token"
    );
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(parserToken.data.token)
    .digest("hex");

  const user = await db.query.users.findFirst({
    where: x.and(
      x.eq(users.emailVerificationToken, hashedToken),
      x.gt(users.emailVerificationExpiry, new Date())
    ),
  });
  if (!user) {
    throw new ApiError(
      489,
      "Token mismatch or expire, Please request a new token"
    );
  }

  user.emailVerificationToken = null;
  user.emailVerificationExpiry = null;

  user.isEmailVerified = true;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isEmailVerified: true },
        "Verify email successfully"
      )
    );
});

export {
  userRegister,
  signInUser,
  signOutUser,
  getCurrentUser,
  accountDetailUpdate,
  refreshAccessToken,
  // updateProfileImage,
  changePassword,
  assignRole,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerifyEmailRequest,
};
