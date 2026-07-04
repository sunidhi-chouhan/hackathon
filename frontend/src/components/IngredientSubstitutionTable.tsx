interface SubstitutionItem {
  ingredient: string;
  alternative: string;
  reason: string;
}

interface IngredientSubstitutionTableProps {
  substitutions: SubstitutionItem[];
}

export default function IngredientSubstitutionTable({ substitutions }: IngredientSubstitutionTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
        <h3 className="text-lg font-semibold text-slate-900">Ingredient substitutions</h3>
        <p className="mt-1 text-sm text-slate-600">Swap ingredients with smart alternatives for your preferred meals.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-600">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Ingredient</th>
              <th className="px-6 py-4 font-semibold">Suggested Alternative</th>
              <th className="px-6 py-4 font-semibold">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {substitutions.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{item.ingredient}</td>
                <td className="px-6 py-4">{item.alternative}</td>
                <td className="px-6 py-4">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
