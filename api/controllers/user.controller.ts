import { Request, Response } from "express";

const user = (req: Request, res: Response) => {
  res.send("user route");
};

export default user