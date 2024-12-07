import { z } from "zod";

const userRegisterSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(10, { message: "Username can't be more than 10 characters long" })
    .trim(),
  email: z.string().trim().email({ message: "Invalid email" }),
  phoneNumber: z
    .string()
    .trim()
    .min(12, { message: "Phone number must be 10 digit" })
    .max(14, { message: "Phone number must be 10 digit" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Invalid password" }
    ),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

const signInUserSchema = z.object({
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  password: z.string(),
});

const accountDetailUpdateSchema = z.object({
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

const updateProfileImageSchema = z.object({
  avatar: z.object({
    url: z.string().optional(),
    publicId: z.string().optional(),
  }),
});

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Invalid password" }
    ),
});

const assignRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"]),
});

const mongodbUserIdSchema = z.object({
  userId: z.string(),
});

export {
  userRegisterSchema,
  signInUserSchema,
  accountDetailUpdateSchema,
  updateProfileImageSchema,
  changePasswordSchema,
  assignRoleSchema,
  mongodbUserIdSchema,
};
