import { FormEvent, useMemo, useState } from "react";
import MealCard from "../components/MealCard";
import { generatePlan, GeneratePlanResponse } from "../services/api";

export default function HomePage() {
  const [budget, setBudget] = useState("$50");
  const [people, setPeople] = useState(2);
  const [cookingTime, setCookingTime] = useState("30 minutes");
  const [diet, setDiet] = useState("Balanced");
  const [cuisine, setCuisine] = useState("Global Fusion");
  const [ingredients, setIngredients] = useState("Tomatoes, pasta, chicken, spinach");
  const [notes, setNotes] = useState("Any allergies or preferences?");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<GeneratePlanResponse | null>(null);

  const ingredientGroups = useMemo(() => {
    const items = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const firstCut = Math.ceil(items.length / 3);
    const secondCut = Math.ceil((items.length * 2) / 3);

    return {
      breakfast: items.slice(0, firstCut),
      lunch: items.slice(firstCut, secondCut),
      dinner: items.slice(secondCut),
    };
  }, [ingredients]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setPlan(null);
    setLoading(true);

    try {
      const response = await generatePlan({
        budget,
        people,
        cookingTime,
        diet,
        cuisine,
        ingredients,
        notes,
      });
      setPlan(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while generating your plan.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-2xl shadow-slate-900/20 sm:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-300">AI Cooking Planner</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Beautiful meal results, ready to cook.</h1>
              <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
                Fill in your preferences and view breakfast, lunch, and dinner cards designed for easy cooking.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-900/10 sm:max-w-md">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Result view</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/70 p-4 text-sm">
                  <p className="text-slate-400">Meal cards</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Breakfast, Lunch, Dinner</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-4 text-sm">
                  <p className="text-slate-400">Action</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Generate plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Meal plan input</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Create your cooking session</h2>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Powered by Gemini
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Budget</span>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-inner">
                  <input
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    type="text"
                    placeholder="$50"
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">People Count</span>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-inner">
                  <input
                    value={people}
                    onChange={(event) => setPeople(Number(event.target.value))}
                    type="number"
                    min="1"
                    placeholder="2"
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Cooking Time</span>
                <select
                  value={cookingTime}
                  onChange={(event) => setCookingTime(event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                >
                  <option>30 minutes</option>
                  <option>45 minutes</option>
                  <option>60 minutes</option>
                  <option>90 minutes</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="block text-sm font-medium text-slate-700">Diet Preference</span>
                <select
                  value={diet}
                  onChange={(event) => setDiet(event.target.value)}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                >
                  <option>Balanced</option>
                  <option>Vegetarian</option>
                  <option>Vegan</option>
                  <option>Low-Carb</option>
                  <option>High-Protein</option>
                </select>
              </label>
            </div>

            <label className="space-y-2">
              <span className="block text-sm font-medium text-slate-700">Cuisine Preference</span>
              <select
                value={cuisine}
                onChange={(event) => setCuisine(event.target.value)}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
              >
                <option>Global Fusion</option>
                <option>Italian</option>
                <option>Mexican</option>
                <option>Asian</option>
                <option>Mediterranean</option>
              </select>
            </label>

            <label className="space-y-2">
              <span className="block text-sm font-medium text-slate-700">Available Ingredients</span>
              <textarea
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
                rows={4}
                placeholder="Tomatoes, pasta, chicken, spinach"
                className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>

            <label className="space-y-2">
              <span className="block text-sm font-medium text-slate-700">Additional Notes</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Any allergies or preferences?"
                className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none placeholder:text-slate-400"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-[1.75rem] bg-slate-900 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating plan...
                </span>
              ) : (
                "Generate Plan"
              )}
            </button>
          </form>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">AI plan summary</p>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">Plan status</h3>
            <p className="mt-3 text-slate-600">The cards below will populate once your meal plan is generated.</p>
            <div className="mt-8 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Estimated cost</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{plan ? `$${plan.estimatedCost.toFixed(2)}` : "--"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Budget health</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {plan ? (plan.withinBudget ? "Within budget" : "Over budget") : "Awaiting plan"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">What you get</p>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li className="rounded-3xl border border-slate-100 bg-slate-50 p-4">Beautiful cards with meal details and ingredients.</li>
              <li className="rounded-3xl border border-slate-100 bg-slate-50 p-4">Clear cost and budget feedback.</li>
              <li className="rounded-3xl border border-slate-100 bg-slate-50 p-4">Easy-to-read cooking plans for each meal.</li>
            </ul>
          </div>
        </aside>
      </main>

      {plan ? (
        <section className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Generated results</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">Your meal cards</h2>
              </div>
              <p className="text-sm text-slate-600">Meal cards include name, description, timing, calories, and ingredient highlights.</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <MealCard
              title="Breakfast"
              description={plan.breakfast}
              cookingTime={cookingTime}
              calories={420}
              ingredients={ingredientGroups.breakfast.length ? ingredientGroups.breakfast : ["Eggs", "Spinach", "Tomatoes"]}
            />
            <MealCard
              title="Lunch"
              description={plan.lunch}
              cookingTime={cookingTime}
              calories={560}
              ingredients={ingredientGroups.lunch.length ? ingredientGroups.lunch : ["Grains", "Vegetables", "Chicken"]}
            />
            <MealCard
              title="Dinner"
              description={plan.dinner}
              cookingTime={cookingTime}
              calories={680}
              ingredients={ingredientGroups.dinner.length ? ingredientGroups.dinner : ["Pasta", "Sauce", "Greens"]}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
