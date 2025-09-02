import express from "express";
import {
  getMessages,
  create,
  update,
  deleteMessage,
} from "../controllers/messageController.js";
const messageRouter = express.Router();

messageRouter.get("/chat/:id", getMessages);
messageRouter.post("/messages/:id/send", create);
messageRouter.put("/messages/:id", update);
messageRouter.delete("/messages/:id/delete", deleteMessage);

export default messageRouter;
