import { z } from "zod";

const createTextTestimonialSchema = z.object({
  fullName: z.string().min(4, { message: "" }).max(150, { message: "" }),
  company: z.string().max(100, { message: "" }),
  testimonial: z.string().min(100, { message: "" }).max(250, { message: "" }),
  socialLink: z
    .string()
    .regex(/https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/, {
      message: "",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email" }),
  testimonialTitle: z
    .string()
    .min(4, { message: "" })
    .max(100, { message: "" }),
  role: z.enum([""]).optional(),
});

const updateTextTestimonialSchema = z.object({
  fullName: z
    .string()
    .min(4, { message: "" })
    .max(150, { message: "" })
    .optional(),
  company: z.string().max(100, { message: "" }).optional(),
  testimonial: z
    .string()
    .min(100, { message: "" })
    .max(250, { message: "" })
    .optional(),
  socialLink: z
    .string()
    .regex(/https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?/, {
      message: "",
    })
    .optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  testimonialTitle: z
    .string()
    .min(4, { message: "" })
    .max(100, { message: "" })
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
