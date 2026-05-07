// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  –  Configuração de rotas com React Router v6
//
// Rotas públicas:   /              → LandingPage
// Rotas protegidas: /admin         → AdminDashboard (requer autenticação)
//                  /admin/login    → LoginPage
// ─────────────────────────────────────────────────────────────────────────────
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage     from "./pages/LandingPage";
import LoginPage       from "./pages/LoginPage";
import AdminDashboard  from "./pages/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Pública ─────────────────────────────────────────────────── */}
        <Route path="/" element={<LandingPage />} />

        {/* ── Admin ───────────────────────────────────────────────────── */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Fallback ─────────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
