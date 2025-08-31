import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../libs/utils/generateToken.js";

export async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const isUserExist = await User.findOne({ email });

    if (isUserExist)
      return res.status(400).json({ message: "Email already exists" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be 6 or more character" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (user) {
      generateToken(user._id, res);
      res.status(201).json({ user });
    } else {
      res.status(500).json({ message: "Error in register" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fail" + error.message });
  }
}
