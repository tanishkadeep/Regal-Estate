import express from "express";
import { createListing } from "../controllers/listing.controller";
import { verifyToken } from "../utils/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, createListing);

export default router;
