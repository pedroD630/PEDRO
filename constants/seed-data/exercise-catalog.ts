export interface CatalogEntry {
  slug: string;
  name: string;
  exercise_type: "calisthenics" | "weight" | "timed" | "plyometric" | "cardio" | "mobility";
  primary_muscles: string[];
  secondary_muscles: string[];
  movement_pattern: string;
  difficulty_level: "beginner" | "intermediate" | "advanced" | "elite";
}

/** Canonical exercise library — 99 exercises */
export const EXERCISE_CATALOG: CatalogEntry[] = [
  // ── Push ────────────────────────────────────────────────
  { slug: "dips",               name: "Dips",                          exercise_type: "calisthenics", primary_muscles: ["chest","triceps","front_delts"],             secondary_muscles: [],          movement_pattern: "push", difficulty_level: "intermediate" },
  { slug: "push_up",            name: "Flexão Padrão",                 exercise_type: "calisthenics", primary_muscles: ["chest","triceps","front_delts"],             secondary_muscles: ["core"],    movement_pattern: "push", difficulty_level: "beginner" },
  { slug: "push_up_decline",    name: "Flexão Declinada",              exercise_type: "calisthenics", primary_muscles: ["upper_chest","triceps","front_delts"],        secondary_muscles: [],          movement_pattern: "push", difficulty_level: "intermediate" },
  { slug: "push_up_incline",    name: "Flexão Inclinada",              exercise_type: "calisthenics", primary_muscles: ["lower_chest","triceps"],                     secondary_muscles: [],          movement_pattern: "push", difficulty_level: "beginner" },
  { slug: "push_up_diamond",    name: "Flexão Diamante",               exercise_type: "calisthenics", primary_muscles: ["triceps","inner_chest"],                     secondary_muscles: [],          movement_pattern: "push", difficulty_level: "intermediate" },
  { slug: "pike_push_up",       name: "Pike Push-up",                  exercise_type: "calisthenics", primary_muscles: ["front_delts","triceps"],                     secondary_muscles: ["upper_chest"], movement_pattern: "push", difficulty_level: "intermediate" },
  { slug: "pike_push_up_adv",   name: "Pike Push-up Avançado",         exercise_type: "calisthenics", primary_muscles: ["front_delts","triceps"],                     secondary_muscles: [],          movement_pattern: "push", difficulty_level: "advanced" },
  { slug: "overhead_press_db",  name: "Desenvolvimento com Halteres",  exercise_type: "weight",       primary_muscles: ["front_delts","triceps"],                     secondary_muscles: ["upper_traps"], movement_pattern: "push", difficulty_level: "beginner" },
  { slug: "overhead_press_bb",  name: "Desenvolvimento com Barra",     exercise_type: "weight",       primary_muscles: ["front_delts","triceps"],                     secondary_muscles: ["upper_traps"], movement_pattern: "push", difficulty_level: "intermediate" },
  { slug: "bench_press",        name: "Supino Reto",                   exercise_type: "weight",       primary_muscles: ["chest","triceps","front_delts"],             secondary_muscles: [],          movement_pattern: "push", difficulty_level: "intermediate" },
  { slug: "chest_fly",          name: "Crucifixo com Halteres",        exercise_type: "weight",       primary_muscles: ["chest"],                                     secondary_muscles: [],          movement_pattern: "push", difficulty_level: "beginner" },
  { slug: "lateral_raise",      name: "Elevação Lateral",              exercise_type: "weight",       primary_muscles: ["lateral_delts"],                             secondary_muscles: [],          movement_pattern: "push", difficulty_level: "beginner" },
  { slug: "reverse_fly",        name: "Voador Reverso",                exercise_type: "weight",       primary_muscles: ["rear_delts","rhomboids"],                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "arnold_press",       name: "Arnold Press",                  exercise_type: "weight",       primary_muscles: ["all_delts","triceps"],                       secondary_muscles: [],          movement_pattern: "push", difficulty_level: "intermediate" },
  { slug: "triceps_dip_bench",  name: "Tríceps no Banco",              exercise_type: "calisthenics", primary_muscles: ["triceps"],                                   secondary_muscles: [],          movement_pattern: "push", difficulty_level: "beginner" },
  { slug: "rotator_cuff_warmup",name: "Aquecimento do Manguito Rotador",exercise_type: "mobility",    primary_muscles: ["rotator_cuff"],                              secondary_muscles: [],          movement_pattern: "mobility", difficulty_level: "beginner" },
  { slug: "hindu_push_up",      name: "Hindu Push-up",                 exercise_type: "calisthenics", primary_muscles: ["chest","front_delts","core"],                secondary_muscles: [],          movement_pattern: "push", difficulty_level: "beginner" },
  { slug: "straight_bar_dip",   name: "Straight Bar Dip",              exercise_type: "calisthenics", primary_muscles: ["chest","triceps"],                           secondary_muscles: [],          movement_pattern: "push", difficulty_level: "advanced" },

  // ── Pull ────────────────────────────────────────────────
  { slug: "pull_up",            name: "Pull-up",                       exercise_type: "calisthenics", primary_muscles: ["lats","biceps","lower_traps"],               secondary_muscles: ["core"],    movement_pattern: "pull", difficulty_level: "intermediate" },
  { slug: "pull_up_band",       name: "Pull-up com Elástico",          exercise_type: "calisthenics", primary_muscles: ["lats","biceps"],                             secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "pull_up_negative",   name: "Pull-up Negativo",              exercise_type: "calisthenics", primary_muscles: ["lats","biceps","lower_traps"],               secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "pull_up_high",       name: "High Pull-up",                  exercise_type: "calisthenics", primary_muscles: ["lats","biceps"],                             secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "advanced" },
  { slug: "scapular_pull_up",   name: "Scapular Pull-up",              exercise_type: "calisthenics", primary_muscles: ["lower_traps","serratus"],                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "dead_hang",          name: "Dead Hang Ativo",               exercise_type: "timed",        primary_muscles: ["lats","forearms","core"],                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "inverted_row",       name: "Remada Invertida",              exercise_type: "calisthenics", primary_muscles: ["lats","mid_traps","rhomboids"],              secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "bent_over_row",      name: "Remada Curvada com Barra",      exercise_type: "weight",       primary_muscles: ["lats","mid_traps","rhomboids","biceps"],     secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "intermediate" },
  { slug: "single_arm_row",     name: "Remada Unilateral com Halter",  exercise_type: "weight",       primary_muscles: ["lats","mid_traps","rhomboids"],              secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "pullover",           name: "Pullover",                      exercise_type: "weight",       primary_muscles: ["lats","chest"],                              secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "hammer_curl",        name: "Rosca Martelo",                 exercise_type: "weight",       primary_muscles: ["brachialis","brachioradialis","biceps"],      secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "alternating_curl",   name: "Rosca Alternada",               exercise_type: "weight",       primary_muscles: ["biceps"],                                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "concentration_curl", name: "Rosca Concentrada",             exercise_type: "weight",       primary_muscles: ["biceps"],                                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "shrug",              name: "Encolhimento de Ombros",        exercise_type: "weight",       primary_muscles: ["upper_traps"],                               secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "muscle_up",          name: "Muscle Up",                     exercise_type: "calisthenics", primary_muscles: ["lats","chest","triceps"],                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "advanced" },
  { slug: "muscle_up_kipping",  name: "Kipping Muscle Up",             exercise_type: "calisthenics", primary_muscles: ["lats","chest","triceps"],                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "advanced" },
  { slug: "muscle_up_jumping",  name: "Jumping Muscle Up",             exercise_type: "calisthenics", primary_muscles: ["lats","chest","triceps"],                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "intermediate" },
  { slug: "muscle_up_negative", name: "Muscle Up Negativo",            exercise_type: "calisthenics", primary_muscles: ["lats","chest","triceps"],                    secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "intermediate" },
  { slug: "body_row",           name: "Body Row",                      exercise_type: "calisthenics", primary_muscles: ["lats","biceps"],                             secondary_muscles: [],          movement_pattern: "pull", difficulty_level: "beginner" },
  { slug: "scapula_dip",        name: "Scapula Dip",                   exercise_type: "calisthenics", primary_muscles: ["lower_traps","serratus"],                    secondary_muscles: [],          movement_pattern: "push", difficulty_level: "beginner" },

  // ── Legs / Hinge ────────────────────────────────────────
  { slug: "squat_barbell",          name: "Agachamento com Barra",           exercise_type: "weight",       primary_muscles: ["quads","glutes","hamstrings"],        secondary_muscles: ["core"],   movement_pattern: "squat",  difficulty_level: "intermediate" },
  { slug: "bulgarian_split_squat",  name: "Agachamento Búlgaro",             exercise_type: "weight",       primary_muscles: ["quads","glutes","hamstrings"],        secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "intermediate" },
  { slug: "lunge",                  name: "Afundo",                          exercise_type: "calisthenics", primary_muscles: ["quads","glutes"],                     secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "beginner" },
  { slug: "rdl",                    name: "Stiff com Halteres",              exercise_type: "weight",       primary_muscles: ["hamstrings","glutes","lower_back"],    secondary_muscles: [],         movement_pattern: "hinge",  difficulty_level: "intermediate" },
  { slug: "hip_thrust",             name: "Elevação Pélvica",                exercise_type: "weight",       primary_muscles: ["glutes","hamstrings"],                secondary_muscles: [],         movement_pattern: "hinge",  difficulty_level: "beginner" },
  { slug: "calf_raise_unilateral",  name: "Elevação de Panturrilha Unilateral", exercise_type: "calisthenics", primary_muscles: ["gastrocnemius","soleus"],         secondary_muscles: [],         movement_pattern: "calf",   difficulty_level: "beginner" },
  { slug: "one_leg_calf_raise",     name: "Elevação de Panturrilha (Piso)",  exercise_type: "calisthenics", primary_muscles: ["gastrocnemius","soleus"],             secondary_muscles: [],         movement_pattern: "calf",   difficulty_level: "beginner" },
  { slug: "pistol_squat",           name: "Agachamento Pistola",             exercise_type: "calisthenics", primary_muscles: ["quads","glutes"],                     secondary_muscles: ["core"],   movement_pattern: "squat",  difficulty_level: "advanced" },
  { slug: "pistol_squat_wall",      name: "Agachamento Pistola (Parede)",    exercise_type: "calisthenics", primary_muscles: ["quads","glutes"],                     secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "intermediate" },
  { slug: "pistol_squat_bench",     name: "Agachamento Pistola no Banco",    exercise_type: "calisthenics", primary_muscles: ["quads","glutes"],                     secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "intermediate" },
  { slug: "pistol_squat_assisted",  name: "Agachamento Pistola Assistido",   exercise_type: "calisthenics", primary_muscles: ["quads","glutes"],                     secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "intermediate" },
  { slug: "pistol_squat_elevated",  name: "Agachamento Pistola Elevado",     exercise_type: "calisthenics", primary_muscles: ["quads","glutes"],                     secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "advanced" },
  { slug: "archer_squat",           name: "Archer Squat",                    exercise_type: "calisthenics", primary_muscles: ["quads","adductors"],                  secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "intermediate" },
  { slug: "deep_squat",             name: "Deep Squat",                      exercise_type: "calisthenics", primary_muscles: ["quads","glutes"],                     secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "beginner" },
  { slug: "deep_squat_hold",        name: "Deep Squat Hold",                 exercise_type: "timed",        primary_muscles: ["quads","glutes","ankles"],            secondary_muscles: [],         movement_pattern: "squat",  difficulty_level: "beginner" },
  { slug: "nordic_curl",            name: "Nordic Curl",                     exercise_type: "calisthenics", primary_muscles: ["hamstrings"],                         secondary_muscles: [],         movement_pattern: "hinge",  difficulty_level: "advanced" },

  // ── Plyometrics ─────────────────────────────────────────
  { slug: "jump_squat",     name: "Jump Squat",      exercise_type: "plyometric", primary_muscles: ["quads","glutes"],              secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "intermediate" },
  { slug: "box_jump",       name: "Box Jump",        exercise_type: "plyometric", primary_muscles: ["quads","glutes","calves"],     secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "intermediate" },
  { slug: "broad_jump",     name: "Broad Jump",      exercise_type: "plyometric", primary_muscles: ["quads","glutes"],              secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "intermediate" },
  { slug: "depth_jump",     name: "Depth Jump",      exercise_type: "plyometric", primary_muscles: ["quads","glutes"],              secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "advanced" },
  { slug: "burpee",         name: "Burpee",          exercise_type: "plyometric", primary_muscles: ["full_body"],                  secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "intermediate" },
  { slug: "lunge_jump",     name: "Afundo com Salto",exercise_type: "plyometric", primary_muscles: ["quads","glutes"],              secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "intermediate" },
  { slug: "skater_hop",     name: "Skater Hops",     exercise_type: "plyometric", primary_muscles: ["glutes","quads","adductors"], secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "beginner" },
  { slug: "knee_tuck_jump", name: "Knee Tuck Jump",  exercise_type: "plyometric", primary_muscles: ["quads","glutes","core"],      secondary_muscles: [],  movement_pattern: "plyometric", difficulty_level: "intermediate" },

  // ── Cardio ──────────────────────────────────────────────
  { slug: "jump_rope",      name: "Pular Corda",     exercise_type: "cardio",     primary_muscles: ["calves","core"],              secondary_muscles: [],  movement_pattern: "cardio",     difficulty_level: "beginner" },
  { slug: "run_light",      name: "Corrida Leve",    exercise_type: "cardio",     primary_muscles: [],                             secondary_muscles: [],  movement_pattern: "cardio",     difficulty_level: "beginner" },
  { slug: "sprint",         name: "Sprint",          exercise_type: "cardio",     primary_muscles: ["quads","glutes","calves"],    secondary_muscles: [],  movement_pattern: "cardio",     difficulty_level: "intermediate" },
  { slug: "jumping_jacks",  name: "Jumping Jacks",   exercise_type: "cardio",     primary_muscles: [],                             secondary_muscles: [],  movement_pattern: "cardio",     difficulty_level: "beginner" },
  { slug: "high_knees",     name: "High Knees",      exercise_type: "cardio",     primary_muscles: ["hip_flexors","core"],         secondary_muscles: [],  movement_pattern: "cardio",     difficulty_level: "beginner" },
  { slug: "shadow_boxing",  name: "Shadow Boxing",   exercise_type: "cardio",     primary_muscles: [],                             secondary_muscles: [],  movement_pattern: "cardio",     difficulty_level: "beginner" },

  // ── Core ────────────────────────────────────────────────
  { slug: "ab_wheel",          name: "Ab Wheel Rollout",         exercise_type: "calisthenics", primary_muscles: ["abs","obliques","lower_back"],    secondary_muscles: [],         movement_pattern: "core", difficulty_level: "intermediate" },
  { slug: "plank",             name: "Prancha",                  exercise_type: "timed",        primary_muscles: ["abs","core"],                    secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "plank_side",        name: "Prancha Lateral",          exercise_type: "timed",        primary_muscles: ["obliques","core"],               secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "hollow_body",       name: "Body Hold",                exercise_type: "timed",        primary_muscles: ["abs","core"],                    secondary_muscles: [],         movement_pattern: "core", difficulty_level: "intermediate" },
  { slug: "knee_raise_bar",    name: "Elevação de Joelho na Barra",exercise_type: "calisthenics",primary_muscles: ["abs","hip_flexors"],             secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "leg_raise_seated",  name: "Elevação de Perna Sentado",exercise_type: "calisthenics", primary_muscles: ["abs","hip_flexors"],             secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "leg_raise",         name: "Leg Raise",                exercise_type: "calisthenics", primary_muscles: ["abs","hip_flexors"],             secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "leg_raise_hold",    name: "Leg Raise Hold",           exercise_type: "timed",        primary_muscles: ["abs","hip_flexors"],             secondary_muscles: [],         movement_pattern: "core", difficulty_level: "intermediate" },
  { slug: "straddle_leg_raise",name: "Straddle Leg Raise",       exercise_type: "calisthenics", primary_muscles: ["abs","hip_flexors","adductors"], secondary_muscles: [],         movement_pattern: "core", difficulty_level: "intermediate" },
  { slug: "ab_standard",       name: "Abdominal Padrão",         exercise_type: "calisthenics", primary_muscles: ["abs"],                          secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "superman",          name: "Superman",                 exercise_type: "calisthenics", primary_muscles: ["lower_back","glutes"],           secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "russian_twist",     name: "Russian Twists",           exercise_type: "calisthenics", primary_muscles: ["obliques"],                     secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "bicycle_crunch",    name: "Bicycle Crunches",         exercise_type: "calisthenics", primary_muscles: ["abs","obliques"],                secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "v_up",              name: "V-Up",                     exercise_type: "calisthenics", primary_muscles: ["abs","hip_flexors"],             secondary_muscles: [],         movement_pattern: "core", difficulty_level: "intermediate" },
  { slug: "mountain_climber",  name: "Mountain Climbers",        exercise_type: "calisthenics", primary_muscles: ["core","hip_flexors"],            secondary_muscles: [],         movement_pattern: "core", difficulty_level: "beginner" },
  { slug: "plank_to_push_up",  name: "Plank to Push-up",         exercise_type: "calisthenics", primary_muscles: ["core","triceps","chest"],        secondary_muscles: [],         movement_pattern: "core", difficulty_level: "intermediate" },

  // ── Skills / Planche / HS ────────────────────────────────
  { slug: "planche_lean",   name: "Pseudo Planche Lean",    exercise_type: "timed",        primary_muscles: ["front_delts","chest","core"],   secondary_muscles: [],  movement_pattern: "push",  difficulty_level: "intermediate" },
  { slug: "pseudo_push_up", name: "Pseudo Push-up",         exercise_type: "calisthenics", primary_muscles: ["front_delts","chest","core"],   secondary_muscles: [],  movement_pattern: "push",  difficulty_level: "intermediate" },
  { slug: "frog_stand",     name: "Frog Stand",             exercise_type: "timed",        primary_muscles: ["front_delts","core","wrists"],  secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "intermediate" },
  { slug: "tuck_planche",   name: "Tuck Planche",           exercise_type: "timed",        primary_muscles: ["front_delts","chest","core"],   secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "advanced" },
  { slug: "tuck_planche_adv",  name: "Advanced Tuck Planche", exercise_type: "timed",     primary_muscles: ["front_delts","chest","core"],   secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "advanced" },
  { slug: "tuck_planche_swing",name: "Tuck Planche Swing",   exercise_type: "calisthenics",primary_muscles: ["front_delts","core"],           secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "advanced" },
  { slug: "straddle_planche",  name: "Straddle Planche",    exercise_type: "timed",        primary_muscles: ["front_delts","chest","core"],   secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "elite" },
  { slug: "handstand_lean",    name: "Handstand Lean",      exercise_type: "calisthenics", primary_muscles: ["front_delts","core"],           secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "advanced" },
  { slug: "planche",           name: "Planche",             exercise_type: "timed",        primary_muscles: ["front_delts","chest","core"],   secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "elite" },
  { slug: "wall_handstand",    name: "Wall Handstand",      exercise_type: "timed",        primary_muscles: ["all_delts","core","wrists"],    secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "intermediate" },
  { slug: "headstand",         name: "Headstand",           exercise_type: "timed",        primary_muscles: ["all_delts","core"],             secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "intermediate" },
  { slug: "handstand",         name: "Handstand",           exercise_type: "timed",        primary_muscles: ["all_delts","core","wrists"],    secondary_muscles: [],  movement_pattern: "skill", difficulty_level: "advanced" },
  { slug: "wall_hspu",         name: "Wall Handstand Push-up", exercise_type: "calisthenics", primary_muscles: ["all_delts","triceps"],      secondary_muscles: [],  movement_pattern: "push",  difficulty_level: "advanced" },
  { slug: "hspu_negative",     name: "Handstand Push-up Negativo", exercise_type: "calisthenics", primary_muscles: ["all_delts","triceps"], secondary_muscles: [],  movement_pattern: "push",  difficulty_level: "advanced" },
  { slug: "hspu",              name: "Handstand Push-up",   exercise_type: "calisthenics", primary_muscles: ["all_delts","triceps"],          secondary_muscles: [],  movement_pattern: "push",  difficulty_level: "elite" },
  { slug: "scapula_dip",       name: "Scapula Dip",         exercise_type: "calisthenics", primary_muscles: ["lower_traps","serratus"],       secondary_muscles: [],  movement_pattern: "push",  difficulty_level: "beginner" },
];

/** Lookup: slug → index in EXERCISE_CATALOG (for fast access) */
export const CATALOG_BY_SLUG = Object.fromEntries(
  EXERCISE_CATALOG.map((e, i) => [e.slug, i])
);
