import cloudinary from "../libs/cloudinary.js";
import Message from "../models/Message.js";

export async function getMessages(req, res) {
  try {
    const { id: chatUserId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: chatUserId, receiverId: myId },
        { senderId: myId, receiverId: chatUserId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getting messages" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function create(req, res) {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageUrl = response.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      image: imageUrl,
    });

    // real time add later
    res.status(201).json({ message: "new message created" });
  } catch (error) {
    console.log("error in create message" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function update(req, res) {
  try {
  } catch (error) {
    console.log("error in updating message" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteMessage(req, res) {
  try {
  } catch (error) {
    console.log("error in deleteing message" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
