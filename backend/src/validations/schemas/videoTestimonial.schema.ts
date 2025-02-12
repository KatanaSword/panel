import { z } from "zod";

const createVideoTestimonialSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(50, { message: "Full name can't be more than 50 characters long" }),
  company: z
    .string()
    .max(50, { message: "Company can't be more than 50 characters long" }),
  socialLink: z
    .string()
    .regex(/https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/, {
      message: "Invalid url",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email" }),
  companyRole: z.string(),
});

const updateVideoTestimonialSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(50, { message: "Full name can't be more than 50 characters long" })
    .optional(),
  company: z
    .string()
    .max(50, { message: "Company can't be more than 50 characters long" })
    .optional(),
  socialLink: z
    .string()
    .regex(/https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/, {
      message: "Invalid url",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  companyRole: z.string().optional(),
});

const videoSchema = z.object({
  video: z.string(),
});

const avatarSchema = z.object({
  avatar: z.string(),
});

const updateVideoSchema = z.object({
  video: z.string().optional(),
});

const videoTestimonialIdSchema = z.object({
  videoTestimonialId: z.string(),
});

export {
  createVideoTestimonialSchema,
  updateVideoTestimonialSchema,
  videoSchema,
  avatarSchema,
  updateVideoSchema,
  videoTestimonialIdSchema,
};
