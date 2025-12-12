import express from "express";
import getUserProfile from "../controllers/user_controller/user_profile.js";
import updateUserProfile from "../controllers/user_controller/user_profile_update.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/userprofile/:userId", getUserProfile);
router.put(
  "/updateUserProfile/:userId",
  upload.single("profileImage"),
  updateUserProfile
);
export default router;
