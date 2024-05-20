import express from "express"
import  {sendMessage}  from "../controllers/sendMessage.controller.js";
import { getMessages, getSideBarMessages } from "../controllers/getMessages.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.get("/sidebar/:id", protectRoute, getSideBarMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;