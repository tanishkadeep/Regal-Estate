import express from "express";
import updateUser from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post('/update/:id',verifyToken, updateUser)

export default router;
