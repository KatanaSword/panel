import z from "zod";

const userRegisterSchema = z.object({
  username: z
    .string()
    .toLowerCase()
    .min(4, { message: "Username must be at least 4 characters long" })
    .max(15, { message: "Username can't be more than 15 characters long" })
    .trim(),
  email: z.string().trim().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Invalid password" }
    ),
  role: z.enum(["USER", "SUBSCRIBER", "ADMIN"]).optional(),
});

const signInUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string(),
});

const accountDetailUpdateSchema = z.object({
  fullName: z.string().trim().optional(),
  phoneNumber: z
  .string()
  .trim()
  .min(12, { message: "Phone number must be 10 digit" })
  .max(14, { message: "Phone number must be 10 digit" }).optional(),
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
  role: z.enum(["USER", "SUBSCRIBER", "ADMIN"]),
});

const resetPasswordSchema = z.object({
  resetPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "Invalid password" }
    ),
});

const tokenSchema = z.object({
  token: z.string(),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

const userIdSchema = z.object({
  userId: z.string(),
});

export {
  userRegisterSchema,
  signInUserSchema,
  accountDetailUpdateSchema,
  updateProfileImageSchema,
  changePasswordSchema,
  assignRoleSchema,
  userIdSchema,
  resetPasswordSchema,
  tokenSchema,
  forgotPasswordSchema,
};