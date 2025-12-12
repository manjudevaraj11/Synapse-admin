import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import RolesPage from "@/pages/roles/RolesPage";
import AuthGate from "@/components/auth/AuthGate";
import PermissionsPage from "@/pages/Permissions/PermissionsPage";

const AppRouter = () => {
  return (
    <Routes>
      {/* PUBLIC LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* DASHBOARD PAGE */}
      <Route
        path="/"
        element={
          <AuthGate>
            <Layout>
              <Dashboard />
            </Layout>
          </AuthGate>
        }
      />
      <Route
        path="/roles"
        element={
          <AuthGate>
            <Layout>
              <RolesPage />
            </Layout>
          </AuthGate>
        }
      />
      <Route
        path="/permissions"
        element={
          <AuthGate>
            <Layout>
              <PermissionsPage />
            </Layout>
          </AuthGate>
        }
      />
    </Routes>
  );
};

export default AppRouter;
