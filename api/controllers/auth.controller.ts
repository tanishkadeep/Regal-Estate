import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { z } from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const response = signupSchema.safeParse(body);

  if (!response.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const { username, email, password } = body;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser)
    res.status(411).json({
      message: "Email already taken",
    });

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const userId = newUser._id;

    const SECRET_KEY = process.env.JWT_SECRET_KEY || "secretKey";
    const token = jwt.sign({ userId }, SECRET_KEY);

    res.json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default signup;
