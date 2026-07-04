import { Request, Response } from "express";

const getHealth = (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "AI Cooking Planner backend" });
};

export default { getHealth };
