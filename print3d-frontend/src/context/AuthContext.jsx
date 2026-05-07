// ─────────────────────────────────────────────────────────────────────────────
// AuthContext.jsx  –  Gerencia o estado de autenticação global
// Em produção: troque o mock por uma chamada POST /api/auth/login
//              e armazene o JWT no httpOnly cookie ou localStorage.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Hook de conveniência — use dentro de qualquer componente
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Mock de login — substitua por: fetch('/api/auth/login', { method:'POST', body:... })
  const login = async (email, password) => {
    if (email === "admin@print3d.com" && password === "admin123") {
      setIsAuthenticated(true);
      setUser({ name: "Administrador", email });
      return { success: true };
    }
    return { success: false, message: "Credenciais inválidas." };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
