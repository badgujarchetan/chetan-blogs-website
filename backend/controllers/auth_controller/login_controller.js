import User from "../../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const userFind = await User.findOne({ email });
    if (!userFind) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userFind.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: userFind._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({ message: "Login successful", email, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
