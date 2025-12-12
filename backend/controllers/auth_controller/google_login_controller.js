import User from "../../models/user_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const GoogleLogin = async (req, res) => {
  try {
    const { name, email, avatar, googleId } = req.body;
    let user;
    user = await User.findOne({ email });
    if (!user) {
      const password = Math.random().toString();
      const hashedPassword = bcrypt.hashSync(password);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
        googleId,
      });

      user = await newUser.save();
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;
    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login successful.",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
