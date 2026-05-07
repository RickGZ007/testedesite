// ─────────────────────────────────────────────────────────────────────────────
// imageUtils.js — converte links do Google Drive para URL de imagem direta
//
// Formatos aceitos:
//   https://drive.google.com/file/d/ID/view?usp=sharing
//   https://drive.google.com/open?id=ID
//   https://drive.google.com/uc?id=ID
//   https://drive.google.com/uc?export=view&id=ID
//
// Converte para: https://lh3.googleusercontent.com/d/ID
// ─────────────────────────────────────────────────────────────────────────────

function extractDriveId(url) {
  if (!url || typeof url !== "string") return null;

  // Formato: /file/d/ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];

  // Formato: ?id=ID ou &id=ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch) return idMatch[1];

  return null;
}

/**
 * Converte link do Google Drive → URL de imagem direta.
 * Qualquer outra URL (Cloudinary, placeholder, etc.) passa sem alteração.
 */
export function resolveImageUrl(url) {
  if (!url) return url;
  const driveId = extractDriveId(url);
  if (driveId) return `https://lh3.googleusercontent.com/d/${driveId}`;
  return url;
}
