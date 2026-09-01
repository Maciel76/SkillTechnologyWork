/**
 * SEO de cada pagina do site.
 *
 * Regras que guiaram os textos abaixo:
 *  - titulo com ate ~60 caracteres, palavra-chave na frente e marca no fim;
 *  - descricao entre 140 e 160 caracteres, com verbo de acao, porque e ela que
 *    aparece no resultado e decide o clique;
 *  - cada pagina mira um grupo de palavras diferente. Duas paginas competindo
 *    pelo mesmo termo se canibalizam e as duas perdem posicao.
 */

import { SITE, SERVICOS, FAQ } from "./siteConfig";
import {
  organizacao,
  websiteSchema,
  negocioLocal,
  faqSchema,
  breadcrumb,
  paginaWeb,
} from "./schema";

export interface SeoPagina {
  titulo: string;
  descricao: string;
  palavras?: string[];
  /** Fora do indice: area logada e paginas sem valor de busca. */
  noindex?: boolean;
  /** Blocos extras de JSON-LD alem do basico (organizacao + site + pagina). */
  schema?: (url: string) => any[];
}

const inicio = { nome: "Inicio", url: SITE.url };

export const PAGINAS: Record<string, SeoPagina> = {
  home: {
    titulo: "Agencia de IA para Empresas | Skill Technology Work",
    descricao:
      "Colocamos inteligencia artificial para trabalhar no seu negocio: integramos IA " +
      "ao ERP ou CRM que voce ja usa, automatizamos processos e criamos sistemas sob " +
      "medida. Diagnostico gratuito.",
    palavras: [
      "agencia de inteligencia artificial",
      "automacao com IA para empresas",
      "integrar IA no ERP",
      "chatbot com IA no WhatsApp",
    ],
    // A home carrega o grafo completo: e a pagina que a IA lê primeiro quando
    // quer saber quem e a empresa.
    schema: (url) => [
      negocioLocal(),
      faqSchema(FAQ),
      {
        "@type": "ItemList",
        name: "Servicos da Skill Technology Work",
        itemListElement: SERVICOS.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: s.nome,
          description: s.descricao,
          url: `${SITE.url}/services#${s.slug}`,
        })),
      },
      breadcrumb([inicio]),
      paginaWeb({
        url,
        titulo: "Agencia de IA para Empresas",
        descricao: SITE.resumo,
        tipo: "WebPage",
      }),
    ],
  },

  sobre: {
    titulo: "Sobre a Skill Technology Work | Agencia de IA no Brasil",
    descricao:
      "Somos um time de tecnologia que aplica inteligencia artificial dentro da " +
      "operacao das empresas. Conheca a historia, o metodo de trabalho e o que a " +
      "agencia ja entregou.",
    palavras: [
      "agencia de IA no Brasil",
      "empresa de desenvolvimento de software",
      "consultoria em inteligencia artificial",
    ],
    schema: (url) => [
      breadcrumb([inicio, { nome: "Sobre", url }]),
      paginaWeb({
        url,
        titulo: "Sobre a Skill Technology Work",
        descricao: SITE.resumo,
        tipo: "AboutPage",
      }),
    ],
  },

  servicos: {
    titulo: "Servicos de IA, Automacao e Software | Skill Technology Work",
    descricao:
      "Integracao de IA ao ERP e CRM, automacao de processos, atendimento com IA no " +
      "WhatsApp, sistemas sob medida, sites, lojas virtuais e aplicativos. Veja o que " +
      "cabe no seu negocio.",
    palavras: [
      "integracao de IA com ERP e CRM",
      "automacao de processos empresariais",
      "desenvolvimento de sistemas sob medida",
      "criacao de loja virtual",
    ],
    // Cada servico vira um Service proprio, com provider apontando para a
    // agencia. E o que permite a IA responder "quem faz X?" com o nome certo.
    schema: (url) => [
      ...SERVICOS.map((s) => ({
        "@type": "Service",
        "@id": `${url}#${s.slug}`,
        name: s.nome,
        description: s.descricao,
        serviceType: s.nome,
        provider: { "@id": `${SITE.url}/#organizacao` },
        areaServed: { "@type": "Country", name: SITE.paisNome },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: s.nome,
          itemListElement: s.itens.map((item, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name: item },
          })),
        },
      })),
      breadcrumb([inicio, { nome: "Servicos", url }]),
      paginaWeb({
        url,
        titulo: "Servicos",
        descricao:
          "Servicos de inteligencia artificial, automacao e desenvolvimento de " +
          "software da Skill Technology Work.",
        tipo: "CollectionPage",
      }),
    ],
  },

  portfolio: {
    titulo: "Portfolio de Projetos de IA e Software | Skill Technology Work",
    descricao:
      "Sistemas com IA, lojas virtuais, aplicativos e automacoes ja entregues pela " +
      "Skill Technology Work. Veja os projetos, o problema de cada cliente e o " +
      "resultado alcancado.",
    palavras: [
      "portfolio de agencia de tecnologia",
      "cases de inteligencia artificial",
      "projetos de software sob medida",
    ],
    schema: (url) => [
      breadcrumb([inicio, { nome: "Portfolio", url }]),
      paginaWeb({
        url,
        titulo: "Portfolio",
        descricao: "Projetos de IA, sistemas, sites e aplicativos ja entregues.",
        tipo: "CollectionPage",
      }),
    ],
  },

  contato: {
    titulo: "Contato e Diagnostico Gratuito | Skill Technology Work",
    descricao:
      "Fale com a Skill Technology Work pelo WhatsApp, e-mail ou formulario. O " +
      "diagnostico do seu processo e gratuito e mostra onde a IA gera resultado " +
      "antes de qualquer proposta.",
    palavras: [
      "contratar agencia de inteligencia artificial",
      "orcamento de sistema com IA",
      "diagnostico de automacao gratuito",
    ],
    schema: (url) => [
      negocioLocal(),
      breadcrumb([inicio, { nome: "Contato", url }]),
      paginaWeb({
        url,
        titulo: "Contato",
        descricao: "Canais de contato e diagnostico gratuito.",
        tipo: "ContactPage",
      }),
    ],
  },

  clientes: {
    titulo: "Clientes e Depoimentos | Skill Technology Work",
    descricao:
      "O que os clientes dizem depois de colocar IA e automacao para rodar. " +
      "Depoimentos reais de empresas de comercio, servicos, educacao e logistica.",
    palavras: [
      "depoimentos de clientes agencia de TI",
      "avaliacoes Skill Technology Work",
    ],
    schema: (url) => [
      breadcrumb([inicio, { nome: "Clientes", url }]),
      paginaWeb({
        url,
        titulo: "Clientes",
        descricao: "Depoimentos de clientes da Skill Technology Work.",
      }),
    ],
  },

  blog: {
    titulo: "Blog sobre IA, Automacao e Tecnologia | Skill Technology Work",
    descricao:
      "Artigos praticos sobre inteligencia artificial aplicada a negocios, automacao " +
      "de processos, desenvolvimento de sistemas e tendencias de tecnologia para " +
      "empresas brasileiras.",
    palavras: [
      "blog de inteligencia artificial",
      "como aplicar IA na empresa",
      "automacao de processos",
    ],
    schema: (url) => [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: "Blog da Skill Technology Work",
        description:
          "Conteudo sobre IA aplicada a negocios, automacao e desenvolvimento.",
        publisher: { "@id": `${SITE.url}/#organizacao` },
        inLanguage: SITE.idioma,
      },
      breadcrumb([inicio, { nome: "Blog", url }]),
      paginaWeb({ url, titulo: "Blog", descricao: "Artigos sobre IA e tecnologia." }),
    ],
  },

  missao: {
    titulo: "Missao, Visao e Valores | Skill Technology Work",
    descricao:
      "Por que a Skill Technology Work existe: tornar a inteligencia artificial " +
      "acessivel para empresas de qualquer porte, com entrega em fases e resultado " +
      "medido.",
    schema: (url) => [
      breadcrumb([inicio, { nome: "Missao", url }]),
      paginaWeb({ url, titulo: "Missao", descricao: "Missao, visao e valores.", tipo: "AboutPage" }),
    ],
  },

  eventos: {
    titulo: "Eventos e Workshops de Tecnologia | Skill Technology Work",
    descricao:
      "Encontros, workshops e treinamentos da Skill Technology Work sobre " +
      "inteligencia artificial, automacao e desenvolvimento para empresas.",
    schema: (url) => [
      breadcrumb([inicio, { nome: "Eventos", url }]),
      paginaWeb({ url, titulo: "Eventos", descricao: "Eventos e workshops.", tipo: "CollectionPage" }),
    ],
  },

  loja: {
    titulo: "Loja Digital: Sistemas e Templates Prontos | SkillTech",
    descricao:
      "Produtos digitais prontos para usar: templates de site, sistemas e solucoes " +
      "com IA que entram no ar rapido, sem projeto do zero.",
    schema: (url) => [
      breadcrumb([inicio, { nome: "Loja", url }]),
      paginaWeb({ url, titulo: "Loja", descricao: "Produtos digitais prontos.", tipo: "CollectionPage" }),
    ],
  },

  termos: {
    titulo: "Termos de Uso | Skill Technology Work",
    descricao:
      "Termos de uso do site e dos servicos da Skill Technology Work: regras de " +
      "contratacao, responsabilidades e condicoes gerais.",
    schema: (url) => [paginaWeb({ url, titulo: "Termos de Uso", descricao: "Termos de uso." })],
  },

  privacidade: {
    titulo: "Politica de Privacidade e LGPD | Skill Technology Work",
    descricao:
      "Como a Skill Technology Work coleta, usa e protege dados pessoais, em " +
      "conformidade com a Lei Geral de Protecao de Dados (LGPD).",
    schema: (url) => [
      paginaWeb({ url, titulo: "Politica de Privacidade", descricao: "Privacidade e LGPD." }),
    ],
  },

  // Rotas com conteudo vindo da API (artigo, produto). O texto abaixo e so o
  // ponto de partida: assim que os dados chegam, a propria pagina chama
  // aplicarSeo de novo com titulo e descricao reais. Sem esse default a rota
  // cairia em "privadas" e o artigo sairia do indice enquanto carrega.
  blogpost: {
    titulo: "Artigo | Blog da Skill Technology Work",
    descricao:
      "Artigo do blog da Skill Technology Work sobre inteligencia artificial, " +
      "automacao e desenvolvimento de software para empresas.",
    schema: (url) => [
      breadcrumb([inicio, { nome: "Blog", url: `${SITE.url}/blog` }, { nome: "Artigo", url }]),
    ],
  },

  htmlpost: {
    titulo: "Artigo | Blog da Skill Technology Work",
    descricao:
      "Artigo do blog da Skill Technology Work sobre inteligencia artificial, " +
      "automacao e desenvolvimento de software para empresas.",
    schema: (url) => [
      breadcrumb([inicio, { nome: "Blog", url: `${SITE.url}/blog` }, { nome: "Artigo", url }]),
    ],
  },

  ProdutoPage: {
    titulo: "Produto Digital | Loja da Skill Technology Work",
    descricao:
      "Produto digital da Skill Technology Work: sistemas e templates prontos para " +
      "colocar no ar sem projeto do zero.",
    schema: (url) => [
      breadcrumb([inicio, { nome: "Loja", url: `${SITE.url}/Loja` }, { nome: "Produto", url }]),
    ],
  },

  // Sem valor de busca: mantem fora do indice para nao diluir a autoridade
  // do dominio em paginas que ninguem procura.
  privadas: {
    titulo: "Skill Technology Work",
    descricao: SITE.resumo,
    noindex: true,
  },
};

export { organizacao, websiteSchema };
