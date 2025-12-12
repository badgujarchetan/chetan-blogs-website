import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import User from "../../models/user_model.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });
export default async function updateUserProfile(req, res) {
  try {
    let data = req.body;
    // console.log("Request Body:", req.file,);
    const { userId } = req.params;

    const userFind = await User.findById(userId);
    if (!userFind) {
      return res.status(404).json({ message: "User not found" });
    }

    if (data.name) data.name = data.name.trim();
    if (data.email) data.email = data.email.trim().toLowerCase();
    if (data.bio) data.bio = data.bio.trim();

    if (data.password && data.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    } else {
      delete data.password;
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
        public_id: `user_${userId}`,
        resource_type: "auto",
        overwrite: true,
      });

      data.avatar = uploadResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
