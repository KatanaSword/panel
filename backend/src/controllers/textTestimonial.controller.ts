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

const createTextTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = createTextTestimonialSchema.safeParse(req.body);
    const imageLocalPath = avatarSchema.safeParse(req.file?.path);
    const errorMessage = parserData.error?.issues.map((issue) => issue.message);
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty", errorMessage);
    }
    if (!imageLocalPath.success) {
      throw new ApiError(400, "Avatar path is missing");
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
        role: parserData.data.role,
        ownerId: req.user.id,
      })
      .returning({
        id: textTestimonials.id,
        fullName: textTestimonials.fullName,
        company: textTestimonials.company,
        email: textTestimonials.email,
        avatar: textTestimonials.avatar,
        testimonialTitle: textTestimonials.testimonialTitle,
        testimonial: textTestimonials.testimonialTitle,
        socialLink: textTestimonials.socialLink,
        role: textTestimonials.role,
        ownerId: textTestimonials.ownerId,
        created_at: textTestimonials.created_at,
        updated_at: textTestimonials.updated_at,
        deleted_at: textTestimonials.deleted_at,
      });
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

const updateTextTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = updateTextTestimonialSchema.safeParse(req.body);
    const parserId = textTestimonialIdSchema.safeParse(req.params);
    const errorMessage = parserData.error?.issues.map((issue) => issue.message);
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty", errorMessage);
    }
    if (!parserId.success) {
      throw new ApiError(400, "Text testimonial id is missing");
    }

    const textTestimonial = await db
      .update(textTestimonials)
      .set({
        fullName: parserData.data.fullName,
        company: parserData.data.company,
        testimonial: parserData.data.testimonial,
        testimonialTitle: parserData.data.testimonialTitle,
        socialLink: parserData.data.socialLink,
        email: parserData.data.email,
        role: parserData.data.role,
      })
      .where(x.eq(textTestimonials.id, parserId.data.textTestimonialId))
      .returning({
        id: textTestimonials.id,
        fullName: textTestimonials.fullName,
        company: textTestimonials.company,
        testimonial: textTestimonials.testimonial,
        testimonialTitle: textTestimonials.testimonialTitle,
        avatar: textTestimonials.avatar,
        socialLink: textTestimonials.socialLink,
        email: textTestimonials.email,
        role: textTestimonials.role,
        created_at: textTestimonials.created_at,
        updated_at: textTestimonials.updated_at,
        deleted_at: textTestimonials.deleted_at,
      });
    if (!textTestimonial) {
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
          textTestimonial,
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

  const uploadImage = await uploadImageToS3(imageLocalPath, "", "");
  if (!uploadImage) {
    throw new ApiError(404, "Image is not found");
  }

  const textTestimonial = await db
    .update(textTestimonials)
    .set({
      avatar: uploadImage,
    })
    .where(x.eq(textTestimonials.id, parserId.data.textTestimonialId))
    .returning({
      id: textTestimonials.id,
      fullName: textTestimonials.fullName,
      company: textTestimonials.company,
      testimonial: textTestimonials.testimonial,
      testimonialTitle: textTestimonials.testimonialTitle,
      avatar: textTestimonials.avatar,
      socialLink: textTestimonials.socialLink,
      email: textTestimonials.email,
      role: textTestimonials.role,
      created_at: textTestimonials.created_at,
      updated_at: textTestimonials.updated_at,
      deleted_at: textTestimonials.deleted_at,
    });
  if (!textTestimonial) {
    throw new ApiError(
      500,
      "Avatar is not update due to an internal server error"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, textTestimonial, "Avatar update successfully"));
});

const deleteTextTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = textTestimonialIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "The text testimonial id is missing");
    }

    const textTestimonial = await db
      .delete(textTestimonials)
      .where(x.eq(textTestimonials.id, parserId.data.textTestimonialId))
      .returning();
    if (!textTestimonial) {
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
  createTextTestimonial,
  getTextTestimonialById,
  updateTextTestimonial,
  updateAvatar,
  deleteTextTestimonial,
};
