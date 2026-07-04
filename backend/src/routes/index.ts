import { Router } from "express";
import healthController from "../controllers/healthController";
import placeholderController from "../controllers/placeholderController";
import mealPlannerController from "../controllers/mealPlannerController";
import groceryController from "../controllers/groceryController";
import substitutionController from "../controllers/substitutionController";
import budgetController from "../controllers/budgetController";
import planController from "../controllers/planController";

const router = Router();

router.get("/health", healthController.getHealth);
router.get("/placeholder", placeholderController.getPlaceholder);
router.post("/generate-plan", planController.generatePlan);
router.post("/meal-plan", mealPlannerController.createMealPlan);
router.post("/grocery-list", groceryController.createGroceryList);
router.post("/substitutions", substitutionController.getSubstitutions);
router.post("/budget-feasibility", budgetController.assessBudget);

export default router;
