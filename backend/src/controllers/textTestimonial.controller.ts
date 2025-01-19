import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  avatarSchema,
  createTextTestimonialSchema,
  textTestimonialIdSchema,
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
      where: x.eq(textTestimonials.id, parserId.data.textTestimonialId),
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

export { createTextTestimonial, getTextTestimonialById };
