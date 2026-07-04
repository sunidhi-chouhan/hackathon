import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MealPlannerPage from "./pages/MealPlannerPage";
import GroceryListPage from "./pages/GroceryListPage";
import SubstitutionsPage from "./pages/SubstitutionsPage";
import BudgetPage from "./pages/BudgetPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal-planner" element={<MealPlannerPage />} />
        <Route path="/grocery-list" element={<GroceryListPage />} />
        <Route path="/substitutions" element={<SubstitutionsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
