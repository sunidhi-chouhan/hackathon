import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Meal Planner", path: "/meal-planner" },
  { label: "Grocery List", path: "/grocery-list" },
  { label: "Substitutions", path: "/substitutions" },
  { label: "Budget", path: "/budget" },
];

export default function Navigation() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="text-lg font-semibold text-slate-900">AI Cooking Planner</div>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
