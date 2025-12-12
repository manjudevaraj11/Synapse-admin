import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD PAGE */}
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
