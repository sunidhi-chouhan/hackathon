import BudgetAnalysisCard from "../components/BudgetAnalysisCard";
import IngredientSubstitutionTable from "../components/IngredientSubstitutionTable";

const substitutionData = [
  {
    ingredient: "Butter",
    alternative: "Olive oil",
    reason: "Lower saturated fat and works well for sautéing.",
  },
  {
    ingredient: "Milk",
    alternative: "Almond milk",
    reason: "Dairy-free option with a mild flavor.",
  },
  {
    ingredient: "Chicken",
    alternative: "Tofu",
    reason: "Great plant-based protein substitute for stir-fries.",
  },
  {
    ingredient: "Heavy cream",
    alternative: "Greek yogurt",
    reason: "Adds creaminess with lower calories.",
  },
  {
    ingredient: "White rice",
    alternative: "Quinoa",
    reason: "Higher protein content and nutty texture.",
  },
];

const userBudget = 50;
const estimatedCost = 42.5;

export default function SubstitutionsPage() {
  const withinBudget = estimatedCost <= userBudget;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Ingredient Substitutions</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Smart swaps for your kitchen</h1>
          </div>
          <p className="max-w-2xl text-sm text-slate-600">
            Keep your meals flexible with better substitutes, and see how your budget holds up.
          </p>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.85fr]">
        <IngredientSubstitutionTable substitutions={substitutionData} />

        <div className="space-y-6">
          <BudgetAnalysisCard userBudget={userBudget} estimatedCost={estimatedCost} withinBudget={withinBudget} />

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
            <h2 className="text-xl font-semibold text-slate-900">Helpful notes</h2>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li className="rounded-3xl bg-slate-50 px-4 py-3">Use dairy alternatives for lower calories and easier digestion.</li>
              <li className="rounded-3xl bg-slate-50 px-4 py-3">Swap proteins to fit vegetarian or budget-friendly plans.</li>
              <li className="rounded-3xl bg-slate-50 px-4 py-3">Balance substitutes to maintain flavor and texture.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
