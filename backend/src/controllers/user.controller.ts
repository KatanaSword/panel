import { User } from "../models/user.models.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response } from "express";
import { options } from "../constants.ts";
import {
  accountDetailUpdateSchema,
  signInUserSchema,
  updateProfileImageSchema,
  userRegisterSchema,
} from "../validations/schemas/userSchema.ts";
import jwt from "jsonwebtoken";
import { IUser } from "../type.ts";

const generateAccessRefreshToken = async (
  userId: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await User.findById(userId);
    const accessToken: string = user?.generateAccessToken();
    const refreshToken: string = user?.generateRefreshToken();

    await user?.save({ validateBeforeSave: false });
    user!.refreshToken = refreshToken;

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "An error occurred while generating tokens. Please try again later."
    );
  }
};

const userRegister = asyncHandler(async (req: Request, res: Response) => {
  const parserData = userRegisterSchema.safeParse(req.body);
  if (!parserData.success) {
    throw new ApiError(400, "Fields are empty");
  }

  const userExist = await User.findOne({
    $or: [
      {
        username: parserData.data.username,
        email: parserData.data.email,
        phoneNumber: parserData.data.phoneNumber,
      },
    ],
  });
  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username: parserData.data.username,
    email: parserData.data.email,
    phoneNumber: parserData.data.phoneNumber,
    password: parserData.data.password,
    role: parserData.data.role || "USER",
  });
  if (!user) {
    throw new ApiError(500, "User not created due to an internal server error");
  }

  const userCreate = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!userCreate) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, { user: userCreate }, "User register successfully")
    );
});

const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const parserData = signInUserSchema.safeParse(req.body);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty");
  }

  const user = await User.findOne({
    $or: [
      {
        email: parserData.data.email,
        phoneNumber: parserData.data.phoneNumber,
      },
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

  const { refreshToken, accessToken } = await generateAccessRefreshToken(
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
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: signedInUser, refreshToken, accessToken },
        "User successfully sign in"
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
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty");
    }
    const accountUpdate = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          firstName: parserData.data.firstName,
          lastName: parserData.data.lastName,
        },
      },
      { new: true }
    );
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
      process.env.REFRESH_TOKEN_SECRET!
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Missing or invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
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

export {
  userRegister,
  signInUser,
  signOutUser,
  getCurrentUser,
  accountDetailUpdate,
  refreshAccessToken,
  updateProfileImage,
};
