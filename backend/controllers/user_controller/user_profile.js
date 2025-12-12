import User from "../../models/user_model.js";
export default async function getUserProfile(req, res) {
  try {
    const { userId } = req.params;
    const userProfile = await User.findById(userId).lean().exec();
    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: userProfile, success: true });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
