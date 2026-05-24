export type Ingredient = { name: string; amount: string; unit: string };
export type Step = { order: number; text: string };

export interface Recipe {
  name: string;
  category: string;
  prep_time_min: number;
  calories: number;
  protein_g: number;
  cost_brl: number;
  ingredients: Ingredient[];
  steps: Step[];
  substitutions?: string[];
  calorie_tips?: string[];
}

export const CATEGORIES = [
  "Café da manhã",
  "Lanche rápido",
  "Almoço",
  "Pré-treino",
  "Pós-treino",
  "Jantar",
  "Lanche noturno",
  "Ceia",
  "Vitaminas hipercalóricas",
] as const;

// Seed data — receitas do ebook v2
// Substitua pelos dados completos após extrair do ebook
export const RECEITAS_SEED: Recipe[] = [
  {
    name: "Vitamina Hipercalórica Clássica",
    category: "Vitaminas hipercalóricas",
    prep_time_min: 5,
    calories: 520,
    protein_g: 38,
    cost_brl: 8,
    ingredients: [
      { name: "Leite integral", amount: "250", unit: "ml" },
      { name: "Banana", amount: "1", unit: "unidade" },
      { name: "Aveia", amount: "2", unit: "col sopa" },
      { name: "Whey protein", amount: "30", unit: "g" },
      { name: "Pasta de amendoim", amount: "1", unit: "col sopa" },
    ],
    steps: [
      { order: 1, text: "Coloque todos os ingredientes no liquidificador." },
      { order: 2, text: "Bata por 1 minuto até ficar homogêneo." },
      { order: 3, text: "Sirva imediatamente." },
    ],
    substitutions: ["Leite pode ser substituído por leite vegetal", "Whey pode ser substituído por proteína de ervilha"],
    calorie_tips: ["Adicione mais 1 col sopa de pasta de amendoim para +100 kcal", "Use 2 bananas para mais carboidratos"],
  },
  {
    name: "Omelete Proteico",
    category: "Café da manhã",
    prep_time_min: 10,
    calories: 380,
    protein_g: 28,
    cost_brl: 5,
    ingredients: [
      { name: "Ovos", amount: "3", unit: "unidades" },
      { name: "Queijo cottage", amount: "2", unit: "col sopa" },
      { name: "Sal e pimenta", amount: "a gosto", unit: "" },
      { name: "Azeite", amount: "1", unit: "fio" },
    ],
    steps: [
      { order: 1, text: "Bata os ovos com cottage, sal e pimenta." },
      { order: 2, text: "Aqueça a frigideira com azeite em fogo médio." },
      { order: 3, text: "Despeje a mistura e cozinhe até firmar." },
      { order: 4, text: "Dobre ao meio e sirva." },
    ],
    substitutions: ["Cottage pode ser substituído por ricota"],
    calorie_tips: ["Adicione queijo minas para mais calorias"],
  },
  // Adicione as demais 21 receitas do ebook aqui...
];
