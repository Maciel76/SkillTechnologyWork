// Apenas destinos conhecidos viram links. O restante continua como texto escapado pelo Vue.
export function assistantLinks(text, site) {
  const paths = new Set([
    "/contato", "/services", "/portfolio", "/clientes", "/sobre", "/blog", "/eventos", "/loja",
  ]);
  const resolve = (value) => {
    if (value === site.whatsapp) return { href: value, external: true };
    if (value === site.email || value === `mailto:${site.email}`) {
      return { href: `mailto:${site.email}` };
    }
    const path = value.startsWith(`${site.url}/`) ? value.slice(site.url.length) : value;
    if (paths.has(path.toLowerCase())) return { href: path.toLowerCase() };
    return null;
  };
  const pattern = /\[([^\]\n]+)\]\(([^\s)]+)\)|https?:\/\/[^\s<>"')\]]+|(?:mailto:)?[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?<![\w/])\/[a-z]+\b/gi;
  const parts = [];
  let cursor = 0;
  for (const match of text.matchAll(pattern)) {
    const raw = match[0];
    const value = (match[2] || raw).replace(/[.,;:!?]+$/, "");
    const link = resolve(value);
    if (!link) continue;
    if (match.index > cursor) parts.push({ text: text.slice(cursor, match.index) });
    parts.push({ text: match[1] || value, ...link });
    cursor = match.index + (match[2] ? raw.length : value.length);
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts;
}
