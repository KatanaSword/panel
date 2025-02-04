import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { imageUpload, videoUpload } from "../middlewares/multer.middleware";
import {
  createVideoTestimonial,
  getAllVideoTestimonials,
  getVideoTestimonialById,
  updateVideoTestimonial,
  updateVideoTestimonialAvatar,
  updateVideoTestimonialVideo,
  getVideoTestimonialByCampanyRole,
  deleteVideoTestimonial,
} from "../controllers/videoTestimonial.controller";

const router = Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllVideoTestimonials)
  .post(
    imageUpload.single("avatar"),
    videoUpload.single("video"),
    createVideoTestimonial
  );
router
  .route("/update_avatar/:videoTestimonialId")
  .patch(imageUpload.single("avatar"), updateVideoTestimonialAvatar);
router
  .route("/:videoTestimonialId")
  .get(getVideoTestimonialById)
  .patch(updateVideoTestimonial)
  .delete(deleteVideoTestimonial);
router
  .route("/update_video/:videoTestimonialId")
  .patch(updateVideoTestimonialVideo);
router
  .route("/company_role/:companyRoleId")
  .get(getVideoTestimonialByCampanyRole);

export default router;
