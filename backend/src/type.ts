import { Content } from "mailgen";
import { Document } from "mongoose";

// type userSchema Schema<IUser>
export interface IUser extends Document {
  _id: string;
  firstName?: string;
  lastName?: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  avatar?: IImage;
  role?: string;
  refreshToken?: string;
  isEmailVerified?: Boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  forgotPasswordToken?: string;
  forgotPasswordExpiry?: Date;
}

// type spaceSchema Schema<ISpace>
export interface ISpace extends Document {
  _id: string;
  name: string;
  height: number;
  width: number;
  thumbnail: IImage;
  creatorId: string;
  creator: object;
  elements: string[];
}

// type spaceElementSchema Schema<ISpaceElement>
export interface ISpaceElement extends Document {
  _id: string;
  elementId: string;
  spaceId: string;
  x: number;
  y: number;
  element: object;
  space: object;
}

// type elementSchema Schema<IElement>
export interface IElement extends Document {
  _id: string;
  height: number;
  width: number;
  static: boolean;
  image: IImage;
  spaceElements: string[];
  mapElements: string[];
}

// type mapSchema Schema<IMap>
export interface IMap extends Document {
  _id: string;
  name: string;
  height: number;
  width: number;
  thumbnail: IImage;
  mapElements: string[];
}

// type mapElementSchema Schema<IMapElement>
export interface IMapElement extends Document {
  _id: string;
  elementId: string;
  mapId: string;
  x: number;
  y: number;
  element: object;
  map: object;
}

// type avatarSchema Schema<IAvatar>
export interface IAvatar extends Document {
  _id: string;
  image: IImage;
  users: string[];
}

// type sendEmail(options: IEmailContent)
export type IEmailContent = {
  email: string;
  subject: string;
  mailgenContent: Content;
};

export interface IImage {
  url?: string;
  publicId?: string;
}
