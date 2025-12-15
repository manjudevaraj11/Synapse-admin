import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import RolesPage from "@/pages/roles/RolesPage";
import AuthGate from "@/components/auth/AuthGate";
import PermissionsPage from "@/pages/Permissions/PermissionsPage";
import EditRolePage from "@/pages/roles/EditRolePage";
import CreateRolePage from "@/pages/roles/CreateRolePage";
import EditPermissionPage from "@/pages/Permissions/EditPermissionPage";
import CreatePermissionPage from "@/pages/Permissions/CreatePermissionPage";
import FrameworksListPage from "@/pages/frameworks/FrameworksListPage";
import CreateFrameworkPage from "@/pages/frameworks/CreateFrameworkPage";
import EditFrameworkPage from "@/pages/frameworks/EditFrameworkPage";

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
        path="/roles/create"
        element={
          <AuthGate>
            <Layout>
              <CreateRolePage />
            </Layout>
          </AuthGate>
        }
      />
      <Route
        path="/roles/:id/edit"
        element={
          <AuthGate>
            <Layout>
              <EditRolePage />
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
      <Route
        path="/permissions/create"
        element={
          <AuthGate>
            <Layout>
              <CreatePermissionPage />
            </Layout>
          </AuthGate>
        }
      />
      <Route
        path="/permissions/:id/edit"
        element={
          <AuthGate>
            <Layout>
              <EditPermissionPage />
            </Layout>
          </AuthGate>
        }
      />
      <Route
        path="/frameworks"
        element={
          <AuthGate>
            <Layout>
              <FrameworksListPage />
            </Layout>
          </AuthGate>
        }
      />
      <Route
        path="/frameworks/create"
        element={
          <AuthGate>
            <Layout>
              <CreateFrameworkPage />
            </Layout>
          </AuthGate>
        }
      />
      <Route
        path="/frameworks/:id/edit"
        element={
          <AuthGate>
            <Layout>
              <EditFrameworkPage />
            </Layout>
          </AuthGate>
        }
      />
    </Routes>
  );
};

export default AppRouter;
