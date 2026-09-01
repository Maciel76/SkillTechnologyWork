/**
 * Aplica o SEO da rota atual no <head>.
 *
 * Numa SPA o navegador carrega um unico index.html e troca o conteudo por
 * JavaScript. Sem isto, todas as rotas compartilham o mesmo titulo e a mesma
 * descricao: o Google indexa dez paginas identicas e nao sabe qual mostrar, e
 * o link compartilhado no WhatsApp mostra sempre o mesmo texto.
 *
 * As tags sao reaproveitadas (procura antes de criar) para o head nao encher
 * de duplicatas a cada navegacao.
 */

import { SITE } from "./siteConfig";
import { PAGINAS, SeoPagina } from "./paginas";
import { organizacao, websiteSchema, montarGrafo } from "./schema";

const ID_JSONLD = "seo-jsonld";

function tagMeta(chave: "name" | "property", valor: string, conteudo: string) {
  if (!conteudo) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${chave}="${valor}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(chave, valor);
    document.head.appendChild(el);
  }
  el.setAttribute("content", conteudo);
}

function tagLink(rel: string, href: string, extras: Record<string, string> = {}) {
  const seletor = extras.hreflang
    ? `link[rel="${rel}"][hreflang="${extras.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(seletor);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  Object.entries(extras).forEach(([k, v]) => el!.setAttribute(k, v));
}

/**
 * Escreve o JSON-LD da pagina.
 *
 * Organizacao e WebSite entram em toda pagina de proposito: o robo pode chegar
 * por qualquer URL (uma busca leva direto a um artigo do blog, por exemplo) e
 * precisa saber de quem e o site sem ter que visitar a home.
 */
function escreverJsonLd(blocos: any[]) {
  let script = document.getElementById(ID_JSONLD) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = ID_JSONLD;
    script.type = "application/ld+json";
    document.head.appendChild(script);
    // O bloco gravado no index.html era o plano B para quem nao roda JS.
    // Chegando aqui, o grafo completo ja existe: deixar os dois no head so
    // daria ao validador duas descricoes da mesma entidade para conciliar.
    document.getElementById("seo-jsonld-estatico")?.remove();
  }
  script.textContent = montarGrafo([organizacao(), websiteSchema(), ...blocos]);
}

export function aplicarSeo(pagina: SeoPagina, caminho: string) {
  // A home fica com a barra final para bater exatamente com o <loc> do
  // sitemap. Canonical e sitemap apontando para grafias diferentes da mesma
  // pagina e um dos jeitos mais faceis de dividir a autoridade dela em duas.
  const url = SITE.url + (caminho === "/" ? "/" : caminho.replace(/\/+$/, ""));
  const titulo = pagina.titulo;
  const descricao = pagina.descricao;

  document.title = titulo;
  document.documentElement.lang = SITE.idioma;

  tagMeta("name", "description", descricao);
  if (pagina.palavras?.length) {
    tagMeta("name", "keywords", pagina.palavras.join(", "));
  }

  // max-image-preview:large libera a miniatura grande no resultado; max-snippet:-1
  // deixa o buscador (e a IA que se apoia nele) citar o trecho inteiro.
  tagMeta(
    "name",
    "robots",
    pagina.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  );

  tagLink("canonical", url);
  tagLink("alternate", url, { hreflang: "pt-BR" });
  tagLink("alternate", url, { hreflang: "x-default" });

  // Open Graph: preview do link no WhatsApp, LinkedIn e Facebook.
  tagMeta("property", "og:type", caminho === "/" ? "website" : "article");
  tagMeta("property", "og:site_name", SITE.nome);
  tagMeta("property", "og:title", titulo);
  tagMeta("property", "og:description", descricao);
  tagMeta("property", "og:url", url);
  tagMeta("property", "og:image", SITE.logo);
  tagMeta("property", "og:locale", "pt_BR");

  tagMeta("name", "twitter:card", "summary_large_image");
  tagMeta("name", "twitter:title", titulo);
  tagMeta("name", "twitter:description", descricao);
  tagMeta("name", "twitter:image", SITE.logo);

  // Sinal geografico para busca local ("agencia de IA perto de mim").
  tagMeta("name", "geo.region", `${SITE.pais}-${SITE.estado}`);
  tagMeta("name", "geo.placename", SITE.cidade);
  tagMeta("name", "geo.position", `${SITE.latitude};${SITE.longitude}`);
  tagMeta("name", "author", SITE.nome);

  if (pagina.noindex) {
    // Pagina fora do indice nao precisa de dados estruturados.
    document.getElementById(ID_JSONLD)?.remove();
    return;
  }

  escreverJsonLd(pagina.schema ? pagina.schema(url) : []);
}

/**
 * Reaplica o SEO da rota somando blocos que so existem depois dos dados
 * carregarem — a lista de artigos do blog, por exemplo.
 *
 * Existe para que uma pagina nao precise montar meta tag na mao: se cada view
 * criar seu proprio <script type="application/ld+json">, o head acaba com dois
 * grafos concorrentes e o buscador nao sabe qual vale.
 */
export function aplicarSeoComExtras(
  nomeRota: string,
  caminho: string,
  extras: any[]
) {
  const pagina = seoDaRota(nomeRota);
  aplicarSeo(
    {
      ...pagina,
      schema: (url: string) => [...(pagina.schema ? pagina.schema(url) : []), ...extras],
    },
    caminho
  );
}

/**
 * Descobre qual bloco de SEO usar para a rota.
 * O nome da rota vem do router; se nao houver, cai no perfil privado (noindex),
 * que e o comportamento seguro para rota nova ainda nao mapeada.
 */
export function seoDaRota(nomeRota?: string | null): SeoPagina {
  if (!nomeRota) return PAGINAS.privadas;
  return PAGINAS[nomeRota] || PAGINAS.privadas;
}

export default aplicarSeo;
