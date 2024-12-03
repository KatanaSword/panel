import { User } from "../models/user.models.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response } from "express";
import { IUser } from "../type.ts";
import { options } from "../constants.ts";

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
  const { username, email, phoneNumber, password, role } = req.body as IUser;
  if (
    [username, email, phoneNumber, password].some(
      (field: string) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Fields are empty");
  }

  const userExist = await User.findOne({
    $or: [
      {
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim(),
      },
    ],
  });
  if (userExist) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    phoneNumber,
    password,
    role,
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
  const { email, phoneNumber, password } = req.body as IUser;
  if (!email.trim() || !phoneNumber.trim() || !password) {
    throw new ApiError(400, "Field is empty");
  }

  const user = await User.findOne({
    $or: [
      {
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim().toLowerCase(),
      },
    ],
  });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect: boolean = await user.isPasswordValid(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "User password invalid");
  }

  const { refreshToken, accessToken } = await generateAccessRefreshToken(
    user?._id
  );

  const signedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  res
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

export { userRegister, signInUser };
