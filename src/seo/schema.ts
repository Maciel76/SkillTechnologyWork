/**
 * Dados estruturados (schema.org / JSON-LD).
 *
 * Este e o arquivo que faz a IA entender a agencia. Texto solto na pagina o
 * modelo interpreta como pode; JSON-LD ele le como fato: nome, o que vende,
 * onde atende, como falar com a empresa. E o mesmo bloco que o Google usa para
 * montar rich snippet e painel de conhecimento.
 *
 * O grafo e ligado por @id. Assim o buscador entende que a Organization da
 * home, o servico da pagina de servicos e o autor do post do blog sao a mesma
 * entidade, em vez de tres empresas com nome parecido.
 */

import { SITE, SERVICOS, FAQ, PALAVRAS_CHAVE } from "./siteConfig";

const ID = {
  organizacao: `${SITE.url}/#organizacao`,
  site: `${SITE.url}/#site`,
  local: `${SITE.url}/#local`,
};

/** A agencia como entidade. Serve de ancora para todo o resto do grafo. */
export function organizacao() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ID.organizacao,
    name: SITE.nome,
    alternateName: SITE.nomeAlternativo,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE.url}/#logo`,
      url: SITE.logo,
      caption: SITE.nome,
    },
    image: SITE.logo,
    description: SITE.resumo,
    slogan: "Aplicamos IA ao seu negocio para automatizar o que hoje e feito na mao",
    foundingDate: SITE.fundacao,
    email: SITE.email,
    telephone: SITE.telefone,
    priceRange: SITE.faixaPreco,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.cidade,
      addressRegion: SITE.estado,
      addressCountry: SITE.pais,
    },
    // A agencia trabalha remoto para o Brasil inteiro, mas tem base em Goiania.
    // Os dois sinais juntos: aparece na busca local e nao se limita a ela.
    areaServed: [
      { "@type": "Country", name: SITE.paisNome },
      { "@type": "State", name: SITE.estadoNome },
      { "@type": "City", name: SITE.cidade },
    ],
    knowsAbout: [
      ...PALAVRAS_CHAVE.principais,
      ...PALAVRAS_CHAVE.servicos,
      "inteligencia artificial aplicada a negocios",
      "large language models",
      "integracao de sistemas",
      "transformacao digital",
    ],
    knowsLanguage: ["pt-BR"],
    sameAs: SITE.redes,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SITE.telefoneE164,
        email: SITE.email,
        availableLanguage: ["Portuguese"],
        areaServed: SITE.pais,
        url: `${SITE.url}/contato`,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: SITE.telefoneE164,
        availableLanguage: ["Portuguese"],
        areaServed: SITE.pais,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicos da Skill Technology Work",
      itemListElement: SERVICOS.map((s, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE.url}/services#${s.slug}`,
          name: s.nome,
          description: s.descricao,
          serviceType: s.nome,
          provider: { "@id": ID.organizacao },
          areaServed: { "@type": "Country", name: SITE.paisNome },
        },
      })),
    },
  };
}

/** O site em si. Habilita a caixa de busca no resultado do Google. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": ID.site,
    url: SITE.url,
    name: SITE.nome,
    description: SITE.resumo,
    publisher: { "@id": ID.organizacao },
    inLanguage: SITE.idioma,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/blog?busca={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Ficha de negocio local. E o que coloca a agencia no mapa e no pacote local
 * de "agencia de IA perto de mim".
 */
export function negocioLocal() {
  return {
    "@type": "LocalBusiness",
    "@id": ID.local,
    name: SITE.nome,
    image: SITE.logo,
    url: SITE.url,
    telephone: SITE.telefoneE164,
    email: SITE.email,
    priceRange: SITE.faixaPreco,
    parentOrganization: { "@id": ID.organizacao },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.cidade,
      addressRegion: SITE.estado,
      addressCountry: SITE.pais,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: { "@type": "Country", name: SITE.paisNome },
  };
}

/** Perguntas frequentes: rich snippet no Google, material de citacao para a IA. */
export function faqSchema(itens = FAQ) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: itens.map((f) => ({
      "@type": "Question",
      name: f.pergunta,
      acceptedAnswer: { "@type": "Answer", text: f.resposta },
    })),
  };
}

/** Trilha de navegacao. Aparece no lugar da URL crua no resultado de busca. */
export function breadcrumb(trilha: { nome: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trilha.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.nome,
      item: t.url,
    })),
  };
}

/** A pagina atual, amarrada ao site e a organizacao. */
export function paginaWeb(opcoes: {
  url: string;
  titulo: string;
  descricao: string;
  tipo?: string;
}) {
  return {
    "@type": opcoes.tipo || "WebPage",
    "@id": `${opcoes.url}#pagina`,
    url: opcoes.url,
    name: opcoes.titulo,
    description: opcoes.descricao,
    isPartOf: { "@id": ID.site },
    about: { "@id": ID.organizacao },
    inLanguage: SITE.idioma,
    // Diz ao assistente de voz qual trecho ler em voz alta.
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-subtitle", ".sobre-lead"],
    },
  };
}

/** Monta o grafo final e devolve a string pronta para a tag script. */
export function montarGrafo(blocos: any[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": blocos.filter(Boolean),
  }).replace(/</g, "\\u003c");
}

export const IDS = ID;
