import { z } from "zod";

const createCompanyRoleSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Company role must be at least 4 characters long" })
    .max(50, { message: "Campany role can't be more than 50 characters long" }),
});

const updateCompanyRoleSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Company role must be at least 4 characters long" })
    .max(50, { message: "Campany role can't be more than 50 characters long" })
    .optional(),
});

const companyRoleIdSchema = z.object({
  companyRoleId: z.string(),
});

export {
  createCompanyRoleSchema,
  updateCompanyRoleSchema,
  companyRoleIdSchema,
};
