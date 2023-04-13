import express from "express";
const router = express.Router();
import * as userControllers from "../controllers/userControllers.js";
// const { check } = require("express-validator");
import { verifyToken } from "../middleware/auth.js";

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get("/random", userControllers.getRandomUsers);

router.get("/:username", userControllers.getUser);
router.patch("/:id", verifyToken, userControllers.updateUser);

export default router;