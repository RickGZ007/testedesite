// ─────────────────────────────────────────────────────────────────────────────
// ProtectedRoute.jsx  –  Guarda as rotas admin.
// Se não autenticado, redireciona para /admin/login.
// ─────────────────────────────────────────────────────────────────────────────
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}
