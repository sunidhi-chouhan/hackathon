import { useMemo, useState } from "react";

type GroceryCategory = "Vegetables" | "Dairy" | "Spices" | "Grains";

interface GroceryItem {
  id: string;
  label: string;
  category: GroceryCategory;
  purchased: boolean;
}

const initialItems: GroceryItem[] = [
  { id: "carrots", label: "Carrots", category: "Vegetables", purchased: false },
  { id: "spinach", label: "Spinach", category: "Vegetables", purchased: false },
  { id: "bell-pepper", label: "Bell pepper", category: "Vegetables", purchased: false },
  { id: "milk", label: "Milk", category: "Dairy", purchased: false },
  { id: "cheese", label: "Cheese", category: "Dairy", purchased: false },
  { id: "yogurt", label: "Yogurt", category: "Dairy", purchased: false },
  { id: "salt", label: "Salt", category: "Spices", purchased: false },
  { id: "pepper", label: "Black pepper", category: "Spices", purchased: false },
  { id: "cumin", label: "Ground cumin", category: "Spices", purchased: false },
  { id: "rice", label: "Rice", category: "Grains", purchased: false },
  { id: "pasta", label: "Pasta", category: "Grains", purchased: false },
  { id: "quinoa", label: "Quinoa", category: "Grains", purchased: false },
];

const categories: GroceryCategory[] = ["Vegetables", "Dairy", "Spices", "Grains"];

export default function GroceryList() {
  const [items, setItems] = useState<GroceryItem[]>(initialItems);

  const groupedItems = useMemo<Record<GroceryCategory, GroceryItem[]>>(() => {
    return categories.reduce<Record<GroceryCategory, GroceryItem[]>>((groups, category) => {
      groups[category] = items.filter((item: GroceryItem) => item.category === category);
      return groups;
    }, {
      Vegetables: [],
      Dairy: [],
      Spices: [],
      Grains: [],
    });
  }, [items]);

  const togglePurchased = (id: string) => {
    setItems((current: GroceryItem[]) =>
      current.map((item: GroceryItem) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Grocery list</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Shopping checklist</h2>
          </div>
          <div className="rounded-3xl bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
            Tap to mark purchased
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          {categories.map((category) => (
            <section key={category} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{category}</h3>
              <div className="mt-4 space-y-3">
                {groupedItems[category].map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4 transition hover:border-slate-300"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.purchased}
                        onChange={() => togglePurchased(item.id)}
                        className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                      />
                      <span className={item.purchased ? "text-slate-400 line-through" : "text-slate-900"}>
                        {item.label}
                      </span>
                    </div>
                    <span className={item.purchased ? "text-slate-400" : "text-slate-500"}>
                      {item.purchased ? "Purchased" : "Pending"}
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
