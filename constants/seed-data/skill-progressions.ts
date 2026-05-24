export interface SkillProgressionExercise {
  catalog_id: string;
  sets: number;
  reps: number | null;
  duration_seconds: number | null;
  notes?: string;
}

export interface SkillProgression {
  id: string;
  skill: "PLANCHE" | "MUSCLE_UP" | "PISTOL_SQUAT" | "V_SIT" | "HANDSTAND_PUSH_UP";
  progression_level: number;
  progression_name: string;
  description: string;
  exercises: SkillProgressionExercise[];
}

export const SKILL_PROGRESSIONS: SkillProgression[] = [
  // ── PLANCHE ────────────────────────────────────────────
  {
    id: "skill_planche_prog_1", skill: "PLANCHE", progression_level: 1,
    progression_name: "Pseudo Push-ups",
    description: "Nível introdutório ao planche. Foco em força de ombro anterior e consciência corporal.",
    exercises: [
      { catalog_id: "pseudo_push_up", sets: 3, reps: 5,  duration_seconds: null },
      { catalog_id: "planche_lean",   sets: 3, reps: null, duration_seconds: 20 },
      { catalog_id: "leg_raise",      sets: 3, reps: 15, duration_seconds: null },
      { catalog_id: "superman",       sets: 3, reps: 12, duration_seconds: null },
    ],
  },
  {
    id: "skill_planche_prog_2", skill: "PLANCHE", progression_level: 2,
    progression_name: "Frog Stand",
    description: "Equilíbrio estático com joelhos apoiados nos cotovelos. Desenvolve força de punho e deltoide anterior.",
    exercises: [
      { catalog_id: "frog_stand",    sets: 3, reps: null, duration_seconds: 10 },
      { catalog_id: "pseudo_push_up",sets: 3, reps: 5,   duration_seconds: null },
      { catalog_id: "planche_lean",  sets: 3, reps: null, duration_seconds: 10 },
      { catalog_id: "superman",      sets: 3, reps: 10,  duration_seconds: null },
    ],
  },
  {
    id: "skill_planche_prog_3", skill: "PLANCHE", progression_level: 3,
    progression_name: "Tuck Planche",
    description: "Corpo elevado com joelhos recolhidos ao peito. Primeira progressão de planche real.",
    exercises: [
      { catalog_id: "tuck_planche",  sets: 3, reps: null, duration_seconds: 6 },
      { catalog_id: "frog_stand",    sets: 3, reps: null, duration_seconds: 20 },
      { catalog_id: "pseudo_push_up",sets: 3, reps: 8,   duration_seconds: null },
      { catalog_id: "superman",      sets: 3, reps: 12,  duration_seconds: null },
    ],
  },
  {
    id: "skill_planche_prog_4", skill: "PLANCHE", progression_level: 4,
    progression_name: "Advanced Tuck Planche",
    description: "Tuck planche com pernas mais estendidas, maior exigência de força de ombro.",
    exercises: [
      { catalog_id: "tuck_planche_adv",  sets: 3, reps: null, duration_seconds: 6 },
      { catalog_id: "tuck_planche_swing",sets: 3, reps: 5,   duration_seconds: null },
      { catalog_id: "pseudo_push_up",    sets: 3, reps: 8,   duration_seconds: null },
      { catalog_id: "superman",          sets: 3, reps: 15,  duration_seconds: null },
    ],
  },
  {
    id: "skill_planche_prog_5", skill: "PLANCHE", progression_level: 5,
    progression_name: "Straddle Planche",
    description: "Planche com pernas abertas (straddle). Alta exigência de força total.",
    exercises: [
      { catalog_id: "straddle_planche",  sets: 3, reps: null, duration_seconds: 6 },
      { catalog_id: "handstand_lean",    sets: 3, reps: 3,   duration_seconds: null },
      { catalog_id: "tuck_planche_swing",sets: 3, reps: 5,   duration_seconds: null },
      { catalog_id: "superman",          sets: 3, reps: 20,  duration_seconds: null },
    ],
  },
  {
    id: "skill_planche_prog_6", skill: "PLANCHE", progression_level: 6,
    progression_name: "Planche",
    description: "Planche completo com pernas unidas. Elite da calistenia de força estática.",
    exercises: [
      { catalog_id: "planche",          sets: 3, reps: null, duration_seconds: 2 },
      { catalog_id: "straddle_planche", sets: 3, reps: null, duration_seconds: 10 },
      { catalog_id: "handstand_lean",   sets: 3, reps: 5,   duration_seconds: null },
      { catalog_id: "tuck_planche_adv", sets: 3, reps: null, duration_seconds: 10 },
    ],
  },

  // ── MUSCLE UP ───────────────────────────────────────────
  {
    id: "skill_muscleup_prog_1", skill: "MUSCLE_UP", progression_level: 1,
    progression_name: "Pull-up",
    description: "Base do muscle up. Foco em pull-up limpo e fundação de força.",
    exercises: [
      { catalog_id: "pull_up",  sets: 3, reps: 2,  duration_seconds: null },
      { catalog_id: "body_row", sets: 3, reps: 12, duration_seconds: null },
      { catalog_id: "dips",     sets: 3, reps: null, duration_seconds: null, notes: "Adicionar quando conseguir 2 pull-ups" },
      { catalog_id: "push_up",  sets: 3, reps: null, duration_seconds: null, notes: "Adicionar quando conseguir dips" },
    ],
  },
  {
    id: "skill_muscleup_prog_2", skill: "MUSCLE_UP", progression_level: 2,
    progression_name: "High Pull-up",
    description: "Pull-up com tração alta, queixo bem acima da barra. Pré-requisito para o muscle up.",
    exercises: [
      { catalog_id: "pull_up_high",     sets: 3, reps: 4,  duration_seconds: null },
      { catalog_id: "pull_up",          sets: 3, reps: 7,  duration_seconds: null },
      { catalog_id: "straight_bar_dip", sets: 3, reps: 3,  duration_seconds: null },
      { catalog_id: "push_up",          sets: 3, reps: 15, duration_seconds: null },
    ],
  },
  {
    id: "skill_muscleup_prog_3", skill: "MUSCLE_UP", progression_level: 3,
    progression_name: "Jumping Muscle Up",
    description: "Muscle up com impulso dos pés. Aprende o padrão de movimento sem carga total.",
    exercises: [
      { catalog_id: "muscle_up_jumping", sets: 3, reps: 5, duration_seconds: null },
      { catalog_id: "pull_up_high",      sets: 3, reps: 3, duration_seconds: null },
      { catalog_id: "pull_up",           sets: 3, reps: 5, duration_seconds: null },
      { catalog_id: "straight_bar_dip",  sets: 3, reps: 7, duration_seconds: null },
    ],
  },
  {
    id: "skill_muscleup_prog_4", skill: "MUSCLE_UP", progression_level: 4,
    progression_name: "Kipping Muscle Up",
    description: "Muscle up com balanço de quadril (kipping). Próximo passo antes do muscle up strict.",
    exercises: [
      { catalog_id: "muscle_up_kipping", sets: 3, reps: 2, duration_seconds: null },
      { catalog_id: "pull_up_high",      sets: 3, reps: 7, duration_seconds: null },
      { catalog_id: "muscle_up_negative",sets: 3, reps: 5, duration_seconds: null },
      { catalog_id: "straight_bar_dip",  sets: 3, reps: 8, duration_seconds: null },
    ],
  },
  {
    id: "skill_muscleup_prog_5", skill: "MUSCLE_UP", progression_level: 5,
    progression_name: "Muscle Up",
    description: "Muscle up strict completo. Nível avançado de calistenia de puxada.",
    exercises: [
      { catalog_id: "muscle_up",         sets: 3, reps: 1,  duration_seconds: null },
      { catalog_id: "muscle_up_kipping", sets: 3, reps: 4,  duration_seconds: null },
      { catalog_id: "pull_up",           sets: 3, reps: 8,  duration_seconds: null },
      { catalog_id: "straight_bar_dip",  sets: 3, reps: 10, duration_seconds: null },
    ],
  },

  // ── PISTOL SQUAT ────────────────────────────────────────
  {
    id: "skill_pistol_prog_1", skill: "PISTOL_SQUAT", progression_level: 1,
    progression_name: "Deep Squat",
    description: "Base de mobilidade e força unilateral. Prepara tornozelo, joelho e quadril.",
    exercises: [
      { catalog_id: "deep_squat",       sets: 3, reps: 30, duration_seconds: null },
      { catalog_id: "lunge",            sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "one_leg_calf_raise",sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "deep_squat_hold",  sets: 3, reps: null, duration_seconds: 20 },
    ],
  },
  {
    id: "skill_pistol_prog_2", skill: "PISTOL_SQUAT", progression_level: 2,
    progression_name: "Bulgarian Squat",
    description: "Agachamento unilateral com pé elevado. Desenvolve força e equilíbrio.",
    exercises: [
      { catalog_id: "bulgarian_split_squat", sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "deep_squat",            sets: 3, reps: 25, duration_seconds: null },
      { catalog_id: "lunge",                 sets: 3, reps: 15, duration_seconds: null },
      { catalog_id: "deep_squat_hold",       sets: 3, reps: null, duration_seconds: 21 },
    ],
  },
  {
    id: "skill_pistol_prog_3", skill: "PISTOL_SQUAT", progression_level: 3,
    progression_name: "Archer Squat",
    description: "Agachamento com perna lateral estendida. Transição para o pistol.",
    exercises: [
      { catalog_id: "archer_squat",          sets: 3, reps: 5,  duration_seconds: null },
      { catalog_id: "bulgarian_split_squat", sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "deep_squat",            sets: 3, reps: 25, duration_seconds: null },
      { catalog_id: "lunge",                 sets: 3, reps: 10, duration_seconds: null },
    ],
  },
  {
    id: "skill_pistol_prog_4", skill: "PISTOL_SQUAT", progression_level: 4,
    progression_name: "Bench Pistol Squat",
    description: "Pistol agachando até o banco. Reduz amplitude exigida.",
    exercises: [
      { catalog_id: "pistol_squat_bench",    sets: 3, reps: 15, duration_seconds: null },
      { catalog_id: "archer_squat",          sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "bulgarian_split_squat", sets: 3, reps: 15, duration_seconds: null },
      { catalog_id: "deep_squat",            sets: 3, reps: 26, duration_seconds: null },
    ],
  },
  {
    id: "skill_pistol_prog_5", skill: "PISTOL_SQUAT", progression_level: 5,
    progression_name: "Assisted Pistol Squat",
    description: "Pistol com apoio em superfície. Próximo do movimento completo.",
    exercises: [
      { catalog_id: "pistol_squat_assisted", sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "pistol_squat_bench",    sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "bulgarian_split_squat", sets: 3, reps: 12, duration_seconds: null },
      { catalog_id: "deep_squat",            sets: 3, reps: 26, duration_seconds: null },
    ],
  },
  {
    id: "skill_pistol_prog_6", skill: "PISTOL_SQUAT", progression_level: 6,
    progression_name: "Rolling Pistol Squat",
    description: "Pistol usando impulso do rolamento para sair do fundo.",
    exercises: [
      { catalog_id: "pistol_squat",          sets: 3, reps: 5,  duration_seconds: null, notes: "Rolling Pistol Squat" },
      { catalog_id: "pistol_squat_assisted", sets: 3, reps: 5,  duration_seconds: null },
      { catalog_id: "archer_squat",          sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "deep_squat",            sets: 3, reps: 25, duration_seconds: null },
    ],
  },
  {
    id: "skill_pistol_prog_7", skill: "PISTOL_SQUAT", progression_level: 7,
    progression_name: "Elevated Pistol Squat",
    description: "Pistol em superfície elevada, permitindo maior amplitude de movimento.",
    exercises: [
      { catalog_id: "pistol_squat_elevated", sets: 3, reps: 5, duration_seconds: null },
      { catalog_id: "pistol_squat",          sets: 3, reps: 6, duration_seconds: null, notes: "Rolling" },
      { catalog_id: "archer_squat",          sets: 3, reps: 10, duration_seconds: null },
      { catalog_id: "deep_squat",            sets: 3, reps: 25, duration_seconds: null },
    ],
  },
  {
    id: "skill_pistol_prog_8", skill: "PISTOL_SQUAT", progression_level: 8,
    progression_name: "Pistol Squat",
    description: "Agachamento pistola completo. Amplitude total, sem apoio.",
    exercises: [
      { catalog_id: "pistol_squat",          sets: 3, reps: 2,  duration_seconds: null },
      { catalog_id: "pistol_squat_elevated", sets: 3, reps: 5,  duration_seconds: null },
      { catalog_id: "bulgarian_split_squat", sets: 3, reps: 12, duration_seconds: null },
      { catalog_id: "deep_squat",            sets: 3, reps: 25, duration_seconds: null },
    ],
  },

  // ── V-SIT ───────────────────────────────────────────────
  {
    id: "skill_vsit_prog_1", skill: "V_SIT", progression_level: 1,
    progression_name: "Straddle Leg Raise Hold",
    description: "Segura as pernas abertas para desenvolver força abdominal e de quadril.",
    exercises: [
      { catalog_id: "straddle_leg_raise", sets: 3, reps: null, duration_seconds: 10 },
      { catalog_id: "scapula_dip",        sets: 3, reps: 5,   duration_seconds: null },
      { catalog_id: "straddle_leg_raise", sets: 3, reps: 8,   duration_seconds: null },
      { catalog_id: "knee_raise_bar",     sets: 3, reps: 10,  duration_seconds: null },
    ],
  },
  {
    id: "skill_vsit_prog_2", skill: "V_SIT", progression_level: 2,
    progression_name: "Leg Raise Hold",
    description: "Segura as pernas unidas elevadas. Maior dificuldade que o straddle.",
    exercises: [
      { catalog_id: "leg_raise_hold",  sets: 3, reps: null, duration_seconds: 10 },
      { catalog_id: "scapula_dip",     sets: 3, reps: 5,   duration_seconds: null, notes: "Advanced Scapula Dips" },
      { catalog_id: "leg_raise",       sets: 3, reps: 8,   duration_seconds: null },
      { catalog_id: "knee_raise_bar",  sets: 3, reps: 10,  duration_seconds: null },
    ],
  },

  // ── HANDSTAND PUSH-UP ────────────────────────────────────
  {
    id: "skill_hspu_prog_1", skill: "HANDSTAND_PUSH_UP", progression_level: 1,
    progression_name: "Pike Push-up",
    description: "Base do HSPU. Padrão de movimento vertical de empurrar com os ombros.",
    exercises: [
      { catalog_id: "pike_push_up",   sets: 3, reps: 5,   duration_seconds: null },
      { catalog_id: "hindu_push_up",  sets: 3, reps: 3,   duration_seconds: null },
      { catalog_id: "headstand",      sets: 3, reps: null, duration_seconds: 10 },
      { catalog_id: "wall_handstand", sets: 3, reps: null, duration_seconds: 10 },
    ],
  },
  {
    id: "skill_hspu_prog_2", skill: "HANDSTAND_PUSH_UP", progression_level: 2,
    progression_name: "Advanced Pike Push-up",
    description: "Pike push-up com pés elevados. Maior transferência de força para o HSPU.",
    exercises: [
      { catalog_id: "pike_push_up_adv", sets: 3, reps: 3,   duration_seconds: null },
      { catalog_id: "wall_handstand",   sets: 3, reps: null, duration_seconds: 15 },
      { catalog_id: "pike_push_up",     sets: 3, reps: 10,  duration_seconds: null },
      { catalog_id: "headstand",        sets: 3, reps: null, duration_seconds: 15 },
    ],
  },
  {
    id: "skill_hspu_prog_3", skill: "HANDSTAND_PUSH_UP", progression_level: 3,
    progression_name: "Wall Handstand Push-up",
    description: "HSPU com apoio na parede. Força completa de empurrar vertical.",
    exercises: [
      { catalog_id: "wall_hspu",       sets: 3, reps: 3,   duration_seconds: null },
      { catalog_id: "handstand",       sets: 3, reps: null, duration_seconds: 10 },
      { catalog_id: "pike_push_up_adv",sets: 3, reps: 4,   duration_seconds: null },
      { catalog_id: "frog_stand",      sets: 3, reps: null, duration_seconds: 12 },
    ],
  },
  {
    id: "skill_hspu_prog_4", skill: "HANDSTAND_PUSH_UP", progression_level: 4,
    progression_name: "Negative Handstand Push-up",
    description: "Fase excêntrica do HSPU. Controle total da descida.",
    exercises: [
      { catalog_id: "hspu_negative",   sets: 3, reps: 3,   duration_seconds: null },
      { catalog_id: "wall_hspu",       sets: 3, reps: 5,   duration_seconds: null },
      { catalog_id: "handstand",       sets: 3, reps: null, duration_seconds: 20 },
      { catalog_id: "pike_push_up_adv",sets: 3, reps: 10,  duration_seconds: null },
    ],
  },
  {
    id: "skill_hspu_prog_5", skill: "HANDSTAND_PUSH_UP", progression_level: 5,
    progression_name: "Handstand Push-up",
    description: "HSPU completo. Elite de força de empurrar vertical.",
    exercises: [
      { catalog_id: "hspu",            sets: 3, reps: 2,   duration_seconds: null },
      { catalog_id: "wall_hspu",       sets: 3, reps: 6,   duration_seconds: null },
      { catalog_id: "handstand",       sets: 3, reps: null, duration_seconds: 30 },
      { catalog_id: "pike_push_up_adv",sets: 3, reps: 12,  duration_seconds: null },
    ],
  },
];
