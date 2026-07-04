import { Request, Response } from "express";

const createGroceryList = (_req: Request, res: Response) => {
  res.json({ message: "Grocery list endpoint placeholder." });
};

export default { createGroceryList };
