import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
// import ManagerDashboard from "./Pages/Dashboard/ManagerDashboard";
// import UserDashboard from "./Pages/Dashboard/UserDashboard";
import Leads from "./Pages/Leads/Leads";
import FollowUp from "./Pages/FollowUp/FollowUp";
import Pipeline from "./Pages/Pipline/Pipline";
import Reports from "./Pages/Reports/Reports";
import Setting from "./Pages/User/Setting";

// ✅ UPDATED ProtectedRoute (multi-role support)
function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ✅ DEFAULT REDIRECT
function RoleRedirect() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <LoginPage />;

  return <Navigate to={`/${role}-dashboard`} replace />;
}

function App() {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<RoleRedirect />} />

      {/* DASHBOARDS */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager-dashboard"
        element={
          <ProtectedRoute allowedRoles={["manager"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ LEADS (FIXED ISSUE HERE) */}
      <Route
        path="/leads"
        element={
          <ProtectedRoute allowedRoles={["admin", "manager"]}>
            <Leads />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pipline"
        element={
          <ProtectedRoute allowedRoles={["admin", "manager"]}>
            <Pipeline />
          </ProtectedRoute>
        }
      />

      <Route
        path="/followup"
        element={
          <ProtectedRoute allowedRoles={["admin", "manager"]}>
            <FollowUp />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["admin", "manager"]}>
            <Reports />
          </ProtectedRoute>
        }
      />

<Route
        path="/setting"
        element={
          <ProtectedRoute allowedRoles={["admin", "manager"]}>
            <Setting/>
          </ProtectedRoute>
        }
      />
      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
