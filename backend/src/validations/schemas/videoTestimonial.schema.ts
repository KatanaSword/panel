import { z } from "zod";

const createVideoTestimonialSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(50, { message: "Full name can't be more than 50 characters long" }),
  company: z
    .string()
    .max(50, { message: "Company can't be more than 50 characters long" }),
  testimonial: z.string().url({ message: "Invalid url" }),
  socialLink: z
    .string()
    .regex(/https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/, {
      message: "Invalid url",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email" }),
  role: z.enum([""]).optional(),
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
  role: z.enum([""]).optional(),
});

const avatarSchema = z.object({
  avatar: z.string(),
});

const updateTestimonialSchema = z.object({
  testimonial: z.string().url({ message: "Invalid url" }).optional(),
});

const videoTestimonialIdSchema = z.object({
  VideoTestimonialId: z.string(),
});

export {
  createVideoTestimonialSchema,
  updateVideoTestimonialSchema,
  avatarSchema,
  updateTestimonialSchema,
  videoTestimonialIdSchema,
};
