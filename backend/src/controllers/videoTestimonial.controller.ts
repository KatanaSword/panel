import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  avatarSchema,
  createVideoTestimonialSchema,
  videoSchema,
  videoTestimonialIdSchema,
} from "../validations/schemas/videoTestimonial.schema";
import { ApiError } from "../utils/ApiError";
import db from "../db";
import { videoTestimonials } from "../drizzle/videoTestimonial.schema";
import { ApiResponse } from "../utils/ApiResponse";
import * as x from "drizzle-orm";

const getAllVideoTestimonials = asyncHandler(
  async (req: Request, res: Response) => {}
);

const createVideoTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const parserData = createVideoTestimonialSchema.safeParse(req.body);
    const imageLocalPath = avatarSchema.safeParse(req.file?.path);
    const videoLocalPath = videoSchema.safeParse(req.file?.path);
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
        companyRole: parserData.data.companyRole,
        socialLink: parserData.data.socialLink,
        avatar: uploadImage,
        video: uploadVideo,
        ownerId: req.user.id,
      })
      .returning();
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

const getVideoTestimonialById = asyncHandler(
  async (req: Request, res: Response) => {
    const parserId = videoTestimonialIdSchema.safeParse(req.params);
    if (!parserId.success) {
      throw new ApiError(400, "Video testimonial id is missing or invalid");
    }

    const videoTestimonial = await db.query.videoTestimonials.findFirst({
      where: parserId.data.videoTestimonialId
        ? x.eq(videoTestimonials.id, parserId.data.videoTestimonialId)
        : undefined,
    });
    if (!videoTestimonial) {
      throw new ApiError(404, "Video testimonial not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, videoTestimonial, "Fetch video testimonial"));
  }
);

const getVideoTestimonialByCampanyRole = asyncHandler(
  async (req: Request, res: Response) => {}
);

const updateVideoTestimonial = asyncHandler(
  async (req: Request, res: Response) => {}
);

const updateVideoTestimonialAvatar = asyncHandler(
  async (req: Request, res: Response) => {}
);

const updateVideoTestimonialVideo = asyncHandler(
  async (req: Request, res: Response) => {}
);

const deleteVideoTestimonial = asyncHandler(
  async (req: Request, res: Response) => {}
);

export {
  createVideoTestimonial,
  getVideoTestimonialById,
  updateVideoTestimonial,
  updateVideoTestimonialAvatar,
  updateVideoTestimonialVideo,
  getVideoTestimonialByCampanyRole,
  deleteVideoTestimonial,
  getAllVideoTestimonials,
};
