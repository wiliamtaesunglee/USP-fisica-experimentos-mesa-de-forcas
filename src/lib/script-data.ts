// ========================================
// ROTEIRO COMPLETO — MAPEADO AOS SLIDES
// ========================================

export interface ScriptScene {
  slideId: string;
  slideLabel: string;
  act: number;
  actTitle: string;
  actColor: string;
  sceneNumber: number;
  sceneTitle: string;
  speech: string[];
  highlights: string[];
  notes: string[];
  timing?: string;
}

export const SCRIPT: ScriptScene[] = [
  // =============================================
  // ATO 1 — FUNDAMENTOS (0:00 → 3:30)
  // =============================================
  {
    slideId: "introducao",
    slideLabel: "Introdução",
    act: 1,
    actTitle: "Fundamentos",
    actColor: "#3b82f6",
    sceneNumber: 1,
    sceneTitle: "Abertura",
    speech: [
      "Bom, o experimento que realizamos está inserido no estudo da estática, que é a área da física responsável por analisar sistemas em equilíbrio.",
      "(pausa curta)",
      "Quando falamos em equilíbrio, estamos nos referindo a situações em que não há aceleração.",
      "(olhar para o público)",
      "Ou seja, o sistema permanece em repouso ou em movimento constante.",
    ],
    highlights: ["não há aceleração"],
    notes: [
      "Isso vem da Primeira Lei de Newton",
      "Equilíbrio = força resultante igual a zero",
      'Se perguntarem: "Qual lei?" → Primeira Lei de Newton',
    ],
    timing: "0:00 → 0:40",
  },
  {
    slideId: "introducao",
    slideLabel: "Introdução",
    act: 1,
    actTitle: "Fundamentos",
    actColor: "#3b82f6",
    sceneNumber: 2,
    sceneTitle: "Conceito Central",
    speech: [
      "Agora, é muito importante entender um ponto fundamental:",
      "(pausa dramática)",
      "Equilíbrio não significa ausência de forças.",
      "(olhar para o slide)",
      "Na verdade, o que acontece é que as forças estão se cancelando entre si.",
    ],
    highlights: [
      "Equilíbrio não significa ausência de forças",
      "cancelamento entre si",
    ],
    notes: [
      "Isso é soma vetorial",
      "Forças podem existir → mas se anulam",
      "Exemplo mental: puxar para direita e esquerda com mesma intensidade",
    ],
    timing: "0:40 → 1:20",
  },
  {
    slideId: "instrumentos",
    slideLabel: "Instrumentos",
    act: 1,
    actTitle: "Fundamentos",
    actColor: "#3b82f6",
    sceneNumber: 3,
    sceneTitle: "Instrumentos e Incertezas",
    speech: [
      "Para realizar este experimento, utilizamos instrumentos específicos de medição.",
      "O transferidor da mesa de forças, com incerteza de ± 0,5 graus, foi usado para medir os ângulos.",
      "A balança, com incerteza de ± 0,1 grama, nos deu as massas diretas dos corpos.",
      "E a própria mesa de forças, que possui atrito nas polias — um fator que não podemos ignorar.",
    ],
    highlights: ["± 0,5 graus", "± 0,1 grama", "atrito nas polias"],
    notes: [
      "Conhecer as incertezas é essencial para avaliar a confiabilidade",
      "Essas incertezas propagam-se para o resultado final",
      "Se perguntarem sobre propagação de incertezas: explicar que pequenos erros se acumulam",
    ],
    timing: "1:20 → 2:00",
  },
  {
    slideId: "objetivo",
    slideLabel: "Objetivo e Equações",
    act: 1,
    actTitle: "Fundamentos",
    actColor: "#3b82f6",
    sceneNumber: 4,
    sceneTitle: "Equações e Objetivo",
    speech: [
      "Como o experimento ocorre em duas dimensões, precisamos analisar separadamente as componentes das forças.",
      "ΣFx = 0 e ΣFy = 0",
      "Essas equações garantem que não há movimento nem na horizontal nem na vertical.",
      "(pausa)",
      "Outro ponto essencial é que força é uma grandeza vetorial.",
      "(gesto com a mão — direção)",
      "Isso significa que ela depende de três fatores: intensidade, direção e sentido.",
      "(pausa)",
      "Então, não basta que as forças tenham o mesmo valor — elas precisam estar organizadas corretamente no espaço.",
      "(pausa)",
      "O nosso objetivo foi: a partir de uma massa conhecida — a laranja, de 571,8 gramas — e dos ângulos de equilíbrio, calcular as massas dos outros dois corpos.",
    ],
    highlights: [
      "organizadas no espaço",
      "igualdade de massa ≠ equilíbrio",
      "571,8 gramas",
    ],
    notes: [
      'Se esquecer fórmula: fale "horizontal e vertical" — isso resolve qualquer travamento',
      "Isso é o motivo do experimento existir",
      "Direção muda tudo",
      "Limitações: modelo ideal ignora atrito, leitura angular tem precisão limitada",
    ],
    timing: "2:00 → 3:30",
  },

  // =============================================
  // ATO 2 — EXECUÇÃO (3:30 → 7:30)
  // =============================================
  {
    slideId: "procedimento",
    slideLabel: "Procedimento",
    act: 2,
    actTitle: "Execução",
    actColor: "#10b981",
    sceneNumber: 5,
    sceneTitle: "Montagem",
    speech: [
      "O experimento foi realizado utilizando uma mesa de forças.",
      "Essa mesa possui polias distribuídas ao redor de um ponto central, onde um anel é mantido por fios.",
      "Cada fio está ligado a uma massa, que gera uma força de tração.",
      "(pausa)",
      "Como essas forças atuam em ângulos diferentes, foi necessário decompor cada uma delas em componentes.",
      "Fx = F cos(θ) e Fy = F sin(θ)",
      "Essa decomposição permite analisar o efeito de cada força separadamente em cada direção.",
    ],
    highlights: ["força de tração", "decompor em componentes"],
    notes: [
      "força = peso da massa",
      "direção = ângulo do fio",
      "sistema = ponto central",
      "cos → eixo horizontal, sin → eixo vertical",
      'Se perguntarem "por que cos?" → projeção no eixo x',
    ],
    timing: "3:30 → 5:00",
  },
  {
    slideId: "procedimento",
    slideLabel: "Procedimento",
    act: 2,
    actTitle: "Execução",
    actColor: "#10b981",
    sceneNumber: 6,
    sceneTitle: "Procedimento",
    speech: [
      "O procedimento consistiu em fixar as três massas e ajustar os ângulos até que o sistema permanecesse em equilíbrio.",
      "Esse equilíbrio era identificado quando o anel central permanecia praticamente imóvel.",
    ],
    highlights: ["ajustar os ângulos", "anel central imóvel"],
    notes: [
      "equilíbrio visual ≠ perfeito",
      "mas suficiente para análise",
      "Massas fixas, ângulos variáveis — esse é o método",
    ],
    timing: "5:00 → 5:30",
  },
  {
    slideId: "dados",
    slideLabel: "Dados",
    act: 2,
    actTitle: "Execução",
    actColor: "#10b981",
    sceneNumber: 7,
    sceneTitle: "Dados Coletados",
    speech: [
      "Foram realizadas 15 medições, variando os ângulos e observando o comportamento do sistema.",
      "Em cada medição, registramos:",
      "— as massas",
      "— os ângulos",
      "— as componentes de tração",
      "— e os valores calculados a partir da massa de referência",
    ],
    highlights: ["15 medições"],
    notes: [
      "Isso mostra método científico: repetição, variação controlada, coleta de dados",
      "A massa de referência (laranja = 571,8g) era fixa em 0°",
    ],
    timing: "5:30 → 6:15",
  },
  {
    slideId: "dificuldades",
    slideLabel: "Dificuldades",
    act: 2,
    actTitle: "Execução",
    actColor: "#10b981",
    sceneNumber: 8,
    sceneTitle: "Dificuldades",
    speech: [
      "Durante o experimento, percebemos que o sistema é bastante sensível.",
      "(pausa)",
      "Pequenas variações nos ângulos geram mudanças significativas nas forças.",
      "Além disso, fatores como atrito nas polias e oscilações do sistema dificultam o equilíbrio perfeito.",
    ],
    highlights: ["sistema sensível"],
    notes: [
      "Isso explica o erro experimental",
      "Sistema real ≠ ideal",
      "Isso é esperado em física",
      "Mostra pensamento crítico — MUITO valorizado",
    ],
    timing: "6:15 → 7:30",
  },

  // =============================================
  // ATO 3 — ANÁLISE (7:30 → 10:00)
  // =============================================
  {
    slideId: "relacoes",
    slideLabel: "Relações Físicas",
    act: 3,
    actTitle: "Análise",
    actColor: "#f59e0b",
    sceneNumber: 9,
    sceneTitle: "Introdução dos Resultados",
    speech: [
      "Após a coleta dos dados, realizamos uma comparação entre os valores medidos diretamente na balança e os valores calculados a partir dos ângulos de equilíbrio.",
      "Os dados comprovam três relações fundamentais:",
      "Primeiro: o equilíbrio é vetorial, não escalar — não basta igualar intensidades.",
      "Segundo: os ângulos determinam a distribuição de forças.",
      "Terceiro: conhecendo apenas uma massa de referência, podemos calcular todas as outras.",
    ],
    highlights: [
      "equilíbrio é vetorial",
      "uma massa → todas as outras",
    ],
    notes: [
      "Aqui é o momento de conectar teoria com dados",
      "Falar com convicção — esses são os resultados reais",
    ],
    timing: "7:30 → 8:15",
  },
  {
    slideId: "resultados",
    slideLabel: "Resultados",
    act: 3,
    actTitle: "Análise",
    actColor: "#f59e0b",
    sceneNumber: 10,
    sceneTitle: "Dados e Interpretação",
    speech: [
      "Os resultados médios obtidos foram:",
      "(falar devagar)",
      "Vermelho: 418,4 gramas — erro de aproximadamente 0,71%",
      "Azul: 336,3 gramas — erro de aproximadamente 1,00%",
      "Laranja: 569,5 gramas — erro de aproximadamente menos 0,40%",
      "(pausa)",
      "Esses resultados mostram que o experimento apresentou uma boa precisão.",
      "Os erros são pequenos, o que indica que o modelo teórico descreve bem o comportamento do sistema.",
    ],
    highlights: [
      "erro ≈ 0,71%",
      "erro ≈ 1,00%",
      "erro ≈ -0,40%",
      "boa precisão",
    ],
    notes: [
      "NÃO correr aqui — isso aumenta tempo e clareza",
      "Erro pequeno = valida modelo",
      "Isso é o objetivo do experimento",
      "Comparação: medição indireta (calculada) vs direta (balança)",
    ],
    timing: "8:15 → 9:15",
  },
  {
    slideId: "conclusao",
    slideLabel: "Conclusão",
    act: 3,
    actTitle: "Análise",
    actColor: "#f59e0b",
    sceneNumber: 11,
    sceneTitle: "Limitações e Conclusão Final",
    speech: [
      "Por outro lado, as pequenas diferenças observadas mostram que o modelo ideal não captura completamente o sistema real.",
      "Isso ocorre devido a fatores como atrito, alinhamento e imprecisão nas medições.",
      "(pausa longa)",
      "Como conclusão, podemos afirmar que o experimento valida o conceito de equilíbrio estático.",
      "(pausa)",
      "O equilíbrio não é ausência de forças…",
      "(pausa dramática)",
      "…mas o resultado do cancelamento vetorial entre elas.",
    ],
    highlights: [
      "modelo ideal não captura completamente o sistema real",
      "O equilíbrio não é ausência de forças",
      "cancelamento vetorial",
    ],
    notes: [
      "Mostrar pensamento crítico — MUITO valorizado pela banca",
      "Falar DEVAGAR na conclusão final",
      "Essa frase final é a mais importante — ensaiar bastante",
      "Conhecendo uma única massa e os ângulos de equilíbrio, determinamos as demais — a geometria revela as forças.",
    ],
    timing: "9:15 → 10:00",
  },
];

// Mapeamento: qual apresentador fala em cada ato
// (definido pela equipe — independe da ordem da capa)
export const ACT_PRESENTERS = {
  1: "Caio",
  2: "Giovani",
  3: "Wiliam",
} as const;

// Resumo de timing
export const TIMING_SUMMARY = [
  { act: "Ato 1 — Fundamentos", time: "0:00 → 3:30", duration: "~3:30" },
  { act: "Ato 2 — Execução", time: "3:30 → 7:30", duration: "~4:00" },
  { act: "Ato 3 — Análise", time: "7:30 → 10:00", duration: "~2:30" },
] as const;
