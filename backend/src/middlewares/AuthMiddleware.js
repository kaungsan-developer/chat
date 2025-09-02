import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function AuthMiddleware(req, res, next) {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "UnAuthenticated" });
    }

    const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isTokenValid) {
      return res.status(401).json({ message: "UnAuthenticated" });
    }
    const user = await User.findById(isTokenValid.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("error in AuthMiddleware" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
