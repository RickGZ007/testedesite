// ─────────────────────────────────────────────────────────────────────────────
// src/services/api.js
// Em dev:        VITE_API_URL vazio → usa proxy do vite.config.js (localhost:8080)
// Em produção:   VITE_API_URL = https://seu-backend.railway.app
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || "";

// ── Utilitário base ───────────────────────────────────────────────────────────
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || `Erro ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── Projetos ──────────────────────────────────────────────────────────────────
export const projetosApi = {
  listar:    ()          => apiFetch("/api/projetos"),
  criar:     (dados)     => apiFetch("/api/projetos", { method: "POST", body: JSON.stringify(dados) }),
  atualizar: (id, dados) => apiFetch(`/api/projetos/${id}`, { method: "PUT", body: JSON.stringify(dados) }),
  excluir:   (id)        => apiFetch(`/api/projetos/${id}`, { method: "DELETE" }),
};

// ── Cores ─────────────────────────────────────────────────────────────────────
export const coresApi = {
  listar: ()   => apiFetch("/api/cores"),
  toggle: (id) => apiFetch(`/api/cores/${id}/toggle`, { method: "PUT" }),
};

// ── Upload de imagem ──────────────────────────────────────────────────────────
// Retorna { url: "https://res.cloudinary.com/..." }
// Lança erro descritivo se o back-end não estiver configurado com Cloudinary
export async function uploadImagem(file) {
  const formData = new FormData();
  formData.append("file", file);

  let res;
  try {
    res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Não foi possível conectar ao servidor. Verifique se o back-end está rodando."
    );
  }

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    if (res.status === 500 && msg.toLowerCase().includes("cloudinary")) {
      throw new Error(
        "Cloudinary não configurado. Preencha as credenciais no application.properties ou nas variáveis do Railway."
      );
    }
    throw new Error(msg || `Erro ${res.status} ao fazer upload.`);
  }

  return res.json();
}
