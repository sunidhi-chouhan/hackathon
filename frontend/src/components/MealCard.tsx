interface MealCardProps {
  title: string;
  description: string;
  cookingTime: string;
  calories: number;
  ingredients: string[];
}

export default function MealCard({ title, description, cookingTime, calories, ingredients }: MealCardProps) {
  return (
    <article className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{title}</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">{title} inspiration</h3>
        </div>
        <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
          {cookingTime}
        </div>
      </div>

      <p className="mt-5 text-slate-600">{description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span className="rounded-2xl bg-slate-100 px-3 py-2">Estimated {calories} kcal</span>
        <span className="rounded-2xl bg-slate-100 px-3 py-2">Ingredients</span>
      </div>

      <div className="mt-6 grid gap-3">
        {ingredients.map((ingredient, index) => (
          <span key={index} className="rounded-3xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
            {ingredient}
          </span>
        ))}
      </div>
    </article>
  );
}
