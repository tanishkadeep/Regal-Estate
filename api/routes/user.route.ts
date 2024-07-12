import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
