import Message from "../models/Message.js";

export async function index(req, res) {
  try {
  } catch (error) {
    console.log("error in getting messages" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function create(req, res) {
  try {
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
