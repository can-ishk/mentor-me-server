import * as express from "express";
const router = express.Router();
import * as mentControllers from "../controllers/mentControllers.js";
import { verifyToken, optionallyVerifyToken } from "../middleware/auth.js";

//Discuss: Make login compulsory to even view posts or not?

router.get("/", optionallyVerifyToken, mentControllers.getMents);
router.post("/", verifyToken, mentControllers.createMent);

router.get("/:id", optionallyVerifyToken, mentControllers.getMent);
router.patch("/:id", verifyToken, mentControllers.updateMent);
router.delete("/:id", verifyToken, mentControllers.deleteMent);

export default router;