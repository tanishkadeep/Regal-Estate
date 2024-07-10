import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { z } from "zod";
import jwt from "jsonwebtoken";

const signupSchema = z.object({
  username: z.string(),
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(8, "Your password needs to be at least 8 characters long."),
});

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const response = signupSchema.safeParse(body);

  if (!response.success) {
    const errorMessages = response.error.errors.map((err) => ({
      path: err.path,
      message: err.message,
    }));

    return res.status(411).json({
      success: false,
      statusCode: 411,
      message: errorMessages[0].message,
    });
  }

  const { username, email, password } = body;

  const existingUserEmail = await User.findOne({
    email,
  });

  if (existingUserEmail) {
    res.status(411).json({
      success: false,
      statusCode: 411,
      message: "Email already taken",
    });
  }

  const existingUsername = await User.findOne({
    username,
  });

  if (existingUsername) {
    res.status(411).json({
      success: false,
      statusCode: 411,
      message: "Username already taken",
    });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const userId = newUser._id;

    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET_KEY || "secretKey"
    );

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      id: newUser._id,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
    });

    if (!user) {
      res.status(411).json({
        success: false,
        statusCode: 404,
        message: "User not found!",
      });
    } else {
      const validPassword = bcryptjs.compareSync(password, user.password);
      if (!validPassword) {
        res.status(411).json({
          success: false,
          statusCode: 401,
          message: "Wrong credentials!",
        });
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY || "secretKey"
      );

      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        id: user._id,
      });
    }
  } catch (error) {
    next(error);
  }
};

const google = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET_KEY || "secretKey"
      );

      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        id: user._id,
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET_KEY || "secretKey"
      );

      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        id: newUser._id,
      });
    }
  } catch (error) {
    next(error);
  }
};

export { signup, signin, google };
