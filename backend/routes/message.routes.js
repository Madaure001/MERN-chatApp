import express from "express"
import  {sendMessage}  from "../controllers/sendMessage.controller.js";
import { getMessages } from "../controllers/getMessages.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;