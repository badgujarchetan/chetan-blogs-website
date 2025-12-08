import User from "../../models/user_model.js";
import bcrypt from "bcryptjs";
export default async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;
    const extistinguser = await User.findOne({ email });
    if (extistinguser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      sucess: "true",
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      sucess: "false",
      message: "Error registering user",
      error: error.message,
    });
  }
}
