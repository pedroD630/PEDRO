// ============================================================
// Seed data — Rotinas, Slots, Variações e Exercícios
// Fonte: workout_routines.json, routine_slots.json,
//        workout_variations.json, exercises.json
// ============================================================

export interface RoutineSeed {
  id: string;
  name: string;
  description: string;
  is_system: boolean;
}

export interface SlotSeed {
  id: string;
  routine_id: string;
  slot_name: string;
  default_day_of_week: number;
  default_day_label: string;
}

export interface VariationSeed {
  id: string;
  slot_id: string;
  name: string;
  description: string;
  estimated_duration_min: number;
  training_focus: string;
  is_system: boolean;
}

export interface ExerciseSeed {
  id: string;
  variation_id: string;
  catalog_id: string;       // slug from exercise_catalog
  sets: number;
  reps_min: number | null;
  reps_max: number | null;
  duration_seconds: number | null;
  rest_seconds: number | null;
  training_style: "normal" | "max_reps" | "timed";
  order_index: number;
  notes: string | null;
}

// ── Rotinas ──────────────────────────────────────────────────
export const WORKOUT_ROUTINES: RoutineSeed[] = [
  {
    id: "push_pull_legs_30min",
    name: "Push/Pull/Legs 30min",
    description: "Treino semanal com sessões de 30min de seg a sex, full body no sábado e cardio+core no domingo. Ideal para quem tem pouco tempo durante a semana.",
    is_system: true,
  },
  {
    id: "calistenia_4x",
    name: "Treino 4x — Calistenia + Pesos Livres",
    description: "Treino híbrido dividido em 4 dias: Push, Pull, Legs e Full Body+Core. Combina calistenia com halteres e barra.",
    is_system: true,
  },
  {
    id: "full_body_fofo",
    name: "Full Body Fofo",
    description: "Treino full body rotativo com 3 sessões diferentes (T1, T2, T3). Foco em progressões de calistenia e movimentos funcionais.",
    is_system: true,
  },
];

// ── Slots ────────────────────────────────────────────────────
export const ROUTINE_SLOTS: SlotSeed[] = [
  // Push/Pull/Legs 30min
  { id: "slot_ppl_push",            routine_id: "push_pull_legs_30min", slot_name: "PUSH",       default_day_of_week: 1, default_day_label: "Segunda" },
  { id: "slot_ppl_pull",            routine_id: "push_pull_legs_30min", slot_name: "PULL",       default_day_of_week: 2, default_day_label: "Terça" },
  { id: "slot_ppl_rest",            routine_id: "push_pull_legs_30min", slot_name: "REST",       default_day_of_week: 3, default_day_label: "Quarta" },
  { id: "slot_ppl_legs",            routine_id: "push_pull_legs_30min", slot_name: "LEGS",       default_day_of_week: 4, default_day_label: "Quinta" },
  { id: "slot_ppl_fullbody_cali",   routine_id: "push_pull_legs_30min", slot_name: "FULL_BODY",  default_day_of_week: 5, default_day_label: "Sexta" },
  { id: "slot_ppl_fullbody_musc",   routine_id: "push_pull_legs_30min", slot_name: "FULL_BODY",  default_day_of_week: 6, default_day_label: "Sábado" },
  { id: "slot_ppl_cardio",          routine_id: "push_pull_legs_30min", slot_name: "CARDIO",     default_day_of_week: 0, default_day_label: "Domingo" },
  // Calistenia 4x
  { id: "slot_4x_push",             routine_id: "calistenia_4x",        slot_name: "PUSH",       default_day_of_week: 1, default_day_label: "Dia 1" },
  { id: "slot_4x_pull",             routine_id: "calistenia_4x",        slot_name: "PULL",       default_day_of_week: 2, default_day_label: "Dia 2" },
  { id: "slot_4x_legs",             routine_id: "calistenia_4x",        slot_name: "LEGS",       default_day_of_week: 4, default_day_label: "Dia 3" },
  { id: "slot_4x_fullbody",         routine_id: "calistenia_4x",        slot_name: "FULL_BODY",  default_day_of_week: 6, default_day_label: "Dia 4" },
  // Full Body Fofo
  { id: "slot_fofo_t1",             routine_id: "full_body_fofo",       slot_name: "FULL_BODY",  default_day_of_week: 1, default_day_label: "Treino 1" },
  { id: "slot_fofo_t2",             routine_id: "full_body_fofo",       slot_name: "FULL_BODY",  default_day_of_week: 3, default_day_label: "Treino 2" },
  { id: "slot_fofo_t3",             routine_id: "full_body_fofo",       slot_name: "FULL_BODY",  default_day_of_week: 5, default_day_label: "Treino 3" },
];

