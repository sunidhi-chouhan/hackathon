interface BudgetAnalysisCardProps {
  userBudget: number;
  estimatedCost: number;
  withinBudget: boolean;
}

export default function BudgetAnalysisCard({ userBudget, estimatedCost, withinBudget }: BudgetAnalysisCardProps) {
  const remainingBudget = Math.max(userBudget - estimatedCost, 0);
  const progress = userBudget > 0 ? Math.min((estimatedCost / userBudget) * 100, 100) : 0;

  return (
    <div className={`rounded-[2rem] border p-6 shadow-lg ${withinBudget ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-rose-200 bg-rose-50 text-rose-900"}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-current/70">Budget analysis</p>
          <h3 className="mt-2 text-2xl font-semibold">{withinBudget ? "On budget" : "Budget warning"}</h3>
        </div>
        <div className={`rounded-full px-4 py-2 text-sm font-semibold ${withinBudget ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
          {withinBudget ? "Within budget" : "Over budget"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-white/80 p-4 shadow-sm">
          <p className="text-sm text-slate-500">User Budget</p>
          <p className="mt-2 text-xl font-semibold">${userBudget.toFixed(2)}</p>
        </div>
        <div className="rounded-3xl bg-white/80 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Estimated Cost</p>
          <p className="mt-2 text-xl font-semibold">${estimatedCost.toFixed(2)}</p>
        </div>
        <div className="rounded-3xl bg-white/80 p-4 shadow-sm">
          <p className="text-sm text-slate-500">Remaining</p>
          <p className="mt-2 text-xl font-semibold">${remainingBudget.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm font-medium text-current/80">
          <span>Cost vs budget</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/60 shadow-inner">
          <div className="h-full rounded-full bg-current transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
