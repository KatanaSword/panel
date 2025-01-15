import { Content } from "mailgen";

export interface JwtPayload {
  id: string;
}

interface IUser {
  id: string;
  fullName: string | null;
  username: string;
  email: string;
  phoneNumber: string | null;
  avatar: string | null;
  role: string | null;
  password: string;
  refreshToken: string | null;
  isEmailVerified: boolean | null;
  emailVerificationToken: string | null;
  emailVerificationExpiry: Date | null;
  forgotPasswordToken: string | null;
  forgotPasswordExpiry: Date | null;
}

export type IEmailContent = {
  email: string;
  subject: string;
  mailgenContent: Content;
};

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
