import { Request, Response } from "express";

const assessBudget = (_req: Request, res: Response) => {
  res.json({ message: "Budget feasibility endpoint placeholder." });
};

export default { assessBudget };
