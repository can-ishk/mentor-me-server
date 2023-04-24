import * as express from "express";
const router = express.Router();
import * as chatControllers from "../controllers/chatControllers.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/", verifyToken, chatControllers.getConversations);
router.post("/:id", verifyToken, chatControllers.sendMessage);
router.get("/:id", verifyToken, chatControllers.getMessages);

export default router