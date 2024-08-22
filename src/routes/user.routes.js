import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUser,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secure route
router.route("/logout").post(verifyJWT, logoutUser); // fine
router.route("/refreshToken").post(refreshAccessToken); // fine
router.route("/changePassword").post(verifyJWT, changeCurrentPassword); // fine
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser); // fine
router.route("/updateUser").patch(verifyJWT, updateUser); // fine
router
  .route("/updateAvatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar); // fine

router
  .route("/updateCoverImage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage); // fine

router.route("/c/:username").get(verifyJWT, getUserChannelProfile); // fine
router.route("/watchHistory").get(verifyJWT, getWatchHistory); // fine

export default router;
