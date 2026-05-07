/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["Barlow", "sans-serif"],
        display: ["Barlow Condensed", "Barlow", "sans-serif"],
      },
      colors: {
        // ── Acento (botões, ícones, destaques) ──────────────────────────
        accent:        "var(--color-accent)",
        "accent-hover":"var(--color-accent-hover)",
        "accent-muted":"var(--color-accent-muted)",

        // ── Fundos ───────────────────────────────────────────────────────
        page:      "var(--color-bg-page)",
        surface:   "var(--color-bg-surface)",
        surface2:  "var(--color-bg-surface-2)",

        // ── Bordas ───────────────────────────────────────────────────────
        border:        "var(--color-border)",
        "border-strong":"var(--color-border-strong)",

        // ── Textos ───────────────────────────────────────────────────────
        primary:   "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        muted:     "var(--color-text-muted)",

        // ── Estados ──────────────────────────────────────────────────────
        success: "var(--color-success)",
        error:   "var(--color-error)",
        warning: "var(--color-warning)",

        // ── Navbar ───────────────────────────────────────────────────────
        "navbar-bg":        "var(--color-navbar-bg)",
        "navbar-link":      "var(--color-navbar-link)",
        "navbar-link-hover":"var(--color-navbar-link-hover)",
        "navbar-logo-bg":   "var(--color-navbar-logo-bg)",
        "navbar-logo-text": "var(--color-navbar-logo-text)",

        // ── Botões ───────────────────────────────────────────────────────
        "btn-primary-bg":     "var(--color-btn-primary-bg)",
        "btn-primary-text":   "var(--color-btn-primary-text)",
        "btn-primary-hover":  "var(--color-btn-primary-hover)",
        "btn-secondary-bg":   "var(--color-btn-secondary-bg)",
        "btn-secondary-text": "var(--color-btn-secondary-text)",
        "btn-secondary-border":"var(--color-btn-secondary-border)",

        // ── Cards ────────────────────────────────────────────────────────
        "card-bg":     "var(--color-card-bg)",
        "card-border": "var(--color-card-border)",

        // ── Formulários ──────────────────────────────────────────────────
        "input-bg":           "var(--color-input-bg)",
        "input-border":       "var(--color-input-border)",
        "input-border-focus": "var(--color-input-border-focus)",

        // ── Admin ────────────────────────────────────────────────────────
        "admin-sidebar":        "var(--color-admin-sidebar-bg)",
        "admin-active-bg":      "var(--color-admin-sidebar-active-bg)",
        "admin-active-text":    "var(--color-admin-sidebar-active-text)",
        "admin-active-border":  "var(--color-admin-sidebar-active-border)",
        "admin-row-hover":      "var(--color-admin-row-hover)",
        "admin-action-edit":    "var(--color-admin-action-edit)",
        "admin-action-delete":  "var(--color-admin-action-delete)",

        // ── Badges de categoria ──────────────────────────────────────────
        "badge-industrial-bg":   "var(--color-badge-industrial-bg)",
        "badge-industrial-text": "var(--color-badge-industrial-text)",
        "badge-decoration-bg":   "var(--color-badge-decoration-bg)",
        "badge-decoration-text": "var(--color-badge-decoration-text)",
        "badge-prototype-bg":    "var(--color-badge-prototype-bg)",
        "badge-prototype-text":  "var(--color-badge-prototype-text)",
        "badge-medicine-bg":     "var(--color-badge-medicine-bg)",
        "badge-medicine-text":   "var(--color-badge-medicine-text)",
        "badge-education-bg":    "var(--color-badge-education-bg)",
        "badge-education-text":  "var(--color-badge-education-text)",

        // ── Erros / sucesso ──────────────────────────────────────────────
        "error-bg":      "var(--color-error-bg)",
        "error-border":  "var(--color-error-border)",
        "success-bg":    "var(--color-success-bg)",
        "success-border":"var(--color-success-border)",
      },
    },
  },
  plugins: [],
};
