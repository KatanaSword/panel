import { User } from "../models/user.models.ts";
import { ApiError } from "../utils/ApiError.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import { Request, Response } from "express";
import { IUser } from "../type.ts";

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

export { userRegister };
