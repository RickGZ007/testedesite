// ─────────────────────────────────────────────────────────────────────────────
// mockData.js  –  Substitua os fetches pelo seu back-end Spring Boot
// GET /api/projetos  →  PROJETOS_INICIAIS
// GET /api/materiais →  MATERIAIS
// GET /api/cores     →  CORES_ESTOQUE
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIAS = ["Industrial", "Decoração", "Prototipagem", "Medicina", "Educação"];

export const NOMES_MATERIAIS = ["PLA", "ABS", "PETG", "TPU", "Resina"];

export const PROJETOS_INICIAIS = [
  {
    id: 1,
    titulo: "Suporte industrial modular",
    categoria: "Industrial",
    material: "ABS",
    finalidade: "Fixação de cabos em linha de montagem automotiva",
    imagem: "https://placehold.co/600x400/111827/f97316?text=Industrial+01&font=montserrat",
  },
  {
    id: 2,
    titulo: "Engrenagem de reposição",
    categoria: "Industrial",
    material: "PETG",
    finalidade: "Peça de reposição para esteira logística",
    imagem: "https://placehold.co/600x400/111827/f97316?text=Industrial+02&font=montserrat",
  },
  {
    id: 3,
    titulo: "Vaso paramétrico Voronoi",
    categoria: "Decoração",
    material: "PLA",
    finalidade: "Decoração de interiores minimalistas",
    imagem: "https://placehold.co/600x400/111827/f97316?text=Decoração+01&font=montserrat",
  },
  {
    id: 4,
    titulo: "Luminária geométrica",
    categoria: "Decoração",
    material: "PLA",
    finalidade: "Abajur de mesa com difusor de luz",
    imagem: "https://placehold.co/600x400/111827/f97316?text=Decoração+02&font=montserrat",
  },
  {
    id: 5,
    titulo: "Protótipo ergonômico",
    categoria: "Prototipagem",
    material: "PLA",
    finalidade: "Validação de ergonomia pré-produção em série",
    imagem: "https://placehold.co/600x400/111827/f97316?text=Protótipo+01&font=montserrat",
  },
  {
    id: 6,
    titulo: "Modelo arquitetônico",
    categoria: "Prototipagem",
    material: "PETG",
    finalidade: "Apresentação de projeto para cliente",
    imagem: "https://placehold.co/600x400/111827/f97316?text=Protótipo+02&font=montserrat",
  },
];

export const MATERIAIS = [
  {
    id: 1,
    nome: "PLA",
    descricao: "Polímero biodegradável, fácil de imprimir. Ideal para protótipos, decoração e peças de baixo esforço mecânico.",
    propriedades: { resistencia: 3, acabamento: 5, facilidade: 5, flexibilidade: 2 },
    destaque: "Acabamento premium",
  },
  {
    id: 2,
    nome: "ABS",
    descricao: "Termoplástico resistente ao calor e impactos. Escolha certa para peças funcionais e uso industrial.",
    propriedades: { resistencia: 5, acabamento: 3, facilidade: 3, flexibilidade: 3 },
    destaque: "Alta resistência",
  },
  {
    id: 3,
    nome: "PETG",
    descricao: "Equilibra resistência química, boa transparência e facilidade de impressão. Versátil para uso geral.",
    propriedades: { resistencia: 4, acabamento: 4, facilidade: 4, flexibilidade: 4 },
    destaque: "Mais versátil",
  },
];

export const CORES_ESTOQUE_INICIAIS = [
  { id: 1, nome: "Branco", hex: "#F5F5F5", emEstoque: true },
  { id: 2, nome: "Preto", hex: "#1C1C1C", emEstoque: true },
  { id: 3, nome: "Cinza", hex: "#6B7280", emEstoque: true },
  { id: 4, nome: "Vermelho", hex: "#DC2626", emEstoque: true },
  { id: 5, nome: "Laranja", hex: "#F97316", emEstoque: true },
  { id: 6, nome: "Amarelo", hex: "#EAB308", emEstoque: false },
  { id: 7, nome: "Verde", hex: "#16A34A", emEstoque: true },
  { id: 8, nome: "Azul", hex: "#2563EB", emEstoque: true },
  { id: 9, nome: "Roxo", hex: "#7C3AED", emEstoque: false },
  { id: 10, nome: "Rosa", hex: "#EC4899", emEstoque: true },
  { id: 11, nome: "Marrom", hex: "#92400E", emEstoque: false },
  { id: 12, nome: "Transparente", hex: "#E0F2FE", emEstoque: true },
];
