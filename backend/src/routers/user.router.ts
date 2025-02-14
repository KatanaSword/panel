import { Router } from "express";
import {
  accountDetailUpdate,
  assignRole,
  changePassword,
  forgotPassword,
  getCurrentUser,
  refreshAccessToken,
  resetPassword,
  sendVerifyEmailRequest,
  signInUser,
  signOutUser,
  userRegister,
} from "../controllers/user.controller.ts";
import { verifyJWT, verifyPermission } from "../middlewares/auth.middleware.ts";

const router = Router();

// Unsecure routes
router.route("/signup").post(userRegister);
router.route("/signin").post(signInUser);
router.route("/refresh_token").post(refreshAccessToken);
router.route("/forgot_password").post(forgotPassword);
router.route("/reset_password/:resetToken").post(resetPassword);

// Secure routes
router.route("/signout").post(verifyJWT, signOutUser);
router.route("/current_user").get(verifyJWT, getCurrentUser);
router.route("/account_update").patch(verifyJWT, accountDetailUpdate);
router.route("/change_password").patch(verifyJWT, changePassword);
router
  .route("/assign_role/:userId")
  .patch(verifyJWT, verifyPermission(["ADMIN"]), assignRole);
router
  .route("/send_email_verification")
  .post(verifyJWT, sendVerifyEmailRequest);

export default router;
