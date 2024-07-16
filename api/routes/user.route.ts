import express from "express";
import { updateUser, deleteUser, getUserListings, getUser } from "../controllers/user.controller";
import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;
