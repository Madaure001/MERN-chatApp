import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
import {signup} from "../controllers/signup.auth.controller.js"


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;