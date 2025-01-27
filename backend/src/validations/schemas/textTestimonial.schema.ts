import { z } from "zod";

const createTextTestimonialSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(50, { message: "Full name can't be more than 50 characters long" }),
  company: z
    .string()
    .max(50, { message: "Company can't be more than 50 characters long" }),
  testimonial: z
    .string()
    .min(100, { message: "Testimonial must be at least 100 characters long" })
    .max(250, { message: "Testimonial can't be more than 50 characters long" }),
  socialLink: z
    .string()
    .regex(/https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/, {
      message: "Invalid url",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email" }),
  testimonialTitle: z
    .string()
    .min(4, { message: "Testimonial title must be at least 4 characters long" })
    .max(100, {
      message: "Testimonial title can't be more than 100 characters long",
    }),
  role: z.enum([""]).optional(),
});

const updateTextTestimonialSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "Full name must be at least 4 characters long" })
    .max(50, { message: "Full name can't be more than 50 characters long" })
    .optional(),
  company: z
    .string()
    .max(50, { message: "Company can't be more than 50 characters long" })
    .optional(),
  testimonial: z
    .string()
    .min(100, { message: "Testimonial must be at least 100 characters long" })
    .max(250, { message: "Testimonial can't be more than 50 characters long" })
    .optional(),
  socialLink: z
    .string()
    .regex(/https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/, {
      message: "Invalid url",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  testimonialTitle: z
    .string()
    .min(4, { message: "Testimonial title must be at least 4 characters long" })
    .max(100, {
      message: "Testimonial title can't be more than 100 characters long",
    })
    .optional(),
  role: z.enum([""]).optional(),
});

const avatarSchema = z.object({
  avatar: z.string(),
});

const textTestimonialIdSchema = z.object({
  textTestimonialId: z.string(),
});

export {
  createTextTestimonialSchema,
  updateTextTestimonialSchema,
  avatarSchema,
  textTestimonialIdSchema,
};
