import User from "../models/user_model";

export const getuserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }).lean().exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
