import { Request, Response } from "express";

const getSubstitutions = (_req: Request, res: Response) => {
  res.json({ message: "Ingredient substitutions endpoint placeholder." });
};

export default { getSubstitutions };
