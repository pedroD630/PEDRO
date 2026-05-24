export type ExerciseType = "weight" | "calisthenics" | "timed";

export interface ExerciseSeed {
  name: string;
  target_muscles: string;
  sets: number;
  reps_min?: number;
  reps_max?: number;
  duration_seconds?: number;
  rest_seconds: number;
  exercise_type: ExerciseType;
  difficulty_options?: string[];
  notes?: string;
  order_index: number;
}

export interface VariationSeed {
  name: string;
  slot_name: string;
  estimated_duration_min: number;
  exercises: ExerciseSeed[];
}

export interface RoutineSeed {
  name: string;
  description: string;
  // day_of_week: 0=Dom, 1=Seg, ..., 6=Sáb
  schedule: Array<{ day: number; slot_name: string }>;
  variations: VariationSeed[];
}

// Seed data — planilhas de treino do PDF
export const ROTINAS_SEED: RoutineSeed[] = [
  {
    name: "Push/Pull/Legs 30min",
    description: "Treino de força 5x por semana com Full Body no sábado e Cardio no domingo",
    schedule: [
      { day: 1, slot_name: "PUSH" },
      { day: 2, slot_name: "PULL" },
      { day: 3, slot_name: "REST" },
      { day: 4, slot_name: "LEGS" },
      { day: 5, slot_name: "PUSH" },
      { day: 6, slot_name: "FULL_BODY" },
      { day: 0, slot_name: "CARDIO" },
    ],
    variations: [
      {
        name: "Push Calistenia 30min",
        slot_name: "PUSH",
        estimated_duration_min: 30,
        exercises: [
          {
            name: "Flexão de braço",
            target_muscles: "Peitoral, Tríceps, Ombros",
            sets: 3, reps_min: 10, reps_max: 15,
            rest_seconds: 60,
            exercise_type: "calisthenics",
            difficulty_options: ["Joelhos", "Normal", "Declinada"],
            order_index: 0,
          },
          {
            name: "Flexão declinada",
            target_muscles: "Peitoral superior, Tríceps",
            sets: 3, reps_min: 8, reps_max: 12,
            rest_seconds: 60,
            exercise_type: "calisthenics",
            order_index: 1,
          },
          {
            name: "Flexão diamante",
            target_muscles: "Tríceps, Peitoral",
            sets: 3, reps_min: 6, reps_max: 10,
            rest_seconds: 90,
            exercise_type: "calisthenics",
            order_index: 2,
          },
          {
            name: "Dips em cadeira",
            target_muscles: "Tríceps, Peitoral inferior",
            sets: 3, reps_min: 10, reps_max: 15,
            rest_seconds: 60,
            exercise_type: "calisthenics",
            difficulty_options: ["Pernas dobradas", "Pernas estendidas", "Com peso"],
            order_index: 3,
          },
          {
            name: "Pike push-up",
            target_muscles: "Ombros, Tríceps",
            sets: 3, reps_min: 8, reps_max: 12,
            rest_seconds: 90,
            exercise_type: "calisthenics",
            order_index: 4,
          },
        ],
      },
      {
        name: "Pull Calistenia 30min",
        slot_name: "PULL",
        estimated_duration_min: 30,
        exercises: [
          {
            name: "Barra fixa (pull-up)",
            target_muscles: "Dorsais, Bíceps",
            sets: 3, reps_min: 5, reps_max: 10,
            rest_seconds: 120,
            exercise_type: "calisthenics",
            difficulty_options: ["Com elástico", "Normal", "Com colete"],
            order_index: 0,
          },
          {
            name: "Remada invertida",
            target_muscles: "Dorsais, Bíceps, Romboides",
            sets: 3, reps_min: 8, reps_max: 12,
            rest_seconds: 90,
            exercise_type: "calisthenics",
            difficulty_options: ["Inclinado", "Paralelo ao chão"],
            order_index: 1,
          },
          {
            name: "Rosca com peso corporal",
            target_muscles: "Bíceps",
            sets: 3, reps_min: 10, reps_max: 15,
            rest_seconds: 60,
            exercise_type: "calisthenics",
            order_index: 2,
          },
          {
            name: "Dead hang",
            target_muscles: "Antebraços, Core",
            sets: 3, duration_seconds: 30,
            rest_seconds: 60,
            exercise_type: "timed",
            order_index: 3,
          },
        ],
      },
      {
        name: "Legs Calistenia 30min",
        slot_name: "LEGS",
        estimated_duration_min: 30,
        exercises: [
          {
            name: "Agachamento",
            target_muscles: "Quadríceps, Glúteos, Isquiotibiais",
            sets: 3, reps_min: 15, reps_max: 20,
            rest_seconds: 60,
            exercise_type: "calisthenics",
            difficulty_options: ["Normal", "Sumô", "Com peso"],
            order_index: 0,
          },
          {
            name: "Agachamento búlgaro",
            target_muscles: "Quadríceps, Glúteos",
            sets: 3, reps_min: 8, reps_max: 12,
            rest_seconds: 90,
            exercise_type: "calisthenics",
            notes: "Por perna",
            order_index: 1,
          },
          {
            name: "Avanço",
            target_muscles: "Quadríceps, Glúteos",
            sets: 3, reps_min: 10, reps_max: 12,
            rest_seconds: 60,
            exercise_type: "calisthenics",
            notes: "Por perna",
            order_index: 2,
          },
          {
            name: "Elevação de quadril (hip thrust)",
            target_muscles: "Glúteos, Isquiotibiais",
            sets: 3, reps_min: 15, reps_max: 20,
            rest_seconds: 60,
            exercise_type: "calisthenics",
            difficulty_options: ["Sem peso", "Com peso"],
            order_index: 3,
          },
          {
            name: "Panturrilha em pé",
            target_muscles: "Panturrilha (gastrocnêmio)",
            sets: 4, reps_min: 15, reps_max: 20,
            rest_seconds: 45,
            exercise_type: "calisthenics",
            order_index: 4,
          },
        ],
      },
    ],
  },
  // Adicione as demais rotinas (Calistenia 4x, Full Body Fofo) aqui...
];
