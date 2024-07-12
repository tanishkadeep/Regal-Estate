import express from "express";
import {
  signup,
  signin,
  google,
  signOut,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post("/google", google);

export default router;
