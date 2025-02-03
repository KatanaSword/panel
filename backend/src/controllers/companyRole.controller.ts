import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  companyRoleIdSchema,
  createCompanyRoleSchema,
} from "../validations/schemas/companyRole.schema";
import { ApiError } from "../utils/ApiError";
import db from "../db";
import * as x from "drizzle-orm";
import { companyRoles } from "../drizzle/companyRole.schema";
import { ApiResponse } from "../utils/ApiResponse";

const getAllCompanyRoles = asyncHandler(
  async (req: Request, res: Response) => {}
);

const createCompanyRole = asyncHandler(async (req: Request, res: Response) => {
  const parserData = createCompanyRoleSchema.safeParse(req.body);
  const errorMessage = parserData.error?.issues.map((issue) => issue.message);
  if (!parserData.success) {
    throw new ApiError(400, "Field is empty", errorMessage);
  }

  const companyRoleExist = await db.query.companyRoles.findFirst({
    where: parserData.data.name
      ? x.eq(companyRoles.name, parserData.data.name)
      : undefined,
  });
  if (companyRoleExist) {
    throw new ApiError(409, "Company role already exist, try other name");
  }

  const createCompanyRole = await db
    .insert(companyRoles)
    .values({
      name: parserData.data.name,
      ownerId: req.user.id,
    })
    .returning({
      id: companyRoles.id,
      name: companyRoles.name,
      ownerId: companyRoles.ownerId,
      created_at: companyRoles.created_at,
      updated_at: companyRoles.updated_at,
      deleted_at: companyRoles.deleted_at,
    });
  if (!createCompanyRole) {
    throw new ApiError(
      500,
      "Company role not created due to an internal server error"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { companyRole: createCompanyRole },
        "Create company role successfully"
      )
    );
});

const getCompanyRoleById = asyncHandler(async (req: Request, res: Response) => {
  const parserId = companyRoleIdSchema.safeParse(req.params);
  if (!parserId.success) {
    throw new ApiError(400, "Company role id is missing or invalid");
  }

  const companyRole = await db.query.companyRoles.findFirst({
    where: parserId.data.companyRoleId
      ? x.eq(companyRoles.id, parserId.data.companyRoleId)
      : undefined,
  });
  if (!companyRole) {
    throw new ApiError(404, "Company role not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, companyRole, "Fetch company role successfully"));
});

const updateCompanyRole = asyncHandler(
  async (req: Request, res: Response) => {}
);

const deleteCompanyRole = asyncHandler(
  async (req: Request, res: Response) => {}
);

export {
  getAllCompanyRoles,
  createCompanyRole,
  getCompanyRoleById,
  updateCompanyRole,
  deleteCompanyRole,
};
