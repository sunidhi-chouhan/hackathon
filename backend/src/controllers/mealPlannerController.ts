import { Request, Response } from "express";

const createMealPlan = (_req: Request, res: Response) => {
  res.json({ message: "Meal planner endpoint placeholder." });
};

export default { createMealPlan };
