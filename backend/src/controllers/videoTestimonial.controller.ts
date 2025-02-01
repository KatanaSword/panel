import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  avatarSchema,
  createVideoTestimonialSchema,
  testimonialSchema,
} from "../validations/schemas/videoTestimonial.schema";
import { ApiError } from "../utils/ApiError";
import db from "../db";
import { videoTestimonials } from "../drizzle/videoTestimonial.schema";
import { ApiResponse } from "../utils/ApiResponse";

const createVideoTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = createVideoTestimonialSchema.safeParse(req.body);
    const imageLocalPath = avatarSchema.safeParse(req.file?.path);
    const videoLocalPath = testimonialSchema.safeParse(req.file?.path);
    const errorMessage = parserData.error?.issues.map(
      (issue) => issue.message
    ) as string[] | undefined;
    if (!parserData.success) {
      throw new ApiError(400, "Field is empty", errorMessage);
    }

    if (!imageLocalPath.success) {
      throw new ApiError(400, "Avatar path is missing");
    }

    if (!videoLocalPath.success) {
      throw new ApiError(400, "Avatar path is missing");
    }

    const uploadImage = await uploadImageToS3(videoLocalPath, "", "");
    if (!uploadImage) {
      throw new ApiError(400, "Image fail to upload");
    }

    const uploadVideo = await uploadVideoToS3(videoLocalPath, "", "");
    if (!uploadVideo) {
      throw new ApiError(400, "Video fail to upload");
    }

    const createVideoTestimonial = await db
      .insert(videoTestimonials)
      .values({
        fullName: parserData.data.fullName,
        email: parserData.data.email,
        company: parserData.data.company,
        role: parserData.data.role,
        socialLink: parserData.data.socialLink,
        avatar: uploadImage,
        testimonial: uploadVideo,
        ownerId: req.user.id,
      })
      .returning({
        id: videoTestimonials.id,
        fullName: videoTestimonials.fullName,
        email: videoTestimonials.email,
        company: videoTestimonials.company,
        role: videoTestimonials.role,
        socialLink: videoTestimonials.socialLink,
        avatar: videoTestimonials.avatar,
        testimonial: videoTestimonials.testimonial,
        ownerId: videoTestimonials.ownerId,
        created_at: videoTestimonials.created_at,
        updated_at: videoTestimonials.updated_at,
        deleted_at: videoTestimonials.deleted_at,
      });
    if (!createVideoTestimonial) {
      throw new ApiError(
        500,
        "Video testimonial not created due to an internal server error"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { videoTestimonial: createVideoTestimonial },
          "Create video testimonial successfully"
        )
      );
  }
);

export { createVideoTestimonial };
