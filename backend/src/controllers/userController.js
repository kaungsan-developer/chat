import User from "../models/User.js";

export async function getUserListForSidebar(req, res) {
  try {
    const userId = req.user._id;
    const userList = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    res.status(200).json(userList);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
