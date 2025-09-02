import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../libs/generateToken.js";
import cloudinary from "../libs/cloudinary.js";

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

    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.log("error in register" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be 6 or more character" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email does not exists" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.log("error in login controller" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    console.log("error in logout" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function checkAuth(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateProfilePic(req, res) {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile Picture Required" });
    }
    const uploadedRes = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadedRes.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in updateProfilePic" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
