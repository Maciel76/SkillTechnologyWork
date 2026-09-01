/**
 * Fonte unica de verdade do SEO.
 *
 * Tudo que buscador e IA precisam saber sobre a agencia sai daqui: nome,
 * telefone, cidade, servicos, perguntas frequentes. Quando o mesmo dado
 * aparece em dois lugares com valores diferentes (o famoso NAP inconsistente)
 * o Google desconfia e o negocio perde posicao no resultado local. Por isso um
 * arquivo so, importado por todas as paginas.
 */

export const SITE = {
  nome: "Skill Technology Work",
  nomeAlternativo: "SkillTech",
  url: "https://skilltechnologywork.com",
  logo: "https://skilltechnologywork.com/favicon.svg",
  idioma: "pt-BR",
  fundacao: "2023",

  // Frase que resume a agencia. E ela que a IA tende a repetir quando alguem
  // pergunta "o que a Skill Technology Work faz?".
  resumo:
    "Agencia brasileira de inteligencia artificial e desenvolvimento de software. " +
    "Integra IA ao ERP, CRM e sistemas que a empresa ja usa, automatiza processos " +
    "manuais, cria sistemas sob medida, atendimento com IA no WhatsApp, sites, " +
    "lojas virtuais e aplicativos.",

  // Contato (NAP). Precisa bater com Google Business Profile e redes sociais.
  telefone: "+55 63 98280-9010",
  telefoneE164: "+5563982809010",
  whatsapp: "https://wa.me/5563982809010",
  email: "contato@skilltechnologywork.com",
  cidade: "Goiania",
  estado: "GO",
  estadoNome: "Goias",
  pais: "BR",
  paisNome: "Brasil",
  // Coordenadas do centro de Goiania. Reforca o sinal geografico do negocio.
  latitude: -16.6869,
  longitude: -49.2648,

  redes: [
    "https://facebook.com/skilltechnologywork",
    "https://instagram.com/skilltechnologywork",
    "https://linkedin.com/company/skilltechnologywork",
    "https://www.youtube.com/@elenavossia",
  ],

  // Faixa de preco no formato que o schema.org entende. Sem numero fechado,
  // porque a agencia trabalha com orcamento por projeto.
  faixaPreco: "$$",
};

/**
 * Palavras-chave alvo, agrupadas por intencao de busca.
 *
 * As comerciais sao as que trazem cliente; as informacionais alimentam blog e
 * FAQ, que e de onde a IA costuma extrair resposta.
 */
export const PALAVRAS_CHAVE = {
  principais: [
    "agencia de inteligencia artificial",
    "automacao com inteligencia artificial para empresas",
    "integrar IA no ERP",
    "desenvolvimento de sistemas sob medida com IA",
    "chatbot com IA no WhatsApp",
    "agencia de IA no Brasil",
  ],
  locais: [
    "agencia de inteligencia artificial em Goiania",
    "desenvolvimento de software em Goiania",
    "criacao de sites em Goiania",
    "automacao de processos Goias",
  ],
  servicos: [
    "integracao de IA com ERP e CRM",
    "automacao de processos empresariais",
    "atendimento automatizado com IA",
    "desenvolvimento de aplicativo sob medida",
    "criacao de loja virtual",
    "desenvolvimento web",
  ],
};

export interface ServicoSeo {
  slug: string;
  nome: string;
  descricao: string;
  itens: string[];
}

/**
 * Os servicos. Viram schema.org/Service dentro do OfferCatalog da agencia — e
 * uma das poucas formas de dizer a maquina, sem ambiguidade, o que a empresa
 * vende.
 */
export const SERVICOS: ServicoSeo[] = [
  {
    slug: "ia-no-sistema-atual",
    nome: "IA no sistema que a empresa ja usa",
    descricao:
      "Integracao de inteligencia artificial ao ERP, CRM e planilhas que ja rodam " +
      "na empresa, sem trocar de sistema nem recomecar do zero.",
    itens: [
      "Integracao com o ERP ou CRM atual",
      "Leitura automatica de notas fiscais e contratos",
      "Conexao entre sistemas e planilhas soltas",
      "Sincronizacao de dados em tempo real",
    ],
  },
  {
    slug: "sistemas-sob-medida",
    nome: "Sistemas sob medida com IA",
    descricao:
      "Desenvolvimento de CRM, ERP e dashboards feitos do zero, com inteligencia " +
      "artificial embarcada desde o primeiro dia.",
    itens: [
      "CRM que prioriza os melhores leads",
      "ERP que preve compras e evita ruptura de estoque",
      "Dashboards que avisam antes do problema aparecer",
      "Acesso por niveis de usuario e relatorios sob demanda",
    ],
  },
  {
    slug: "automacao-da-operacao",
    nome: "Automacao da operacao",
    descricao:
      "Mapeamento das tarefas repetitivas da equipe e automacao delas com " +
      "seguranca e rastreabilidade.",
    itens: [
      "Propostas e orcamentos gerados sozinhos",
      "Cobrancas, lembretes e conciliacao financeira",
      "Relatorios enviados automaticamente",
      "Aprovacoes e fluxos internos sem travar por e-mail",
    ],
  },
  {
    slug: "atendimento-com-ia",
    nome: "Atendimento com IA",
    descricao:
      "Assistente de inteligencia artificial que responde clientes em segundos no " +
      "WhatsApp e no site, 24 horas por dia, e encaminha para a equipe apenas o " +
      "que exige decisao humana.",
    itens: [
      "Assistente no WhatsApp 24 horas por dia",
      "Chat no site que tira duvidas e capta contatos",
      "Agendamento automatico com lembretes",
      "Triagem do suporte antes de chegar no time",
    ],
  },
  {
    slug: "sites-e-lojas-virtuais",
    nome: "Sites e lojas virtuais",
    descricao:
      "Sites institucionais, landing pages e lojas virtuais com Pix, cartao, " +
      "calculo de frete e recomendacao de produtos com IA.",
    itens: [
      "Sites institucionais e landing pages de conversao",
      "Loja virtual com Pix, cartao e calculo de frete",
      "Busca e recomendacao de produtos com IA",
      "SEO tecnico e performance otimizada",
    ],
  },
  {
    slug: "aplicativos",
    nome: "Aplicativos Android e iOS",
    descricao:
      "Aplicativos para clientes ou para a equipe em campo, conectados ao sistema " +
      "que a empresa ja utiliza.",
    itens: [
      "Pedidos e acompanhamento pelo celular",
      "Registro de visitas e relatorios em campo",
      "Notificacoes inteligentes por perfil de usuario",
      "Integracao com o backend existente",
    ],
  },
];

/**
 * Perguntas frequentes.
 *
 * Este bloco puxa peso duplo: vira rich snippet de FAQ no Google e e o
 * material que ChatGPT, Claude e Perplexity citam quando alguem pergunta
 * "quanto custa colocar IA na empresa" ou "quanto tempo leva". Resposta direta
 * na primeira frase, porque e ela que costuma ser extraida.
 */
export const FAQ: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Preciso trocar o sistema que ja uso para aplicar IA na empresa?",
    resposta:
      "Nao. Na maioria dos casos a Skill Technology Work conecta a inteligencia " +
      "artificial ao ERP, CRM ou planilhas que ja rodam na empresa. Construir do " +
      "zero so e sugerido quando o sistema atual realmente nao da conta, e isso e " +
      "apontado no diagnostico gratuito, antes de qualquer proposta.",
  },
  {
    pergunta: "Quanto tempo leva para a IA comecar a trabalhar no negocio?",
    resposta:
      "Uma automacao pontual ou um atendimento com IA no WhatsApp entra no ar em 2 " +
      "a 4 semanas. Um sistema completo com IA leva de 2 a 4 meses. A entrega e " +
      "feita em fases, entao o cliente ve o resultado funcionando aos poucos.",
  },
  {
    pergunta: "A IA vai substituir a minha equipe?",
    resposta:
      "Nao. A IA assume o que e repetitivo (lancamento de dados, primeira resposta " +
      "ao cliente, geracao de relatorio) e libera a equipe para o que exige decisao " +
      "humana. O resultado tipico e o mesmo time dando conta de um volume maior.",
  },
  {
    pergunta: "E se a IA responder alguma coisa errada para o cliente?",
    resposta:
      "A IA trabalha dentro das regras e dos dados do negocio. E definido junto com " +
      "o cliente o que ela pode resolver sozinha e o que precisa passar por uma " +
      "pessoa. Tudo fica registrado, entao qualquer resposta pode ser revisada e o " +
      "comportamento ajustado.",
  },
  {
    pergunta: "Meus dados ficam seguros?",
    resposta:
      "Sim. O trabalho usa controle de acesso por nivel de usuario, criptografia e " +
      "backup, e no inicio do projeto e definido quais dados a IA pode acessar. " +
      "Nada e usado para treinar modelo de terceiros sem autorizacao do cliente.",
  },
  {
    pergunta: "Funciona para o meu tipo de negocio?",
    resposta:
      "Se a operacao tem tarefa repetitiva, atendimento demorado ou informacao " +
      "espalhada em varios lugares, provavelmente sim. Ja foi aplicado em comercio, " +
      "servicos, educacao e logistica. O que muda e onde a IA entra, nao se ela entra.",
  },
  {
    pergunta: "Quanto custa colocar inteligencia artificial na empresa?",
    resposta:
      "Nao ha tabela fechada, porque o valor depende do que a operacao precisa. A " +
      "Skill Technology Work faz um diagnostico gratuito, apresenta escopo e valor " +
      "antes de qualquer compromisso, e o pagamento e dividido em etapas vinculadas " +
      "as entregas.",
  },
  {
    pergunta: "Voces dao suporte depois de entregar o projeto?",
    resposta:
      "Sim. Todo projeto inclui um periodo de suporte apos o lancamento, com " +
      "acompanhamento, correcoes e ajustes. Depois desse periodo o cliente pode " +
      "seguir com manutencao continua: monitoramento, atualizacoes de seguranca e " +
      "melhorias.",
  },
];

export default SITE;
