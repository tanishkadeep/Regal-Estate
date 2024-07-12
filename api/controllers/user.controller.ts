import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/user.model";
import { errorHandler } from "../utils/error";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    res.status(200).json({
      username: updatedUser?.username,
      email: updatedUser?.email,
      password: updatedUser?.password,
      avatar: updatedUser?.avatar,
      id: updatedUser?._id,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    console.log("Attempting to delete user with id:", req.params.id);

    const user = await User.findById(req.params.id);

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    await User.findByIdAndDelete(req.params.id);

    res.clearCookie("access_token", { httpOnly: true });

    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser };
