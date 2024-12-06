import { Router } from "express";
import {
  accountDetailUpdate,
  getCurrentUser,
  refreshAccessToken,
  signInUser,
  signOutUser,
  userRegister,
} from "../controllers/user.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router = Router();

// Unsecure routes
router.route("/register").post(userRegister);
router.route("/signin").post(signInUser);
router.route("/refresh_token").post(refreshAccessToken);

// Secure routes
router.route("/signout").post(verifyJWT, signOutUser);
router.route("/current_user").get(verifyJWT, getCurrentUser);
router.route("/account_update").patch(verifyJWT, accountDetailUpdate);

export default router;