// ── Variações ─────────────────────────────────────────────────
export const WORKOUT_VARIATIONS: VariationSeed[] = [
  // PUSH
  { id: "var_ppl_push_30min",       slot_id: "slot_ppl_push",           name: "Push 30min — Força + Técnica",          description: "Treino push de 30 minutos com foco em força e técnica. Combina calistenia e halteres.", estimated_duration_min: 30, training_focus: "strength",    is_system: true },
  { id: "var_push_forca",           slot_id: "slot_ppl_push",           name: "Push — Força (Dia 1)",                  description: "Push com foco em força: dips pesados, flexão declinada, pike push-up e desenvolvimento.", estimated_duration_min: 30, training_focus: "strength",    is_system: true },
  { id: "var_push_hipertrofia",     slot_id: "slot_ppl_push",           name: "Push — Hipertrofia (Dia 2)",            description: "Push com foco em hipertrofia: maior volume, ênfase em peito, ombro e tríceps com exercícios variados.", estimated_duration_min: 30, training_focus: "hypertrophy", is_system: true },
  { id: "var_4x_push",              slot_id: "slot_4x_push",            name: "Push 4x — Calistenia + Pesos Livres",   description: "Push completo com 8 exercícios combinando calistenia e halteres. Foco em máximo de repetições.", estimated_duration_min: 45, training_focus: "hypertrophy", is_system: true },
  // PULL
  { id: "var_ppl_pull_30min",       slot_id: "slot_ppl_pull",           name: "Pull 30min — Controle e Volume",        description: "Treino pull de 30 minutos com dead hang, pull-up com elástico e roscas.", estimated_duration_min: 30, training_focus: "hypertrophy", is_system: true },
  { id: "var_pull_forca",           slot_id: "slot_ppl_pull",           name: "Pull — Força (Dia 1)",                  description: "Pull com foco em força: dead hangs, progressões de pull-up e remadas.", estimated_duration_min: 30, training_focus: "strength",    is_system: true },
  { id: "var_pull_hipertrofia",     slot_id: "slot_ppl_pull",           name: "Pull — Hipertrofia (Dia 2)",            description: "Pull com foco em hipertrofia: scapular pull-ups, remadas e roscas com volume.", estimated_duration_min: 30, training_focus: "hypertrophy", is_system: true },
  { id: "var_4x_pull",              slot_id: "slot_4x_pull",            name: "Pull 4x — Calistenia + Pesos Livres",   description: "Pull completo com pull-ups negativos, remadas e roscas. Máximo de reps.", estimated_duration_min: 45, training_focus: "hypertrophy", is_system: true },
  // LEGS
  { id: "var_ppl_legs_30min",       slot_id: "slot_ppl_legs",           name: "Legs 30min — Potência e Estabilidade",  description: "Treino de perna de 30 minutos com agachamento, búlgaro, stiff, elevação pélvica e panturrilha.", estimated_duration_min: 30, training_focus: "strength",    is_system: true },
  { id: "var_legs_forca",           slot_id: "slot_ppl_legs",           name: "Legs — Força (Dia 1)",                  description: "Legs com foco em força: agachamento, pistola, búlgaro, stiff e panturrilha.", estimated_duration_min: 40, training_focus: "strength",    is_system: true },
  { id: "var_legs_potencia",        slot_id: "slot_ppl_legs",           name: "Legs — Potência (Dia 2)",               description: "Legs com foco em potência: pular corda, box jump, broad jump e depth jump.", estimated_duration_min: 30, training_focus: "power",       is_system: true },
  { id: "var_4x_legs",              slot_id: "slot_4x_legs",            name: "Legs 4x — Calistenia + Pesos Livres",   description: "Legs completo com agachamento livre, búlgaro, stiff, elevação pélvica e panturrilha. MAX reps.", estimated_duration_min: 45, training_focus: "hypertrophy", is_system: true },
  // FULL BODY
  { id: "var_ppl_fullbody_cali",    slot_id: "slot_ppl_fullbody_cali",  name: "Full Body Calistênico — Resistência Geral", description: "Circuito full body calistênico de 30min com flexão, pull-up, agachamento com salto, prancha e dips.", estimated_duration_min: 30, training_focus: "endurance",   is_system: true },
  { id: "var_ppl_fullbody_musc",    slot_id: "slot_ppl_fullbody_musc",  name: "Full Body Completo — Musculação (Sáb)", description: "Treino completo de 1h a 1h30 dividido em bloco de força (3x5) e bloco de hipertrofia (3x10-12).", estimated_duration_min: 90, training_focus: "strength",    is_system: true },
  { id: "var_4x_fullbody",          slot_id: "slot_4x_fullbody",        name: "Full Body + Abdômen — Explosão e Core", description: "Full body com dead hangs, push-up, pull-up negativo, box jump e trabalho de core completo.", estimated_duration_min: 45, training_focus: "power",       is_system: true },
  // CARDIO
  { id: "var_ppl_cardio",           slot_id: "slot_ppl_cardio",         name: "Cardio + Core (Domingo)",               description: "Corrida leve, sprints e circuito de core. Foco em recuperação ativa e condicionamento.", estimated_duration_min: 60, training_focus: "cardio",      is_system: true },
  { id: "var_hiit_15min",           slot_id: "slot_ppl_cardio",         name: "HIIT 15min",                            description: "Circuito de alta intensidade em 3 blocos: aquecimento, alta intensidade e core. 40s on / 20s off.", estimated_duration_min: 15, training_focus: "cardio",      is_system: true },
  // FOFO
  { id: "var_fofo_t1",              slot_id: "slot_fofo_t1",            name: "Full Body Fofo — Treino 1",             description: "Progressão de agachamento pistola, pull-ups e trabalho de peito/ombro. Finalização com core e panturrilha.", estimated_duration_min: 40, training_focus: "skill",       is_system: true },
  { id: "var_fofo_t2",              slot_id: "slot_fofo_t2",            name: "Full Body Fofo — Treino 2",             description: "Progressão de Nordic Curl, flexão diamante, pull-ups negativos. Finalização com afundo e elevação pélvica.", estimated_duration_min: 40, training_focus: "skill",       is_system: true },
  { id: "var_fofo_t3",              slot_id: "slot_fofo_t3",            name: "Full Body Fofo — Treino 3",             description: "Agachamento com progressão pistola, pull-ups e trabalho de peito/ombro/braço. Finalização com core.", estimated_duration_min: 40, training_focus: "skill",       is_system: true },
];

