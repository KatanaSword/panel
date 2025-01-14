import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { options } from "../constants";
import jwt from "jsonwebtoken";
import { userRegisterSchema } from "../validations/schemas/userSchema";
import db from "../db";
import { users } from "../drizzle/user.schema";
import { hashPassword } from "../utils/helpers";
import * as x from "drizzle-orm"

/*const generateAccessRefreshToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await User.findById(userId);
    const accessToken: string = user?.generateAccessToken();
    const refreshToken: string = user?.generateRefreshToken();

    // save refresh token in user document
    user.refreshToken = refreshToken;
    await user?.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "An error occurred while generating tokens. Please try again later."
    );
  }
};*/

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  // await db.delete(users)
  const parserData = userRegisterSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Fields is empty", errorMessage);
  }

  const userExist = await db.query.users.findMany({
    columns: {
      email: true,
      username: true
    },
    where: x.or(x.eq(users.email, parserData.data.email), x.eq(users.username, parserData.data.username)) 
  })
  if (userExist.length > 0) {
    throw new ApiError(409, "User already exists");
  }

  const setPassword = await hashPassword(parserData.data.password) as string
  if(!setPassword) {
    throw new ApiError(400, "Password generation failed due to invalid input parameters")
  }

  const user = await db.insert(users).values({username: parserData.data.username, email: parserData.data.email, password: setPassword, role: parserData.data.role}).returning({id: users.id, username: users.username, email: users.email, role: users.role, avatar: users.avatar, isEmailVerified: users.isEmailVerified, created_at: users.created_at})
  if (!user) {
    throw new ApiError(500, "User not created due to an internal server error");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user }, "User register successfully")
    );
});

/*const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const parserData = signInUserSchema.safeParse(req.body);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty");
  }

  const user = await User.findOne({
    $or: [
      { email: parserData.data.email },
      { phoneNumber: parserData.data.phoneNumber },
    ],
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect: boolean = await user.isPasswordValid(
    parserData.data.password
  );
  if (!isPasswordCorrect) {
    throw new ApiError(400, "User password invalid");
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user?._id
  );

  const signedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
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
    await User.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: { refreshToken: 1 },
      },
      { new: true }
    );
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

    const accountUpdate = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          firstName: parserData.data?.firstName,
          lastName: parserData.data?.lastName,
        },
      },
      { new: true }
    ).select("-password -refreshToken");
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
    const incomingRefreshToken: string | undefined =
      req.cookies?.refreshToken || req.body?.refreshToken;
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Missing or invalid refresh token");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECURE!
    );

    const user = await User.findById(decodedToken?._id);
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
      await generateAccessRefreshToken(user?._id);

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
    throw new ApiError(
      401,
      message?.error || "Refresh token missing or invalid"
    );
  }
});

const updateProfileImage = asyncHandler(async (req: Request, res: Response) => {
  const parserData = updateProfileImageSchema.safeParse(req.body);
  if (!parserData.success) {
    throw new ApiError(400, "");
  }
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const parserData = changePasswordSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordValid(
    parserData.data.currentPassword
  );
  if (!isPasswordCorrect) {
    throw new ApiError(400, "User password invalid");
  }

  user.password = parserData.data.newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User password change successfully"));
});

const assignRole = asyncHandler(async (req: Request, res: Response) => {
  const parserData = assignRoleSchema.safeParse(req.body);
  const parserId = mongodbUserIdSchema.safeParse(req.params);
  console.log(`"role2: ${parserData}\nuserId: ${parserId}`);
  if (!parserData.success && !parserId.success) {
    throw new ApiError(400, "Field is empty");
  }

  const user = await User.findById(parserId.data?.userId);
  console.log("user:", user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  console.log("UserRole:", (user.role = parserData.data?.role));
  await user.save({ validateBeforeSave: false });

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

  const user = await User.findOne({ password: parserData.data.email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user?.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  await sendEmail({
    email: user.email,
    subject: "Reset password",
    mailgenContent: forgotPasswordEmail(
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

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });
  if (!user) {
    throw new ApiError(
      489,
      "Token mismatch or expire, Please request a new token"
    );
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.password = parserData.data.resetPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Reset password successfully"));
});

const verifyUserEmailRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne(req.user?._id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
      throw new ApiError(409, "Email already verified!");
    }

    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      subject: "Email verify",
      mailgenContent: verifyUserEmailEmail(
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

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  user.isEmailVerified = true;
  await user?.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isEmailVerified: true },
        "Verify email successfully"
      )
    );
});*/

export {
  userRegister,
  /*signInUser,
  signOutUser,
  getCurrentUser,
  accountDetailUpdate,
  refreshAccessToken,
  updateProfileImage,
  changePassword,
  assignRole,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyUserEmailRequest,*/
};