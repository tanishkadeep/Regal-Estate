import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./error";

interface UserPayload {
    id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(402, "Unauthorized"));

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || "secretKey",
    (err: VerifyErrors | null, decoded: object | string | undefined) => {

      if (err) return next(errorHandler(403, "Forbidden"));

      req.user = decoded as UserPayload;
      next();
    }
  );
};
