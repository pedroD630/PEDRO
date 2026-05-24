// ============================================================
// Seed data — Receitas (26 receitas do guia nutricional)
// ============================================================

export interface IngredientSeed {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeSeed {
  id: string;                // slug usado para UUID determinístico
  name: string;
  category: string;
  prep_time_min: number;
  calories: number;
  protein_g: number;
  cost_brl: number | null;
  ingredients: IngredientSeed[];
  steps: string[];           // texto de cada passo em ordem
  substitutions: string[] | null;
  calorie_tips: string[] | null;
}

export const RECIPES: RecipeSeed[] = [
  // ── Café da manhã ──────────────────────────────────────────
  {
    id: "vitamina_banana_aveia_leite",
    name: "Vitamina de Banana com Aveia e Leite Integral",
    category: "café da manhã",
    prep_time_min: 5,
    calories: 600,
    protein_g: 22,
    cost_brl: 3.00,
    ingredients: [
      { name: "Banana madura média",  amount: 2,  unit: "unidade" },
      { name: "Leite integral",       amount: 300, unit: "ml" },
      { name: "Aveia em flocos",      amount: 4,  unit: "colher_sopa" },
      { name: "Mel",                  amount: 1,  unit: "colher_sopa" },
      { name: "Pasta de amendoim",    amount: 1,  unit: "colher_sopa" },
    ],
    steps: [
      "Coloque as bananas cortadas no liquidificador.",
      "Adicione o leite, a aveia, o mel e a pasta de amendoim.",
      "Bata por 1 minuto até ficar homogêneo.",
      "Sirva imediatamente. Pode adicionar gelo se preferir gelado.",
    ],
    substitutions: [
      "Leite integral → leite de caixinha UHT (mais barato, mesmas calorias)",
      "Mel → açúcar refinado ou açúcar mascavo",
      "Pasta de amendoim → 1 colher de azeite (para calorias sem alterar muito o sabor)",
    ],
    calorie_tips: [
      "Adicionar 2 colheres de leite em pó integral para +100 kcal",
      "Misturar 1 colher de farinha láctea para mais espessura e calorias",
      "Usar 2 colheres de creme de avelã para tornar mais palatável e calórico",
    ],
  },
  {
    id: "pao_ovo_mexido_manteiga",
    name: "Pão com Ovo Mexido e Manteiga",
    category: "café da manhã",
    prep_time_min: 8,
    calories: 520,
    protein_g: 24,
    cost_brl: 2.50,
    ingredients: [
      { name: "Ovos inteiros",       amount: 3, unit: "unidade" },
      { name: "Pão de forma",        amount: 2, unit: "fatia" },
      { name: "Manteiga",            amount: 1, unit: "colher_sopa" },
      { name: "Sal",                 amount: 1, unit: "pitada" },
      { name: "Pimenta do reino",    amount: 1, unit: "pitada" },
      { name: "Queijo muçarela",     amount: 1, unit: "fatia" },
    ],
    steps: [
      "Quebre os ovos em uma tigela, bata com um garfo, tempere com sal e pimenta.",
      "Aqueça uma frigideira em fogo médio e derreta a manteiga.",
      "Despeje os ovos e mexa levemente com uma espátula até ficarem cremosos.",
      "Torre o pão e monte com os ovos. Adicione o queijo por cima enquanto ainda está quente.",
    ],
    substitutions: [
      "Manteiga → margarina",
      "Pão de forma → tapioca ou macarrão de arroz torrado",
      "Queijo muçarela → requeijão cremoso",
    ],
    calorie_tips: [
      "Adicionar um fio de azeite nos ovos antes de servir",
      "Usar 4 ovos para aumentar proteína e calorias",
      "Acrescentar uma fatia de presunto (+50 kcal e +5g de proteína)",
    ],
  },
  {
    id: "mingau_turbinado_aveia",
    name: "Mingau Turbinado de Aveia",
    category: "café da manhã",
    prep_time_min: 7,
    calories: 550,
    protein_g: 18,
    cost_brl: 2.00,
    ingredients: [
      { name: "Aveia em flocos",      amount: 5,   unit: "colher_sopa" },
      { name: "Leite integral",       amount: 300, unit: "ml" },
      { name: "Banana amassada",      amount: 1,   unit: "unidade" },
      { name: "Mel",                  amount: 1,   unit: "colher_sopa" },
      { name: "Leite em pó integral", amount: 1,   unit: "colher_sopa" },
      { name: "Canela em pó",         amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Misture a aveia com o leite em uma panela pequena.",
      "Leve ao fogo médio, mexendo sempre por 4 minutos até engrossar.",
      "Desligue, acrescente a banana amassada, o mel, o leite em pó e a canela.",
      "Misture bem e sirva quente.",
    ],
    substitutions: [
      "Aveia em flocos → farinha de aveia",
      "Leite integral → bebida de soja",
      "Banana → 2 colheres de sopa de doce de leite",
    ],
    calorie_tips: [
      "Adicionar 1 colher de pasta de amendoim para +90 kcal",
      "Misturar 1 ovo inteiro cru antes de cozinhar (o calor do mingau cozinha o ovo e aumenta a proteína)",
    ],
  },
  {
    id: "tapioca_doce_pasta_amendoim_banana",
    name: "Tapioca Doce com Pasta de Amendoim e Banana",
    category: "café da manhã",
    prep_time_min: 7,
    calories: 580,
    protein_g: 16,
    cost_brl: 3.00,
    ingredients: [
      { name: "Goma de tapioca hidratada", amount: 5, unit: "colher_sopa" },
      { name: "Pasta de amendoim",         amount: 2, unit: "colher_sopa" },
      { name: "Banana fatiada",            amount: 1, unit: "unidade" },
      { name: "Mel",                       amount: 1, unit: "colher_cha" },
      { name: "Canela em pó",              amount: 1, unit: "pitada" },
    ],
    steps: [
      "Aqueça uma frigideira antiaderente em fogo médio.",
      "Espalhe a goma formando um disco e espere 2 minutos até firmar.",
      "Espalhe a pasta de amendoim sobre a tapioca ainda na frigideira.",
      "Adicione as fatias de banana e um fio de mel.",
      "Polvilhe canela e sirva dobrada ao meio.",
    ],
    substitutions: [
      "Pasta de amendoim → requeijão cremoso com mel",
      "Banana → manga ou morango fatiado",
    ],
    calorie_tips: [
      "Adicionar 1 colher de leite condensado por cima (+80 kcal)",
      "Colocar granola sobre o recheio para textura e mais carboidrato",
    ],
  },
  {
    id: "sanduiche_natural_atum_maionese_ovo",
    name: "Sanduíche Natural de Atum com Maionese e Ovo",
    category: "café da manhã",
    prep_time_min: 8,
    calories: 610,
    protein_g: 38,
    cost_brl: 4.50,
    ingredients: [
      { name: "Atum em óleo escorrido",    amount: 1, unit: "lata" },
      { name: "Ovos cozidos",              amount: 2, unit: "unidade" },
      { name: "Maionese",                  amount: 2, unit: "colher_sopa" },
      { name: "Pão de forma",              amount: 2, unit: "fatia" },
      { name: "Alface ou tomate fatiado",  amount: 1, unit: "unidade" },
      { name: "Sal",                       amount: 1, unit: "pitada" },
      { name: "Pimenta do reino",          amount: 1, unit: "pitada" },
    ],
    steps: [
      "Amasse os ovos cozidos com um garfo.",
      "Misture com o atum escorrido e a maionese.",
      "Tempere com sal e pimenta.",
      "Monte no pão com a alface ou tomate.",
      "Embale em plástico filme para levar na mochila se precisar.",
    ],
    substitutions: [
      "Atum → frango desfiado temperado",
      "Maionese → requeijão cremoso",
      "Pão de forma → pão integral ou wrap",
    ],
    calorie_tips: [
      "Adicionar 1 fatia de queijo amarelo (+80 kcal)",
      "Passar azeite no pão antes de montar",
    ],
  },
  {
    id: "arroz_doce_rapido_leite_integral",
    name: "Arroz Doce Rápido com Leite Integral",
    category: "café da manhã",
    prep_time_min: 15,
    calories: 540,
    protein_g: 14,
    cost_brl: 2.50,
    ingredients: [
      { name: "Arroz branco cru",     amount: 1,   unit: "xícara" },
      { name: "Leite integral",       amount: 400, unit: "ml" },
      { name: "Açúcar",               amount: 2,   unit: "colher_sopa" },
      { name: "Leite em pó integral", amount: 1,   unit: "colher_sopa" },
      { name: "Canela em pó",         amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Cozinhe o arroz normalmente com 300ml de água até secar.",
      "Adicione o leite integral e o açúcar, misture bem.",
      "Cozinhe em fogo baixo por 5 minutos mexendo sempre até engrossar.",
      "Desligue, polvilhe leite em pó e canela por cima. Sirva quente.",
    ],
    substitutions: [
      "Açúcar → mel ou açúcar mascavo",
      "Leite integral → leite de caixinha UHT",
    ],
    calorie_tips: [
      "Adicionar 2 colheres de leite condensado no lugar do açúcar (+120 kcal)",
      "Servir com uma banana fatiada por cima",
    ],
  },

  // ── Lanche rápido ────────────────────────────────────────
  {
    id: "sanduiche_frango_requeijao",
    name: "Sanduíche de Frango com Requeijão",
    category: "lanche rápido",
    prep_time_min: 10,
    calories: 500,
    protein_g: 35,
    cost_brl: 4.00,
    ingredients: [
      { name: "Frango cozido desfiado",     amount: 100, unit: "g" },
      { name: "Pão de forma integral",      amount: 2,   unit: "fatia" },
      { name: "Requeijão cremoso",          amount: 2,   unit: "colher_sopa" },
      { name: "Alface ou tomate",           amount: 1,   unit: "unidade" },
      { name: "Sal",                        amount: 1,   unit: "pitada" },
      { name: "Azeite",                     amount: 1,   unit: "colher_cha" },
    ],
    steps: [
      "Cozinhe o frango com sal (ou use sobra). Desfie com dois garfos.",
      "Tempere o frango desfiado com um fio de azeite, sal e pimenta.",
      "Passe o requeijão nas duas fatias de pão.",
      "Monte o sanduíche com o frango e os vegetais. Sirva ou leve na marmita.",
    ],
    substitutions: [
      "Frango → atum em lata (mais rápido, sem cozinhar)",
      "Requeijão → cream cheese ou maionese",
      "Pão de forma → pão francês ou wrap",
    ],
    calorie_tips: [
      "Adicionar 1 fatia de queijo amarelo para +80 kcal",
      "Usar 150g de frango para mais proteína",
      "Acrescentar pasta de amendoim no pão para uma camada extra de calorias",
    ],
  },
  {
    id: "ovo_cozido_pao_azeite",
    name: "Ovo Cozido com Pão e Azeite",
    category: "lanche rápido",
    prep_time_min: 12,
    calories: 420,
    protein_g: 20,
    cost_brl: 1.80,
    ingredients: [
      { name: "Ovos",          amount: 3, unit: "unidade" },
      { name: "Pão de forma",  amount: 2, unit: "fatia" },
      { name: "Azeite",        amount: 1, unit: "colher_sopa" },
      { name: "Sal",           amount: 1, unit: "pitada" },
      { name: "Pimenta do reino", amount: 1, unit: "pitada" },
    ],
    steps: [
      "Coloque os ovos em água fervente por 8-10 minutos para cozimento firme.",
      "Retire, passe em água fria, descasque.",
      "Corte os ovos e regue com azeite. Tempere com sal e pimenta.",
      "Coma com o pão.",
    ],
    substitutions: [
      "Azeite → manteiga ou requeijão no pão",
      "Pão → batata cozida (mais calórico por peso)",
    ],
    calorie_tips: [
      "Adicionar uma fatia de presunto ou queijo para mais proteína e calorias",
    ],
  },
  {
    id: "tapioca_queijo_ovo",
    name: "Tapioca com Queijo e Ovo",
    category: "lanche rápido",
    prep_time_min: 8,
    calories: 480,
    protein_g: 25,
    cost_brl: 2.50,
    ingredients: [
      { name: "Goma de tapioca hidratada", amount: 4, unit: "colher_sopa" },
      { name: "Ovos mexidos",              amount: 2, unit: "unidade" },
      { name: "Queijo muçarela",           amount: 2, unit: "fatia" },
      { name: "Sal",                       amount: 1, unit: "pitada" },
    ],
    steps: [
      "Aqueça uma frigideira antiaderente em fogo médio.",
      "Espalhe a goma formando um disco e espere 2 minutos até firmar.",
      "Coloque o queijo no centro e adicione os ovos mexidos por cima.",
      "Dobre ao meio e sirva imediatamente.",
    ],
    substitutions: [
      "Queijo muçarela → requeijão cremoso",
      "Ovo mexido → frango desfiado com tempero",
    ],
    calorie_tips: [
      "Rechear com pasta de amendoim e banana fatiada para uma tapioca doce e calórica",
    ],
  },

  // ── Almoço ───────────────────────────────────────────────
  {
    id: "arroz_feijao_frango_grelhado",
    name: "Arroz com Feijão e Frango Grelhado",
    category: "almoço",
    prep_time_min: 25,
    calories: 750,
    protein_g: 55,
    cost_brl: 6.00,
    ingredients: [
      { name: "Peito de frango ou coxa desossada", amount: 150, unit: "g" },
      { name: "Arroz branco cru",                  amount: 1,   unit: "xícara" },
      { name: "Feijão carioca cozido",             amount: 1,   unit: "xícara" },
      { name: "Óleo",                              amount: 1,   unit: "colher_sopa" },
      { name: "Alho",                              amount: 2,   unit: "dente" },
      { name: "Sal",                               amount: 1,   unit: "pitada" },
      { name: "Pimenta do reino",                  amount: 1,   unit: "pitada" },
      { name: "Orégano",                           amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Cozinhe o arroz normalmente (2 xícaras de água para 1 de arroz).",
      "Tempere o frango com sal, alho, pimenta e orégano.",
      "Grelhe o frango na frigideira com fio de óleo, 5 minutos de cada lado.",
      "Aqueça o feijão (pode ser de lata ou cozido antecipadamente).",
      "Monte o prato com arroz, feijão e frango. Adicione um fio de azeite.",
    ],
    substitutions: [
      "Peito de frango → coxa/sobrecoxa (mais barata e mais calórica)",
      "Feijão carioca → feijão preto ou lentilha",
      "Arroz branco → macarrão (mais prático e barato)",
    ],
    calorie_tips: [
      "Adicionar 1 ovo frito por cima (+90 kcal, +6g proteína)",
      "Servir com farofa de manteiga (+100 kcal)",
      "Regar com azeite na hora de comer",
    ],
  },
  {
    id: "macarrao_atum_azeite",
    name: "Macarrão com Atum e Azeite",
    category: "almoço",
    prep_time_min: 15,
    calories: 680,
    protein_g: 45,
    cost_brl: 5.00,
    ingredients: [
      { name: "Macarrão espaguete ou parafuso", amount: 200, unit: "g" },
      { name: "Atum em óleo escorrido",         amount: 170, unit: "g" },
      { name: "Alho picado",                    amount: 2,   unit: "dente" },
      { name: "Azeite",                         amount: 2,   unit: "colher_sopa" },
      { name: "Sal",                            amount: 1,   unit: "pitada" },
      { name: "Pimenta do reino",               amount: 1,   unit: "pitada" },
      { name: "Orégano",                        amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Cozinhe o macarrão em água com sal conforme a embalagem.",
      "Em uma frigideira, refogue o alho no azeite por 1 minuto.",
      "Adicione o atum escorrido e misture bem.",
      "Escorra o macarrão e misture na frigideira com o atum.",
      "Tempere, finalize com mais azeite e sirva.",
    ],
    substitutions: [
      "Atum em óleo → atum em água (menos calórico, mas mais barato)",
      "Azeite → manteiga para sabor diferente",
    ],
    calorie_tips: [
      "Adicionar 1 ovo cozido fatiado por cima",
      "Misturar requeijão para um molho cremoso e calórico",
    ],
  },
  {
    id: "arroz_frito_ovo_legumes",
    name: "Arroz Frito com Ovo e Legumes",
    category: "almoço",
    prep_time_min: 10,
    calories: 620,
    protein_g: 22,
    cost_brl: 2.50,
    ingredients: [
      { name: "Arroz cozido (sobra)",     amount: 2,   unit: "xícara" },
      { name: "Ovos",                     amount: 2,   unit: "unidade" },
      { name: "Cenoura ralada",           amount: 0.5, unit: "unidade" },
      { name: "Óleo",                     amount: 2,   unit: "colher_sopa" },
      { name: "Shoyu (molho de soja)",    amount: 1,   unit: "colher_sopa" },
      { name: "Sal",                      amount: 1,   unit: "pitada" },
      { name: "Pimenta do reino",         amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Aqueça o óleo em frigideira grande ou wok.",
      "Frite o arroz mexendo sempre por 3 minutos.",
      "Afaste o arroz para o lado, quebre os ovos no centro e mexa.",
      "Misture tudo, adicione a cenoura ralada e o shoyu.",
      "Cozinhe mais 2 minutos mexendo. Sirva quente.",
    ],
    substitutions: [
      "Cenoura → qualquer verdura que tiver em casa",
      "Shoyu → sal comum",
    ],
    calorie_tips: [
      "Adicionar frango desfiado ou carne moída ao refogado",
      "Colocar mais 2 ovos para aumentar a proteína",
    ],
  },
  {
    id: "batata_doce_carne_moida",
    name: "Batata Doce com Carne Moída",
    category: "almoço",
    prep_time_min: 25,
    calories: 720,
    protein_g: 42,
    cost_brl: 7.00,
    ingredients: [
      { name: "Batata doce",         amount: 250, unit: "g" },
      { name: "Carne moída",         amount: 150, unit: "g" },
      { name: "Cebola pequena picada", amount: 1, unit: "unidade" },
      { name: "Alho",                amount: 2,   unit: "dente" },
      { name: "Óleo",                amount: 1,   unit: "colher_sopa" },
      { name: "Sal",                 amount: 1,   unit: "pitada" },
      { name: "Pimenta do reino",    amount: 1,   unit: "pitada" },
      { name: "Cominho",             amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Cozinhe a batata doce na água com sal por 15-20 minutos ou micro-ondas por 7 minutos.",
      "Refogue a cebola e o alho no óleo.",
      "Adicione a carne moída e mexa até dourar.",
      "Tempere com sal, pimenta e cominho.",
      "Sirva a carne sobre a batata amassada com um fio de azeite.",
    ],
    substitutions: [
      "Batata doce → batata inglesa (mais barata)",
      "Carne moída → frango moído ou ovo mexido",
    ],
    calorie_tips: [
      "Adicionar 1 colher de manteiga na batata amassada (+80 kcal)",
      "Colocar queijo ralado por cima",
    ],
  },

  // ── Pré-treino ───────────────────────────────────────────
  {
    id: "banana_pasta_amendoim_mel_pretreino",
    name: "Banana com Pasta de Amendoim e Mel",
    category: "pré-treino",
    prep_time_min: 2,
    calories: 380,
    protein_g: 8,
    cost_brl: 2.50,
    ingredients: [
      { name: "Banana média",      amount: 2, unit: "unidade" },
      { name: "Pasta de amendoim", amount: 2, unit: "colher_sopa" },
      { name: "Mel",               amount: 1, unit: "colher_cha" },
    ],
    steps: [
      "Abra as bananas.",
      "Passe a pasta de amendoim sobre elas.",
      "Regue com mel.",
      "Coma 30-40 minutos antes do treino.",
    ],
    substitutions: [
      "Pasta de amendoim → amendoim triturado com sal",
      "Mel → açúcar refinado dissolvido em água",
    ],
    calorie_tips: [
      "Adicionar 2 bolachas de arroz para mais carboidrato",
      "Misturar uma colher de leite em pó por cima",
    ],
  },
  {
    id: "batata_cozida_sal_azeite_pretreino",
    name: "Batata Cozida com Sal e Azeite",
    category: "pré-treino",
    prep_time_min: 20,
    calories: 320,
    protein_g: 5,
    cost_brl: 1.50,
    ingredients: [
      { name: "Batata inglesa", amount: 300, unit: "g" },
      { name: "Azeite",         amount: 1,   unit: "colher_sopa" },
      { name: "Sal grosso",     amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Cozinhe as batatas na água por 20 minutos até ficarem macias.",
      "Escorra, corte ao meio.",
      "Regue com azeite e salpique sal grosso.",
      "Consuma 45 minutos antes do treino.",
    ],
    substitutions: [
      "Batata inglesa → batata doce (mais nutritiva)",
      "Azeite → manteiga",
    ],
    calorie_tips: [
      "Adicionar um copo de suco de laranja para repor eletrólitos e mais carboidrato",
    ],
  },

  // ── Pós-treino ───────────────────────────────────────────
  {
    id: "omelete_4_ovos_queijo",
    name: "Omelete de 4 Ovos com Queijo",
    category: "pós-treino",
    prep_time_min: 8,
    calories: 520,
    protein_g: 36,
    cost_brl: 3.50,
    ingredients: [
      { name: "Ovos inteiros",    amount: 4, unit: "unidade" },
      { name: "Queijo muçarela",  amount: 2, unit: "fatia" },
      { name: "Manteiga",         amount: 1, unit: "colher_sopa" },
      { name: "Sal",              amount: 1, unit: "pitada" },
      { name: "Pimenta do reino", amount: 1, unit: "pitada" },
      { name: "Orégano",          amount: 1, unit: "pitada" },
    ],
    steps: [
      "Bata os ovos com sal, pimenta e orégano.",
      "Derreta a manteiga na frigideira em fogo médio.",
      "Despeje os ovos e deixe firmar nas bordas por 2 minutos.",
      "Coloque o queijo no centro, dobre a omelete ao meio.",
      "Tampe por 1 minuto para o queijo derreter. Sirva.",
    ],
    substitutions: [
      "Queijo muçarela → requeijão ou queijo coalho",
      "Manteiga → óleo de coco ou azeite",
    ],
    calorie_tips: [
      "Adicionar 100g de frango desfiado dentro para uma refeição completa",
      "Comer com 2 fatias de pão para adicionar carboidrato pós-treino",
    ],
  },
  {
    id: "arroz_feijao_ovo_atum_postreino",
    name: "Arroz com Feijão, Ovo e Atum",
    category: "pós-treino",
    prep_time_min: 10,
    calories: 700,
    protein_g: 50,
    cost_brl: 5.50,
    ingredients: [
      { name: "Arroz cozido",    amount: 1.5, unit: "xícara" },
      { name: "Feijão cozido",   amount: 1,   unit: "xícara" },
      { name: "Atum em lata",    amount: 170, unit: "g" },
      { name: "Ovos mexidos",    amount: 2,   unit: "unidade" },
      { name: "Azeite",          amount: 1,   unit: "colher_sopa" },
      { name: "Sal",             amount: 1,   unit: "pitada" },
      { name: "Pimenta do reino", amount: 1,  unit: "pitada" },
    ],
    steps: [
      "Aqueça o arroz e o feijão.",
      "Faça os ovos mexidos em frigideira com fio de azeite.",
      "Monte o prato: arroz, feijão, atum escorrido e ovos por cima.",
      "Finalize com azeite e coma logo após o treino.",
    ],
    substitutions: [
      "Atum → sardinha em lata (mais barata)",
      "Ovos mexidos → ovo cozido fatiado",
    ],
    calorie_tips: [
      "Adicionar uma banana de sobremesa para carboidrato simples pós-treino",
    ],
  },

  // ── Jantar ───────────────────────────────────────────────
  {
    id: "frango_refogado_batata_legumes",
    name: "Frango Refogado com Batata e Legumes",
    category: "jantar",
    prep_time_min: 25,
    calories: 680,
    protein_g: 48,
    cost_brl: 7.50,
    ingredients: [
      { name: "Coxa ou sobrecoxa desossada", amount: 150, unit: "g" },
      { name: "Batata inglesa em cubos",     amount: 200, unit: "g" },
      { name: "Abobrinha fatiada",           amount: 0.5, unit: "unidade" },
      { name: "Alho",                        amount: 2,   unit: "dente" },
      { name: "Azeite",                      amount: 2,   unit: "colher_sopa" },
      { name: "Sal",                         amount: 1,   unit: "pitada" },
      { name: "Pimenta do reino",            amount: 1,   unit: "pitada" },
      { name: "Colorau",                     amount: 1,   unit: "pitada" },
      { name: "Orégano",                     amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Tempere o frango com sal, alho, pimenta e colorau.",
      "Aqueça o azeite em frigideira funda ou panela.",
      "Sele o frango até dourar de ambos os lados.",
      "Adicione a batata e 100ml de água. Tampe e cozinhe 12 minutos.",
      "Adicione a abobrinha, misture e cozinhe mais 5 minutos destampado.",
    ],
    substitutions: [
      "Frango → carne bovina em cubos",
      "Batata → mandioca (mais calórica e saborosa)",
    ],
    calorie_tips: [
      "Servir com arroz e regar tudo com o caldinho formado na panela",
    ],
  },
  {
    id: "macarrao_bolonhesa_simples",
    name: "Macarrão com Molho Bolonhesa Simples",
    category: "jantar",
    prep_time_min: 30,
    calories: 780,
    protein_g: 45,
    cost_brl: 8.00,
    ingredients: [
      { name: "Macarrão espaguete", amount: 200, unit: "g" },
      { name: "Carne moída",        amount: 150, unit: "g" },
      { name: "Polpa de tomate",    amount: 200, unit: "g" },
      { name: "Cebola",             amount: 1,   unit: "unidade" },
      { name: "Alho",               amount: 2,   unit: "dente" },
      { name: "Óleo",               amount: 1,   unit: "colher_sopa" },
      { name: "Sal",                amount: 1,   unit: "pitada" },
      { name: "Pimenta do reino",   amount: 1,   unit: "pitada" },
      { name: "Orégano",            amount: 1,   unit: "pitada" },
      { name: "Louro",              amount: 1,   unit: "folha" },
    ],
    steps: [
      "Cozinhe o macarrão em água com sal.",
      "Refogue cebola e alho no óleo.",
      "Adicione a carne moída e frite até dourar.",
      "Acrescente a polpa de tomate, temperos e 50ml de água.",
      "Cozinhe o molho 10 minutos em fogo baixo.",
      "Misture ao macarrão e sirva com queijo ralado.",
    ],
    substitutions: [
      "Carne moída → frango moído",
      "Polpa de tomate → extrato de tomate diluído em água",
    ],
    calorie_tips: [
      "Adicionar 1 ovo cozido fatiado por cima",
      "Misturar 2 colheres de requeijão ao molho para mais calorias",
    ],
  },

  // ── Ceia ─────────────────────────────────────────────────
  {
    id: "vitamina_manga_leite_po",
    name: "Vitamina de Manga com Leite em Pó",
    category: "ceia",
    prep_time_min: 5,
    calories: 560,
    protein_g: 18,
    cost_brl: 3.00,
    ingredients: [
      { name: "Manga madura grande",  amount: 1,   unit: "unidade" },
      { name: "Leite integral",       amount: 250, unit: "ml" },
      { name: "Leite em pó integral", amount: 3,   unit: "colher_sopa" },
      { name: "Mel",                  amount: 1,   unit: "colher_sopa" },
    ],
    steps: [
      "Descasque e corte a manga.",
      "Bata tudo no liquidificador por 1 minuto.",
      "Sirva gelado.",
    ],
    substitutions: [
      "Manga → mamão, abacaxi ou qualquer fruta madura disponível",
      "Mel → açúcar",
    ],
    calorie_tips: [
      "Adicionar pasta de amendoim para aumentar as calorias sem alterar o sabor da fruta",
    ],
  },
  {
    id: "iogurte_granola_mel",
    name: "Iogurte com Granola e Mel",
    category: "ceia",
    prep_time_min: 3,
    calories: 420,
    protein_g: 18,
    cost_brl: 4.00,
    ingredients: [
      { name: "Iogurte grego integral", amount: 200, unit: "g" },
      { name: "Granola",                amount: 4,   unit: "colher_sopa" },
      { name: "Mel",                    amount: 1,   unit: "colher_sopa" },
      { name: "Banana fatiada",         amount: 1,   unit: "unidade" },
    ],
    steps: [
      "Coloque o iogurte em uma tigela.",
      "Adicione a granola, o mel e a banana.",
      "Misture levemente e sirva.",
    ],
    substitutions: [
      "Iogurte grego → iogurte integral comum (mais barato)",
      "Granola → aveia com mel e canela",
    ],
    calorie_tips: [
      "Adicionar 2 colheres de pasta de amendoim para dobrar as calorias",
    ],
  },

  // ── Vitaminas hipercalóricas ──────────────────────────────
  {
    id: "hipercalorico_caseiro_banana_amendoim",
    name: "Hipercalórico Caseiro de Banana com Amendoim",
    category: "vitaminas hipercalóricas",
    prep_time_min: 5,
    calories: 750,
    protein_g: 28,
    cost_brl: 4.00,
    ingredients: [
      { name: "Banana congelada",     amount: 2,   unit: "unidade" },
      { name: "Leite integral",       amount: 300, unit: "ml" },
      { name: "Pasta de amendoim",    amount: 3,   unit: "colher_sopa" },
      { name: "Leite em pó integral", amount: 2,   unit: "colher_sopa" },
      { name: "Mel",                  amount: 1,   unit: "colher_sopa" },
      { name: "Aveia em flocos",      amount: 1,   unit: "colher_sopa" },
    ],
    steps: [
      "Coloque todos os ingredientes no liquidificador.",
      "Bata por 1-2 minutos até ficar cremoso.",
      "Tome logo após acordar ou entre refeições.",
    ],
    substitutions: [
      "Pasta de amendoim → 50g de amendoim torrado e salgado triturado",
      "Mel → açúcar mascavo",
    ],
    calorie_tips: [
      "Adicionar 1 ovo inteiro cru (o leite e a banana mascaram o sabor)",
      "Misturar 2 colheres de cacau em pó para sabor de chocolate",
    ],
  },
  {
    id: "shake_chocolate_leite_aveia",
    name: "Shake de Chocolate com Leite e Aveia",
    category: "vitaminas hipercalóricas",
    prep_time_min: 5,
    calories: 680,
    protein_g: 25,
    cost_brl: 3.50,
    ingredients: [
      { name: "Leite integral",       amount: 350, unit: "ml" },
      { name: "Aveia em flocos",      amount: 4,   unit: "colher_sopa" },
      { name: "Cacau em pó",          amount: 2,   unit: "colher_sopa" },
      { name: "Mel",                  amount: 1,   unit: "colher_sopa" },
      { name: "Leite em pó integral", amount: 2,   unit: "colher_sopa" },
      { name: "Banana",               amount: 1,   unit: "unidade" },
    ],
    steps: [
      "Bata todos os ingredientes no liquidificador por 1 minuto.",
      "Se quiser mais grosso, adicione mais aveia.",
      "Consuma como ceia ou lanche da tarde.",
    ],
    substitutions: [
      "Cacau → Nescau ou Toddy (mais doce e mais calórico)",
      "Leite → iogurte natural (mais proteína)",
    ],
    calorie_tips: [
      "Adicionar pasta de amendoim para sabor de Ferrero Rocher e +90 kcal",
    ],
  },

  // ── Lanche noturno ───────────────────────────────────────
  {
    id: "batata_doce_assada_pasta_amendoim_mel",
    name: "Batata Doce Assada com Pasta de Amendoim e Mel",
    category: "lanche noturno",
    prep_time_min: 25,
    calories: 520,
    protein_g: 14,
    cost_brl: 3.50,
    ingredients: [
      { name: "Batata doce média",  amount: 250, unit: "g" },
      { name: "Pasta de amendoim",  amount: 2,   unit: "colher_sopa" },
      { name: "Mel",                amount: 1,   unit: "colher_cha" },
      { name: "Canela em pó",       amount: 1,   unit: "pitada" },
    ],
    steps: [
      "Fure a batata doce com um garfo em vários pontos.",
      "Leve ao micro-ondas por 7 a 9 minutos, virando na metade. Ou ao forno a 200°C por 25 minutos.",
      "Corte ao meio e espalhe a pasta de amendoim sobre a polpa quente.",
      "Regue com mel e polvilhe canela. Coma diretamente da casca.",
    ],
    substitutions: [
      "Pasta de amendoim → manteiga com mel",
      "Batata doce → batata inglesa cozida",
    ],
    calorie_tips: [
      "Adicionar 1 colher de leite condensado por cima (+60 kcal)",
      "Servir com um copo de leite integral (+120 kcal)",
    ],
  },
  {
    id: "wrap_ovo_mexido_queijo_presunto",
    name: "Wrap de Ovo Mexido com Queijo e Presunto",
    category: "lanche noturno",
    prep_time_min: 9,
    calories: 560,
    protein_g: 32,
    cost_brl: 4.00,
    ingredients: [
      { name: "Tortilha de trigo",  amount: 1, unit: "unidade" },
      { name: "Ovos mexidos",       amount: 3, unit: "unidade" },
      { name: "Presunto",           amount: 2, unit: "fatia" },
      { name: "Queijo muçarela",    amount: 2, unit: "fatia" },
      { name: "Sal",                amount: 1, unit: "pitada" },
      { name: "Pimenta do reino",   amount: 1, unit: "pitada" },
      { name: "Orégano",            amount: 1, unit: "pitada" },
      { name: "Manteiga",           amount: 1, unit: "colher_cha" },
    ],
    steps: [
      "Faça os ovos mexidos com manteiga, sal, pimenta e orégano.",
      "Aqueça a tortilha por 30 segundos no micro-ondas ou na frigideira.",
      "Monte: tortilha, queijo, presunto, ovos mexidos.",
      "Enrole com firmeza e coma quente.",
    ],
    substitutions: [
      "Tortilha → pão de forma ou tapioca",
      "Presunto → frango desfiado ou atum",
    ],
    calorie_tips: [
      "Adicionar requeijão cremoso na tortilha antes de montar (+60 kcal)",
      "Usar 4 ovos para mais proteína e volume",
    ],
  },
  {
    id: "vitamina_noturna_amendoim_cacau_banana",
    name: "Vitamina Noturna de Amendoim com Cacau e Banana",
    category: "lanche noturno",
    prep_time_min: 5,
    calories: 620,
    protein_g: 22,
    cost_brl: 3.50,
    ingredients: [
      { name: "Banana madura",              amount: 1,   unit: "unidade" },
      { name: "Leite integral",             amount: 300, unit: "ml" },
      { name: "Pasta de amendoim",          amount: 2,   unit: "colher_sopa" },
      { name: "Cacau em pó ou achocolatado", amount: 1,  unit: "colher_sopa" },
      { name: "Leite em pó integral",       amount: 2,   unit: "colher_sopa" },
      { name: "Mel",                        amount: 1,   unit: "colher_cha" },
    ],
    steps: [
      "Bata todos os ingredientes no liquidificador por 1 minuto.",
      "Se quiser mais espesso, adicione mais uma colher de aveia.",
      "Tome devagar — mastigar e digerir devagar ajuda a não sentir pesado antes de dormir.",
    ],
    substitutions: [
      "Cacau → Nescau, Toddy ou achocolatado em pó",
      "Pasta de amendoim → 50g de amendoim torrado triturado",
    ],
    calorie_tips: [
      "Adicionar 1 colher de azeite de oliva — não muda o sabor mas soma +120 kcal",
      "Usar 400ml de leite no lugar de 300ml",
    ],
  },
];
