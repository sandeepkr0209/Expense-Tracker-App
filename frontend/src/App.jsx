// import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { useContext, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import History from "./components/History";
import ViewTransaction from "./pages/ViewTransactions";
import IncomeTransaction from "./pages/IncomeTransactions";
import ExpenseTransaction from "./pages/ExpenseTransaction";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Expense from "./pages/Expense";
import Income from "./pages/Income";
// import Chart from "./components/Chart";

const App = () => {
  const location = useLocation();
  const { token, fetchIncome, fetchExpense } = useContext(AppContext); // context now properly consumed

  // Pages where full layout (Sidebar + History + Dashboard) is hidden
  const hideMainLayout = [
    "/view-transaction",
    "/add-income",
    "/add-expense",
    "/income-transaction",
    "/expense-transaction",
    "/login",
    "/register",
  ].includes(location.pathname);

  useEffect(() => {
    if (token) {
      fetchIncome();
      fetchExpense();
    }
  }, [token, location.pathname]);

  return (
    <div className="flex w-full overflow-auto h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard layout */}
      {!hideMainLayout ? (
        <>
          <div className="flex flex-col w-3/4 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>

          <div className="hidden lg:flex flex-col w-1/4 border-l overflow-auto">
            <History />
          </div>
        </>
      ) : (
        <div className="flex-1 w-full overflow-auto">
          <Routes>
            <Route path="/view-transaction" element={<ViewTransaction />} />
            <Route path="/add-income" element={<Income />} />
            <Route path="/add-expense" element={<Expense />} />
            <Route path="/income-transaction" element={<IncomeTransaction />} />
            <Route
              path="/expense-transaction"
              element={<ExpenseTransaction />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
