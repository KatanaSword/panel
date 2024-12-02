import { Document } from "mongoose";

export interface IAvatar {
  url?: string;
  publicId?: string;
}

export interface IUser extends Document {
  _id: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  avatar?: IAvatar;
  role: string;
  refreshToken?: string;
  isEmailVerified?: Boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
}
