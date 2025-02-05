import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  avatarSchema,
  createTextTestimonialSchema,
  textTestimonialIdSchema,
  updateTextTestimonialSchema,
} from "../validations/schemas/textTestimonial.schema";
import { ApiError } from "../utils/ApiError";
import db from "../db";
import { textTestimonials } from "../drizzle/textTestimonial.schema";
import { ApiResponse } from "../utils/ApiResponse";
import * as x from "drizzle-orm";
import { companyRoles } from "../drizzle/companyRole.schema";
import { companyRoleIdSchema } from "../validations/schemas/companyRole.schema";

const getAllTextTestimonials = asyncHandler(async (_, res: Response) => {
  const allTextTestimonials = await db.select().from(textTestimonials);
  if (allTextTestimonials.length < 1) {
    throw new ApiError(404, "Text testimonial not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allTextTestimonials,
        "Fetch all text testimonial successfully"
      )
    );
});

const createTextTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = createTextTestimonialSchema.safeParse(req.body);
    const imageLocalPath = avatarSchema.safeParse(req.file?.path);
    const errorMessage = parserData.error?.issues.map(
      (issue) => issue.message
    ) as string[] | undefined;
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty", errorMessage);
    }
    if (!imageLocalPath.success) {
      throw new ApiError(400, "Avatar path is missing");
    }

    const companyRoleToBeAdded = await db.query.companyRoles.findFirst({
      where: parserData.data.companyRole
        ? x.eq(textTestimonials.companyRole, parserData.data.companyRole)
        : undefined,
    });
    if (!companyRoleToBeAdded) {
      throw new ApiError(404, "Company role not found");
    }

    const uploadImage = await uploadImageToS3(imageLocalPath, "", "");
    if (!uploadImage) {
      throw new ApiError(400, "Image fail to upload");
    }

    const createTextTestimonial = await db
      .insert(textTestimonials)
      .values({
        fullName: parserData.data.fullName,
        company: parserData.data.company,
        email: parserData.data.email,
        avatar: uploadImage,
        testimonialTitle: parserData.data.testimonialTitle,
        testimonial: parserData.data.testimonialTitle,
        socialLink: parserData.data.socialLink,
        companyRole: companyRoleToBeAdded.id,
        ownerId: req.user.id,
      })
      .returning();
    if (!createTextTestimonial) {
      throw new ApiError(
        500,
        "Text testimonial not created due to an internal server error"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { textTestimonial: createTextTestimonial },
          "Create text testimonial successfully"
        )
      );
  }
);

const getTextTestimonialById = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = textTestimonialIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "Text testimonial id is missing");
    }

    const textTestimonial = await db.query.textTestimonials.findFirst({
      where: parserId.data.textTestimonialId
        ? x.eq(textTestimonials.id, parserId.data.textTestimonialId)
        : undefined,
    });
    if (!textTestimonial) {
      throw new ApiError(404, "Text testimonial not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          textTestimonial,
          "Text testimonial fetch successfully"
        )
      );
  }
);

const getTextTestimonialByCampanyRole = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = companyRoleIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "Text testimonial id is missing or invalid");
    }

    const companyRole = await db.query.companyRoles.findFirst({
      columns: {
        id: true,
        name: true,
      },
      where: parserId.data.companyRoleId
        ? x.eq(companyRoles.id, parserId.data.companyRoleId)
        : undefined,
    });
    if (!companyRole) {
      throw new ApiError(404, "Company role not found");
    }

    const textTestimonial = await db
      .select()
      .from(textTestimonials)
      .where(
        parserId.data.companyRoleId
          ? x.eq(textTestimonials.id, parserId.data.companyRoleId)
          : undefined
      );
    if (!textTestimonial) {
      throw new ApiError(
        500,
        "Text testimonial not fetch due to an internal server error"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          textTestimonial,
          "Text testimonials fetch successfully"
        )
      );
  }
);

const updateTextTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = updateTextTestimonialSchema.safeParse(req.body);
    const parserId = textTestimonialIdSchema.safeParse(req.params);
    const errorMessage = parserData.error?.issues.map(
      (issue) => issue.message
    ) as string[] | undefined;
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty", errorMessage);
    }
    if (!parserId.success) {
      throw new ApiError(400, "Text testimonial id is missing");
    }

    const textTestimonial = await db.query.textTestimonials.findFirst({
      where: parserId.data.textTestimonialId
        ? x.eq(textTestimonials.id, parserId.data.textTestimonialId)
        : undefined,
    });
    if (!textTestimonial) {
      throw new ApiError(404, "Update test testimonial successfully");
    }

    const companyRoleToBeAdded = await db.query.companyRoles.findFirst({
      where: parserData.data.companyRole
        ? x.eq(companyRoles.name, parserData.data.companyRole)
        : undefined,
    });
    if (!companyRoleToBeAdded) {
      throw new ApiError(404, "Company role not found");
    }

    const updateTextTestimonial = await db
      .update(textTestimonials)
      .set({
        fullName: parserData.data.fullName,
        company: parserData.data.company,
        testimonial: parserData.data.testimonial,
        testimonialTitle: parserData.data.testimonialTitle,
        socialLink: parserData.data.socialLink,
        email: parserData.data.email,
        companyRole: companyRoleToBeAdded.name,
      })
      .where(x.eq(textTestimonials.id, parserId.data.textTestimonialId))
      .returning();
    if (!updateTextTestimonial) {
      throw new ApiError(
        500,
        "Text testimonial update fail due to an internal server error"
      );
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updateTextTestimonial,
          "Update text testimonial successfully"
        )
      );
  }
);

const updateAvatar = asyncHandler(async (req: Request, res: Response) => {
  const parserId = textTestimonialIdSchema.safeParse(req.params);
  const imageLocalPath = avatarSchema.safeParse(req.file?.path);
  if (!parserId.success) {
    throw new ApiError(400, "The text testimonial id is missing or invalid");
  }
  if (!imageLocalPath.success) {
    throw new ApiError(400, "Image path is missing");
  }

  const textTestimonial = await db.query.textTestimonials.findFirst({
    where: parserId.data.textTestimonialId
      ? x.eq(textTestimonials.id, parserId.data.textTestimonialId)
      : undefined,
  });
  if (!textTestimonial) {
    throw new ApiError(404, "Text testimonial not found");
  }

  const uploadImage = await uploadImageToS3(imageLocalPath, "", "");
  if (!uploadImage) {
    throw new ApiError(404, "Image is not found");
  }

  const updateTextTestimonialAvatar = await db
    .update(textTestimonials)
    .set({
      avatar: uploadImage,
    })
    .where(x.eq(textTestimonials.id, parserId.data.textTestimonialId))
    .returning();
  if (!updateTextTestimonialAvatar) {
    throw new ApiError(
      500,
      "Avatar is not update due to an internal server error"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updateTextTestimonialAvatar,
        "Avatar update successfully"
      )
    );
});

const deleteTextTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = textTestimonialIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "The text testimonial id is missing");
    }

    const textTestimonial = await db.query.textTestimonials.findFirst({
      where: parserId.data.textTestimonialId
        ? x.eq(textTestimonials.id, parserId.data.textTestimonialId)
        : undefined,
    });
    if (!textTestimonial) {
      throw new ApiError(404, "Text testimonial not found");
    }

    const deleteTextTestimonial = await db
      .delete(textTestimonials)
      .where(x.eq(textTestimonials.id, parserId.data.textTestimonialId))
      .returning();
    if (!deleteTextTestimonial) {
      throw new ApiError(
        500,
        "Text testimonial delete fail due to an internal server error"
      );
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Delete text testimonial successfully"));
  }
);

export {
  getAllTextTestimonials,
  createTextTestimonial,
  getTextTestimonialById,
  getTextTestimonialByCampanyRole,
  updateTextTestimonial,
  updateAvatar,
  deleteTextTestimonial,
};