// ── Exercícios (junction: variation ↔ catalog) ─────────────────
export const WORKOUT_EXERCISES: ExerciseSeed[] = [
  // ── var_ppl_push_30min ──────────────────────────────────────
  { id: "ex_ppl_push30_1", variation_id: "var_ppl_push_30min",   catalog_id: "dips",              sets: 3, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 90,  training_style: "normal",   order_index: 1, notes: "Progredir até 12 reps, depois adicionar peso/colete" },
  { id: "ex_ppl_push30_2", variation_id: "var_ppl_push_30min",   catalog_id: "push_up_decline",   sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 75,  training_style: "normal",   order_index: 2, notes: null },
  { id: "ex_ppl_push30_3", variation_id: "var_ppl_push_30min",   catalog_id: "pike_push_up",      sets: 3, reps_min: 6,  reps_max: 8,  duration_seconds: null, rest_seconds: 75,  training_style: "normal",   order_index: 3, notes: null },
  { id: "ex_ppl_push30_4", variation_id: "var_ppl_push_30min",   catalog_id: "overhead_press_db", sets: 3, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 90,  training_style: "normal",   order_index: 4, notes: null },
  { id: "ex_ppl_push30_5", variation_id: "var_ppl_push_30min",   catalog_id: "chest_fly",         sets: 2, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 60,  training_style: "normal",   order_index: 5, notes: null },
  { id: "ex_ppl_push30_6", variation_id: "var_ppl_push_30min",   catalog_id: "lateral_raise",     sets: 2, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 60,  training_style: "normal",   order_index: 6, notes: null },

  // ── var_push_forca ──────────────────────────────────────────
  { id: "ex_push_f_1",  variation_id: "var_push_forca",   catalog_id: "rotator_cuff_warmup", sets: 2, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 45,  training_style: "normal",   order_index: 1, notes: "Aquecimento obrigatório" },
  { id: "ex_push_f_2",  variation_id: "var_push_forca",   catalog_id: "dips",                sets: 2, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 120, training_style: "normal",   order_index: 2, notes: "Variação normal" },
  { id: "ex_push_f_3",  variation_id: "var_push_forca",   catalog_id: "push_up_decline",     sets: 2, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 90,  training_style: "normal",   order_index: 3, notes: null },
  { id: "ex_push_f_4",  variation_id: "var_push_forca",   catalog_id: "push_up",             sets: 3, reps_min: 8,  reps_max: 12, duration_seconds: null, rest_seconds: 75,  training_style: "normal",   order_index: 4, notes: null },
  { id: "ex_push_f_5",  variation_id: "var_push_forca",   catalog_id: "pike_push_up_adv",    sets: 2, reps_min: 1,  reps_max: 5,  duration_seconds: null, rest_seconds: 120, training_style: "normal",   order_index: 5, notes: "Progressão mais difícil" },
  { id: "ex_push_f_6",  variation_id: "var_push_forca",   catalog_id: "reverse_fly",         sets: 2, reps_min: 8,  reps_max: 8,  duration_seconds: null, rest_seconds: 60,  training_style: "normal",   order_index: 6, notes: null },

  // ── var_push_hipertrofia ────────────────────────────────────
  { id: "ex_push_h_1",  variation_id: "var_push_hipertrofia", catalog_id: "rotator_cuff_warmup", sets: 2, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 45, training_style: "normal",   order_index: 1, notes: "Aquecimento" },
  { id: "ex_push_h_2",  variation_id: "var_push_hipertrofia", catalog_id: "lateral_raise",       sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60, training_style: "max_reps", order_index: 2, notes: null },
  { id: "ex_push_h_3",  variation_id: "var_push_hipertrofia", catalog_id: "push_up_diamond",     sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 75, training_style: "max_reps", order_index: 3, notes: null },
  { id: "ex_push_h_4",  variation_id: "var_push_hipertrofia", catalog_id: "push_up",             sets: 2, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60, training_style: "max_reps", order_index: 4, notes: null },
  { id: "ex_push_h_5",  variation_id: "var_push_hipertrofia", catalog_id: "push_up_decline",     sets: 2, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60, training_style: "max_reps", order_index: 5, notes: null },
  { id: "ex_push_h_6",  variation_id: "var_push_hipertrofia", catalog_id: "push_up_incline",     sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60, training_style: "max_reps", order_index: 6, notes: null },
  { id: "ex_push_h_7",  variation_id: "var_push_hipertrofia", catalog_id: "triceps_dip_bench",   sets: 2, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60, training_style: "max_reps", order_index: 7, notes: null },

  // ── var_4x_push ─────────────────────────────────────────────
  { id: "ex_4x_push_1", variation_id: "var_4x_push", catalog_id: "dips",              sets: 2, reps_min: 5,  reps_max: 6,  duration_seconds: null, rest_seconds: 120, training_style: "max_reps", order_index: 1, notes: "Peitoral inferior, tríceps, deltoide anterior. Assistido se necessário." },
  { id: "ex_4x_push_2", variation_id: "var_4x_push", catalog_id: "push_up",           sets: 2, reps_min: 11, reps_max: 15, duration_seconds: null, rest_seconds: 75,  training_style: "max_reps", order_index: 2, notes: null },
  { id: "ex_4x_push_3", variation_id: "var_4x_push", catalog_id: "push_up_decline",   sets: 2, reps_min: 5,  reps_max: 10, duration_seconds: null, rest_seconds: 90,  training_style: "max_reps", order_index: 3, notes: "Peitoral maior, tríceps, deltoide anterior" },
  { id: "ex_4x_push_4", variation_id: "var_4x_push", catalog_id: "overhead_press_db", sets: 3, reps_min: 9,  reps_max: 15, duration_seconds: null, rest_seconds: 90,  training_style: "max_reps", order_index: 4, notes: "Deltoide anterior, tríceps, trapézio superior" },
  { id: "ex_4x_push_5", variation_id: "var_4x_push", catalog_id: "bench_press",       sets: 3, reps_min: 11, reps_max: 12, duration_seconds: null, rest_seconds: 90,  training_style: "max_reps", order_index: 5, notes: "Peitoral maior, tríceps, deltoide anterior" },
  { id: "ex_4x_push_6", variation_id: "var_4x_push", catalog_id: "chest_fly",         sets: 3, reps_min: null,reps_max: null,duration_seconds: null, rest_seconds: 75,  training_style: "max_reps", order_index: 6, notes: "Peitoral maior, ênfase na porção medial" },
  { id: "ex_4x_push_7", variation_id: "var_4x_push", catalog_id: "push_up_diamond",   sets: 2, reps_min: 5,  reps_max: 5,  duration_seconds: null, rest_seconds: 75,  training_style: "max_reps", order_index: 7, notes: null },
  { id: "ex_4x_push_8", variation_id: "var_4x_push", catalog_id: "lateral_raise",     sets: 3, reps_min: null,reps_max: null,duration_seconds: null, rest_seconds: 60,  training_style: "max_reps", order_index: 8, notes: "Deltoide lateral" },

  // ── var_ppl_pull_30min ──────────────────────────────────────
  { id: "ex_ppl_pull30_1", variation_id: "var_ppl_pull_30min", catalog_id: "dead_hang",         sets: 2, reps_min: null, reps_max: null, duration_seconds: 30, rest_seconds: 60,  training_style: "timed",  order_index: 1, notes: "Manter ativação escapular" },
  { id: "ex_ppl_pull30_2", variation_id: "var_ppl_pull_30min", catalog_id: "pull_up_band",      sets: 3, reps_min: 6,  reps_max: 10, duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 2, notes: "Reduzir assistência elástica gradualmente" },
  { id: "ex_ppl_pull30_3", variation_id: "var_ppl_pull_30min", catalog_id: "bent_over_row",     sets: 3, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 3, notes: "Aumentar carga conforme execução estiver firme" },
  { id: "ex_ppl_pull30_4", variation_id: "var_ppl_pull_30min", catalog_id: "single_arm_row",    sets: 3, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 75,  training_style: "normal", order_index: 4, notes: null },
  { id: "ex_ppl_pull30_5", variation_id: "var_ppl_pull_30min", catalog_id: "hammer_curl",       sets: 2, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 60,  training_style: "normal", order_index: 5, notes: null },
  { id: "ex_ppl_pull30_6", variation_id: "var_ppl_pull_30min", catalog_id: "alternating_curl",  sets: 2, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 60,  training_style: "normal", order_index: 6, notes: null },

  // ── var_pull_forca ──────────────────────────────────────────
  { id: "ex_pull_f_1", variation_id: "var_pull_forca", catalog_id: "dead_hang",   sets: 2, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 60,  training_style: "timed",  order_index: 1, notes: null },
  { id: "ex_pull_f_2", variation_id: "var_pull_forca", catalog_id: "pull_up",     sets: 2, reps_min: 1,  reps_max: 5,  duration_seconds: null, rest_seconds: 120, training_style: "normal", order_index: 2, notes: "Progressão mais difícil" },
  { id: "ex_pull_f_3", variation_id: "var_pull_forca", catalog_id: "pull_up_band",sets: 3, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 3, notes: "Progressão mais fácil" },
  { id: "ex_pull_f_4", variation_id: "var_pull_forca", catalog_id: "bent_over_row",sets: 2, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 120, training_style: "normal", order_index: 4, notes: null },
  { id: "ex_pull_f_5", variation_id: "var_pull_forca", catalog_id: "pullover",    sets: 3, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 5, notes: null },

  // ── var_pull_hipertrofia ────────────────────────────────────
  { id: "ex_pull_h_1", variation_id: "var_pull_hipertrofia", catalog_id: "scapular_pull_up",   sets: 2, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 1, notes: null },
  { id: "ex_pull_h_2", variation_id: "var_pull_hipertrofia", catalog_id: "inverted_row",       sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 75, training_style: "normal", order_index: 2, notes: null },
  { id: "ex_pull_h_3", variation_id: "var_pull_hipertrofia", catalog_id: "single_arm_row",     sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 75, training_style: "normal", order_index: 3, notes: null },
  { id: "ex_pull_h_4", variation_id: "var_pull_hipertrofia", catalog_id: "hammer_curl",        sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 4, notes: null },
  { id: "ex_pull_h_5", variation_id: "var_pull_hipertrofia", catalog_id: "concentration_curl", sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 5, notes: null },
  { id: "ex_pull_h_6", variation_id: "var_pull_hipertrofia", catalog_id: "alternating_curl",   sets: 3, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 6, notes: null },
  { id: "ex_pull_h_7", variation_id: "var_pull_hipertrofia", catalog_id: "overhead_press_db",  sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 90, training_style: "normal", order_index: 7, notes: "Desenvolvimento de ombro" },
  { id: "ex_pull_h_8", variation_id: "var_pull_hipertrofia", catalog_id: "arnold_press",       sets: 3, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal", order_index: 8, notes: null },

  // ── var_4x_pull ─────────────────────────────────────────────
  { id: "ex_4x_pull_1", variation_id: "var_4x_pull", catalog_id: "pull_up_negative", sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 120, training_style: "max_reps", order_index: 1, notes: "Ou completos se possível. Dorsais, bíceps braquial, trapézio inferior" },
  { id: "ex_4x_pull_2", variation_id: "var_4x_pull", catalog_id: "bent_over_row",    sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 90,  training_style: "max_reps", order_index: 2, notes: "Dorsais, trapézio médio e inferior, romboides, bíceps" },
  { id: "ex_4x_pull_3", variation_id: "var_4x_pull", catalog_id: "single_arm_row",   sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 75,  training_style: "max_reps", order_index: 3, notes: "Dorsais, trapézio médio e romboides" },
  { id: "ex_4x_pull_4", variation_id: "var_4x_pull", catalog_id: "hammer_curl",      sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60,  training_style: "max_reps", order_index: 4, notes: "Braquial, braquiorradial, bíceps braquial" },
  { id: "ex_4x_pull_5", variation_id: "var_4x_pull", catalog_id: "alternating_curl", sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60,  training_style: "max_reps", order_index: 5, notes: "Bíceps braquial (cabeça curta e longa)" },
  { id: "ex_4x_pull_6", variation_id: "var_4x_pull", catalog_id: "shrug",            sets: 3, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 60,  training_style: "normal",   order_index: 6, notes: "Trapézio superior" },
  { id: "ex_4x_pull_7", variation_id: "var_4x_pull", catalog_id: "ab_standard",      sets: 2, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 45,  training_style: "max_reps", order_index: 7, notes: null },

  // ── var_ppl_legs_30min ──────────────────────────────────────
  { id: "ex_ppl_legs30_1", variation_id: "var_ppl_legs_30min", catalog_id: "squat_barbell",          sets: 3, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 120, training_style: "normal", order_index: 1, notes: "Aumentar carga a cada 2 semanas" },
  { id: "ex_ppl_legs30_2", variation_id: "var_ppl_legs_30min", catalog_id: "bulgarian_split_squat",  sets: 3, reps_min: 8,  reps_max: 10, duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 2, notes: "Manter boa amplitude" },
  { id: "ex_ppl_legs30_3", variation_id: "var_ppl_legs_30min", catalog_id: "rdl",                    sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 3, notes: null },
  { id: "ex_ppl_legs30_4", variation_id: "var_ppl_legs_30min", catalog_id: "hip_thrust",             sets: 3, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 75,  training_style: "normal", order_index: 4, notes: null },
  { id: "ex_ppl_legs30_5", variation_id: "var_ppl_legs_30min", catalog_id: "calf_raise_unilateral",  sets: 3, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 60,  training_style: "normal", order_index: 5, notes: null },
  { id: "ex_ppl_legs30_6", variation_id: "var_ppl_legs_30min", catalog_id: "jump_squat",             sets: 2, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 60,  training_style: "normal", order_index: 6, notes: "Finalização" },

  // ── var_legs_forca ──────────────────────────────────────────
  { id: "ex_legs_f_1", variation_id: "var_legs_forca", catalog_id: "squat_barbell",         sets: 3, reps_min: 8,  reps_max: 8,  duration_seconds: null, rest_seconds: 120, training_style: "normal", order_index: 1, notes: null },
  { id: "ex_legs_f_2", variation_id: "var_legs_forca", catalog_id: "pistol_squat",          sets: 2, reps_min: 6,  reps_max: 6,  duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 2, notes: null },
  { id: "ex_legs_f_3", variation_id: "var_legs_forca", catalog_id: "bulgarian_split_squat", sets: 3, reps_min: 8,  reps_max: 10, duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 3, notes: null },
  { id: "ex_legs_f_4", variation_id: "var_legs_forca", catalog_id: "rdl",                   sets: 2, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 75,  training_style: "normal", order_index: 4, notes: null },
  { id: "ex_legs_f_5", variation_id: "var_legs_forca", catalog_id: "calf_raise_unilateral", sets: 2, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 60,  training_style: "normal", order_index: 5, notes: null },
  { id: "ex_legs_f_6", variation_id: "var_legs_forca", catalog_id: "hip_thrust",            sets: 2, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 75,  training_style: "normal", order_index: 6, notes: null },

  // ── var_legs_potencia ───────────────────────────────────────
  { id: "ex_legs_p_1", variation_id: "var_legs_potencia", catalog_id: "jump_rope",  sets: 2, reps_min: 30, reps_max: 30, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 1, notes: null },
  { id: "ex_legs_p_2", variation_id: "var_legs_potencia", catalog_id: "box_jump",   sets: 3, reps_min: 8,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal", order_index: 2, notes: null },
  { id: "ex_legs_p_3", variation_id: "var_legs_potencia", catalog_id: "broad_jump", sets: 2, reps_min: 8,  reps_max: 8,  duration_seconds: null, rest_seconds: 75, training_style: "normal", order_index: 3, notes: null },
  { id: "ex_legs_p_4", variation_id: "var_legs_potencia", catalog_id: "depth_jump", sets: 2, reps_min: 8,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal", order_index: 4, notes: null },

  // ── var_4x_legs ─────────────────────────────────────────────
  { id: "ex_4x_legs_1", variation_id: "var_4x_legs", catalog_id: "squat_barbell",         sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 120, training_style: "max_reps", order_index: 1, notes: "Quadríceps, glúteo máximo, posterior de coxa, core" },
  { id: "ex_4x_legs_2", variation_id: "var_4x_legs", catalog_id: "bulgarian_split_squat", sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 90,  training_style: "max_reps", order_index: 2, notes: null },
  { id: "ex_4x_legs_3", variation_id: "var_4x_legs", catalog_id: "rdl",                   sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 90,  training_style: "max_reps", order_index: 3, notes: null },
  { id: "ex_4x_legs_4", variation_id: "var_4x_legs", catalog_id: "hip_thrust",            sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 75,  training_style: "max_reps", order_index: 4, notes: null },
  { id: "ex_4x_legs_5", variation_id: "var_4x_legs", catalog_id: "calf_raise_unilateral", sets: 3, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 60,  training_style: "max_reps", order_index: 5, notes: null },
  { id: "ex_4x_legs_6", variation_id: "var_4x_legs", catalog_id: "ab_standard",           sets: 2, reps_min: null, reps_max: null, duration_seconds: null, rest_seconds: 45,  training_style: "max_reps", order_index: 6, notes: null },

  // ── var_ppl_fullbody_cali ───────────────────────────────────
  { id: "ex_fcali_1", variation_id: "var_ppl_fullbody_cali", catalog_id: "push_up",               sets: 3, reps_min: 12, reps_max: 15, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 1, notes: null },
  { id: "ex_fcali_2", variation_id: "var_ppl_fullbody_cali", catalog_id: "pull_up_band",           sets: 3, reps_min: 6,  reps_max: 10, duration_seconds: null, rest_seconds: 75, training_style: "normal", order_index: 2, notes: "Com elástico se necessário" },
  { id: "ex_fcali_3", variation_id: "var_ppl_fullbody_cali", catalog_id: "jump_squat",             sets: 3, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 3, notes: null },
  { id: "ex_fcali_4", variation_id: "var_ppl_fullbody_cali", catalog_id: "plank",                  sets: 3, reps_min: null,reps_max: null,duration_seconds: 20,  rest_seconds: 45, training_style: "timed",  order_index: 4, notes: "+ 10 elevações de joelho após a prancha" },
  { id: "ex_fcali_5", variation_id: "var_ppl_fullbody_cali", catalog_id: "dips",                   sets: 2, reps_min: 8,  reps_max: 8,  duration_seconds: null, rest_seconds: 75, training_style: "normal", order_index: 5, notes: null },
  { id: "ex_fcali_6", variation_id: "var_ppl_fullbody_cali", catalog_id: "calf_raise_unilateral",  sets: 3, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 45, training_style: "normal", order_index: 6, notes: null },

  // ── var_ppl_fullbody_musc ───────────────────────────────────
  { id: "ex_fmusc_1",  variation_id: "var_ppl_fullbody_musc", catalog_id: "squat_barbell",         sets: 3, reps_min: 5,  reps_max: 5,  duration_seconds: null, rest_seconds: 180, training_style: "normal", order_index: 1,  notes: "Bloco de Força — aquecimento: 5min mobilidade + 2 séries leves" },
  { id: "ex_fmusc_2",  variation_id: "var_ppl_fullbody_musc", catalog_id: "bench_press",           sets: 3, reps_min: 5,  reps_max: 5,  duration_seconds: null, rest_seconds: 180, training_style: "normal", order_index: 2,  notes: "Bloco de Força" },
  { id: "ex_fmusc_3",  variation_id: "var_ppl_fullbody_musc", catalog_id: "bent_over_row",         sets: 3, reps_min: 5,  reps_max: 5,  duration_seconds: null, rest_seconds: 180, training_style: "normal", order_index: 3,  notes: "Bloco de Força" },
  { id: "ex_fmusc_4",  variation_id: "var_ppl_fullbody_musc", catalog_id: "overhead_press_bb",     sets: 3, reps_min: 5,  reps_max: 5,  duration_seconds: null, rest_seconds: 180, training_style: "normal", order_index: 4,  notes: "Bloco de Força" },
  { id: "ex_fmusc_5",  variation_id: "var_ppl_fullbody_musc", catalog_id: "chest_fly",             sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 5,  notes: "Bloco de Hipertrofia" },
  { id: "ex_fmusc_6",  variation_id: "var_ppl_fullbody_musc", catalog_id: "alternating_curl",      sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 75,  training_style: "normal", order_index: 6,  notes: "Bloco de Hipertrofia" },
  { id: "ex_fmusc_7",  variation_id: "var_ppl_fullbody_musc", catalog_id: "rdl",                   sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 90,  training_style: "normal", order_index: 7,  notes: "Bloco de Hipertrofia" },
  { id: "ex_fmusc_8",  variation_id: "var_ppl_fullbody_musc", catalog_id: "hip_thrust",            sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 75,  training_style: "normal", order_index: 8,  notes: "Bloco de Hipertrofia" },
  { id: "ex_fmusc_9",  variation_id: "var_ppl_fullbody_musc", catalog_id: "ab_wheel",              sets: 3, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 60,  training_style: "normal", order_index: 9,  notes: "Finalização" },
  { id: "ex_fmusc_10", variation_id: "var_ppl_fullbody_musc", catalog_id: "calf_raise_unilateral", sets: 3, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 45,  training_style: "normal", order_index: 10, notes: "Finalização" },

  // ── var_4x_fullbody ─────────────────────────────────────────
  { id: "ex_4xfb_1", variation_id: "var_4x_fullbody", catalog_id: "dead_hang",        sets: 3, reps_min: null, reps_max: null, duration_seconds: 30, rest_seconds: 60, training_style: "timed",  order_index: 1, notes: "Dorsais, antebraço, core" },
  { id: "ex_4xfb_2", variation_id: "var_4x_fullbody", catalog_id: "push_up",          sets: 3, reps_min: 8,  reps_max: 12, duration_seconds: null, rest_seconds: 75, training_style: "normal", order_index: 2, notes: "Ou declinada. Peitoral maior, tríceps" },
  { id: "ex_4xfb_3", variation_id: "var_4x_fullbody", catalog_id: "pull_up_negative", sets: 3, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal", order_index: 3, notes: "Ou assistido. Dorsais, bíceps braquial" },
  { id: "ex_4xfb_4", variation_id: "var_4x_fullbody", catalog_id: "box_jump",         sets: 3, reps_min: 8,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal", order_index: 4, notes: "Salto vertical explosivo. Quadríceps, glúteo" },
  { id: "ex_4xfb_5", variation_id: "var_4x_fullbody", catalog_id: "knee_raise_bar",   sets: 3, reps_min: 8,  reps_max: 10, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 5, notes: "Ou progressão sentado. Reto abdominal, flexores" },
  { id: "ex_4xfb_6", variation_id: "var_4x_fullbody", catalog_id: "ab_wheel",         sets: 3, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 6, notes: "Ou prancha progressiva" },
  { id: "ex_4xfb_7", variation_id: "var_4x_fullbody", catalog_id: "hollow_body",      sets: 3, reps_min: null,reps_max: null,duration_seconds: 25, rest_seconds: 45, training_style: "timed",  order_index: 7, notes: "Core completo" },

  // ── var_ppl_cardio ──────────────────────────────────────────
  { id: "ex_cardio_1", variation_id: "var_ppl_cardio", catalog_id: "run_light",  sets: 1, reps_min: null, reps_max: null, duration_seconds: 1500, rest_seconds: null, training_style: "timed",  order_index: 1, notes: "20–30 minutos" },
  { id: "ex_cardio_2", variation_id: "var_ppl_cardio", catalog_id: "sprint",     sets: 5, reps_min: null, reps_max: null, duration_seconds: 30,   rest_seconds: 90,   training_style: "timed",  order_index: 2, notes: "30s sprint, 90s descanso" },
  { id: "ex_cardio_3", variation_id: "var_ppl_cardio", catalog_id: "plank_side", sets: 3, reps_min: null, reps_max: null, duration_seconds: 30,   rest_seconds: 30,   training_style: "timed",  order_index: 3, notes: "Core — 3 rodadas" },
  { id: "ex_cardio_4", variation_id: "var_ppl_cardio", catalog_id: "leg_raise",  sets: 3, reps_min: 10, reps_max: 12, duration_seconds: null,  rest_seconds: 30,   training_style: "normal", order_index: 4, notes: "Core — 3 rodadas" },
  { id: "ex_cardio_5", variation_id: "var_ppl_cardio", catalog_id: "hollow_body",sets: 3, reps_min: null, reps_max: null, duration_seconds: 20,   rest_seconds: 30,   training_style: "timed",  order_index: 5, notes: "Core — 3 rodadas" },

  // ── var_hiit_15min ──────────────────────────────────────────
  { id: "ex_hiit_1",  variation_id: "var_hiit_15min", catalog_id: "jumping_jacks",   sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 1,  notes: "Bloco 1 — Aquecimento" },
  { id: "ex_hiit_2",  variation_id: "var_hiit_15min", catalog_id: "high_knees",      sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 2,  notes: null },
  { id: "ex_hiit_3",  variation_id: "var_hiit_15min", catalog_id: "mountain_climber",sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 3,  notes: null },
  { id: "ex_hiit_4",  variation_id: "var_hiit_15min", catalog_id: "skater_hop",      sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 4,  notes: null },
  { id: "ex_hiit_5",  variation_id: "var_hiit_15min", catalog_id: "shadow_boxing",   sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 5,  notes: null },
  { id: "ex_hiit_6",  variation_id: "var_hiit_15min", catalog_id: "burpee",          sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 6,  notes: "Bloco 2 — Alta intensidade" },
  { id: "ex_hiit_7",  variation_id: "var_hiit_15min", catalog_id: "jump_squat",      sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 7,  notes: null },
  { id: "ex_hiit_8",  variation_id: "var_hiit_15min", catalog_id: "knee_tuck_jump",  sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 8,  notes: null },
  { id: "ex_hiit_9",  variation_id: "var_hiit_15min", catalog_id: "sprint",          sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 9,  notes: "Sprint no lugar" },
  { id: "ex_hiit_10", variation_id: "var_hiit_15min", catalog_id: "lunge_jump",      sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 10, notes: null },
  { id: "ex_hiit_11", variation_id: "var_hiit_15min", catalog_id: "plank_to_push_up",sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 11, notes: "Bloco 3 — Core e fechamento" },
  { id: "ex_hiit_12", variation_id: "var_hiit_15min", catalog_id: "russian_twist",   sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 12, notes: null },
  { id: "ex_hiit_13", variation_id: "var_hiit_15min", catalog_id: "bicycle_crunch",  sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 13, notes: null },
  { id: "ex_hiit_14", variation_id: "var_hiit_15min", catalog_id: "v_up",            sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: 20, training_style: "timed", order_index: 14, notes: null },
  { id: "ex_hiit_15", variation_id: "var_hiit_15min", catalog_id: "plank",           sets: 1, reps_min: null, reps_max: null, duration_seconds: 40, rest_seconds: null,training_style: "timed", order_index: 15, notes: "Prancha final — sem descanso" },

  // ── var_fofo_t1 ─────────────────────────────────────────────
  { id: "ex_fofo_t1_1",  variation_id: "var_fofo_t1", catalog_id: "hollow_body",          sets: 1, reps_min: null, reps_max: null, duration_seconds: 30, rest_seconds: 30, training_style: "timed",    order_index: 1,  notes: "Aquecimento" },
  { id: "ex_fofo_t1_2",  variation_id: "var_fofo_t1", catalog_id: "pistol_squat_wall",    sets: 2, reps_min: 8,  reps_max: 10, duration_seconds: null, rest_seconds: 75, training_style: "normal",   order_index: 2,  notes: "Agachamento pistola — progressão: apoio na parede" },
  { id: "ex_fofo_t1_3",  variation_id: "var_fofo_t1", catalog_id: "pistol_squat",         sets: 2, reps_min: 6,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal",   order_index: 3,  notes: "Pistol Squat Rolling" },
  { id: "ex_fofo_t1_4",  variation_id: "var_fofo_t1", catalog_id: "inverted_row",         sets: 2, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 75, training_style: "normal",   order_index: 4,  notes: "Pull-ups — progressão: inverted rows low" },
  { id: "ex_fofo_t1_5",  variation_id: "var_fofo_t1", catalog_id: "scapular_pull_up",     sets: 2, reps_min: 8,  reps_max: 10, duration_seconds: null, rest_seconds: 75, training_style: "normal",   order_index: 5,  notes: "Scapular pullups invertido" },
  { id: "ex_fofo_t1_6",  variation_id: "var_fofo_t1", catalog_id: "push_up",              sets: 3, reps_min: null,reps_max: null,duration_seconds: null, rest_seconds: 60, training_style: "max_reps", order_index: 6,  notes: "Último recorde: 8–8–8" },
  { id: "ex_fofo_t1_7",  variation_id: "var_fofo_t1", catalog_id: "pike_push_up",         sets: 2, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 75, training_style: "normal",   order_index: 7,  notes: "Pike negativa — descida apenas" },
  { id: "ex_fofo_t1_8",  variation_id: "var_fofo_t1", catalog_id: "dips",                 sets: 2, reps_min: null,reps_max: null,duration_seconds: null, rest_seconds: 75, training_style: "max_reps", order_index: 8,  notes: null },
  { id: "ex_fofo_t1_9",  variation_id: "var_fofo_t1", catalog_id: "knee_raise_bar",       sets: 2, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 45, training_style: "normal",   order_index: 9,  notes: "Finalização" },
  { id: "ex_fofo_t1_10", variation_id: "var_fofo_t1", catalog_id: "calf_raise_unilateral",sets: 2, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 45, training_style: "normal",   order_index: 10, notes: "Finalização" },

  // ── var_fofo_t2 ─────────────────────────────────────────────
  { id: "ex_fofo_t2_1", variation_id: "var_fofo_t2", catalog_id: "hollow_body",      sets: 1, reps_min: null, reps_max: null, duration_seconds: 30, rest_seconds: 30, training_style: "timed",    order_index: 1, notes: "Aquecimento" },
  { id: "ex_fofo_t2_2", variation_id: "var_fofo_t2", catalog_id: "nordic_curl",      sets: 2, reps_min: 6,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal",   order_index: 2, notes: "Nordic Curl Negativo pra frente" },
  { id: "ex_fofo_t2_3", variation_id: "var_fofo_t2", catalog_id: "nordic_curl",      sets: 2, reps_min: 6,  reps_max: 8,  duration_seconds: null, rest_seconds: 90, training_style: "normal",   order_index: 3, notes: "Nordic Curl pra trás" },
  { id: "ex_fofo_t2_4", variation_id: "var_fofo_t2", catalog_id: "push_up_diamond",  sets: 2, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 75, training_style: "normal",   order_index: 4, notes: null },
  { id: "ex_fofo_t2_5", variation_id: "var_fofo_t2", catalog_id: "pull_up_negative", sets: 2, reps_min: null,reps_max: null,duration_seconds: null, rest_seconds: 90, training_style: "max_reps", order_index: 5, notes: "Pull Ups negativo (normal) — até a falha" },
  { id: "ex_fofo_t2_6", variation_id: "var_fofo_t2", catalog_id: "pull_up_band",     sets: 2, reps_min: null,reps_max: null,duration_seconds: null, rest_seconds: 90, training_style: "max_reps", order_index: 6, notes: "Band Pull Ups (Elástico) — até a falha" },
  { id: "ex_fofo_t2_7", variation_id: "var_fofo_t2", catalog_id: "lunge",            sets: 2, reps_min: 8,  reps_max: 10, duration_seconds: null, rest_seconds: 60, training_style: "normal",   order_index: 7, notes: "Finalização" },
  { id: "ex_fofo_t2_8", variation_id: "var_fofo_t2", catalog_id: "hip_thrust",       sets: 2, reps_min: 15, reps_max: 15, duration_seconds: null, rest_seconds: 45, training_style: "normal",   order_index: 8, notes: "Finalização" },

  // ── var_fofo_t3 ─────────────────────────────────────────────
  { id: "ex_fofo_t3_1",  variation_id: "var_fofo_t3", catalog_id: "hollow_body",          sets: 1, reps_min: null, reps_max: null, duration_seconds: 30, rest_seconds: 30, training_style: "timed",  order_index: 1,  notes: "Aquecimento" },
  { id: "ex_fofo_t3_2",  variation_id: "var_fofo_t3", catalog_id: "squat_barbell",        sets: 1, reps_min: 12, reps_max: 15, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 2,  notes: "1 série sem peso de aquecimento antes" },
  { id: "ex_fofo_t3_3",  variation_id: "var_fofo_t3", catalog_id: "squat_barbell",        sets: 2, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 90, training_style: "normal", order_index: 3,  notes: "Agachamento com peso" },
  { id: "ex_fofo_t3_4",  variation_id: "var_fofo_t3", catalog_id: "pistol_squat_wall",    sets: 2, reps_min: 8,  reps_max: 10, duration_seconds: null, rest_seconds: 75, training_style: "normal", order_index: 4,  notes: "Agachamento pistola com apoio na parede" },
  { id: "ex_fofo_t3_5",  variation_id: "var_fofo_t3", catalog_id: "single_arm_row",       sets: 2, reps_min: 12, reps_max: 15, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 5,  notes: "Pull-ups — progressão: remada unilateral" },
  { id: "ex_fofo_t3_6",  variation_id: "var_fofo_t3", catalog_id: "inverted_row",         sets: 2, reps_min: 10, reps_max: 10, duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 6,  notes: "Inverted rows low" },
  { id: "ex_fofo_t3_7",  variation_id: "var_fofo_t3", catalog_id: "push_up",              sets: 2, reps_min: 5,  reps_max: 8,  duration_seconds: null, rest_seconds: 60, training_style: "normal", order_index: 7,  notes: null },
  { id: "ex_fofo_t3_8",  variation_id: "var_fofo_t3", catalog_id: "lateral_raise",        sets: 2, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 45, training_style: "normal", order_index: 8,  notes: null },
  { id: "ex_fofo_t3_9",  variation_id: "var_fofo_t3", catalog_id: "alternating_curl",     sets: 2, reps_min: 12, reps_max: 12, duration_seconds: null, rest_seconds: 45, training_style: "normal", order_index: 9,  notes: null },
  { id: "ex_fofo_t3_10", variation_id: "var_fofo_t3", catalog_id: "calf_raise_unilateral",sets: 2, reps_min: 12, reps_max: 15, duration_seconds: null, rest_seconds: 45, training_style: "normal", order_index: 10, notes: "Finalização" },
  { id: "ex_fofo_t3_11", variation_id: "var_fofo_t3", catalog_id: "knee_raise_bar",       sets: 2, reps_min: 10, reps_max: 12, duration_seconds: null, rest_seconds: 45, training_style: "normal", order_index: 11, notes: "Finalização" },
];
