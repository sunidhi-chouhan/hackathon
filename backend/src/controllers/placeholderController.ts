import { Request, Response } from "express";

const getPlaceholder = (_req: Request, res: Response) => {
  res.json({ message: "This route is reserved for future AI cooking endpoints." });
};

export default { getPlaceholder };
