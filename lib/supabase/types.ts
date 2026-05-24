export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // ── Canonical exercise library ──────────────────────────
      exercise_catalog: {
        Row: {
          id: string;
          slug: string;
          name: string;
          exercise_type:
            | "calisthenics"
            | "weight"
            | "timed"
            | "plyometric"
            | "cardio"
            | "mobility";
          primary_muscles: Json;
          secondary_muscles: Json;
          movement_pattern: string;
          difficulty_level: "beginner" | "intermediate" | "advanced" | "elite";
          is_system: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["exercise_catalog"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["exercise_catalog"]["Insert"]
        >;
      };

      // ── Skill progressions ──────────────────────────────────
      skill_progressions: {
        Row: {
          id: string;
          slug: string;
          skill:
            | "PLANCHE"
            | "MUSCLE_UP"
            | "PISTOL_SQUAT"
            | "V_SIT"
            | "HANDSTAND_PUSH_UP";
          progression_level: number;
          progression_name: string;
          description: string | null;
          is_system: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["skill_progressions"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["skill_progressions"]["Insert"]
        >;
      };

      skill_progression_exercises: {
        Row: {
          id: string;
          progression_id: string;
          catalog_id: string;
          sets: number;
          reps: number | null;
          duration_seconds: number | null;
          notes: string | null;
          order_index: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["skill_progression_exercises"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["skill_progression_exercises"]["Insert"]
        >;
      };

      // ── User profile ─────────────────────────────────────────
      user_profile: {
        Row: {
          id: string;
          name: string;
          birth_date: string;
          biological_sex: "male" | "female";
          height_cm: number;
          weight_kg: number;
          goal_weight_kg: number;
          daily_calories_target: number;
          daily_protein_target_g: number;
          sleep_target_hours: number;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["user_profile"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["user_profile"]["Insert"]
        >;
      };

      // ── Food / nutrition ─────────────────────────────────────
      recipes: {
        Row: {
          id: string;
          name: string;
          category: string;
          prep_time_min: number;
          calories: number;
          protein_g: number;
          cost_brl: number | null;
          ingredients: Json;
          steps: Json;
          substitutions: Json | null;
          calorie_tips: Json | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["recipes"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["recipes"]["Insert"]>;
      };

      food_log: {
        Row: {
          id: string;
          logged_at: string;
          date: string;
          name: string;
          calories: number;
          protein_g: number | null;
          notes: string | null;
          recipe_id: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["food_log"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["food_log"]["Insert"]>;
      };

      // ── Weight ───────────────────────────────────────────────
      weight_log: {
        Row: {
          id: string;
          date: string;
          weight_kg: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["weight_log"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["weight_log"]["Insert"]>;
      };

      // ── Sleep ────────────────────────────────────────────────
      sleep_log: {
        Row: {
          id: string;
          date: string;
          slept_at: string;
          woke_at: string;
          duration_min: number;
          quality: "poor" | "fair" | "good" | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["sleep_log"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["sleep_log"]["Insert"]>;
      };

      // ── Workout structure ─────────────────────────────────────
      workout_routines: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_system: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["workout_routines"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["workout_routines"]["Insert"]
        >;
      };

      routine_slots: {
        Row: {
          id: string;
          routine_id: string;
          slot_name: string;
          default_day_of_week: number;
          /** Human-readable label for the day (e.g. "Segunda") */
          default_day_label: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["routine_slots"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["routine_slots"]["Insert"]
        >;
      };

      workout_variations: {
        Row: {
          id: string;
          slot_id: string | null;
          name: string;
          description: string | null;
          estimated_duration_min: number | null;
          /** strength | hypertrophy | power | endurance | cardio | skill */
          training_focus: string | null;
          is_system: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["workout_variations"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["workout_variations"]["Insert"]
        >;
      };

      exercises: {
        Row: {
          id: string;
          variation_id: string;
          /** Nullable when catalog_id is set — name comes from exercise_catalog */
          name: string | null;
          catalog_id: string | null;
          target_muscles: string | null;
          sets: number;
          reps_min: number | null;
          reps_max: number | null;
          duration_seconds: number | null;
          rest_seconds: number;
          exercise_type:
            | "weight"
            | "calisthenics"
            | "timed"
            | "plyometric"
            | "cardio"
            | "mobility";
          /** normal | max_reps | timed */
          training_style: "normal" | "max_reps" | "timed";
          difficulty_options: Json | null;
          notes: string | null;
          order_index: number;
        };
        Insert: Omit<
          Database["public"]["Tables"]["exercises"]["Row"],
          "id"
        >;
        Update: Partial<Database["public"]["Tables"]["exercises"]["Insert"]>;
      };

      // ── User workout config ───────────────────────────────────
      user_routine_config: {
        Row: {
          id: string;
          active_routine_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["user_routine_config"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["user_routine_config"]["Insert"]
        >;
      };

      user_day_variation: {
        Row: {
          id: string;
          day_of_week: number;
          slot_id: string | null;
          active_variation_id: string | null;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["user_day_variation"]["Row"],
          "id" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["user_day_variation"]["Insert"]
        >;
      };

      // ── Workout sessions & sets ───────────────────────────────
      workout_sessions: {
        Row: {
          id: string;
          variation_id: string;
          started_at: string;
          finished_at: string | null;
          total_duration_min: number | null;
          status: "in_progress" | "completed" | "skipped";
          notes: string | null;
        };
        Insert: Omit<
          Database["public"]["Tables"]["workout_sessions"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["workout_sessions"]["Insert"]
        >;
      };

      workout_sets: {
        Row: {
          id: string;
          session_id: string;
          exercise_id: string;
          set_number: number;
          reps_done: number | null;
          weight_kg: number | null;
          difficulty_label: string | null;
          rest_taken_seconds: number | null;
          notes: string | null;
          logged_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["workout_sets"]["Row"],
          "id"
        >;
        Update: Partial<
          Database["public"]["Tables"]["workout_sets"]["Insert"]
        >;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ── Convenience re-exports ─────────────────────────────────────
export type Tables = Database["public"]["Tables"];

export type ExerciseCatalogRow =
  Tables["exercise_catalog"]["Row"];
export type SkillProgressionRow =
  Tables["skill_progressions"]["Row"];
export type SkillProgressionExerciseRow =
  Tables["skill_progression_exercises"]["Row"];
export type WorkoutRoutineRow =
  Tables["workout_routines"]["Row"];
export type RoutineSlotRow =
  Tables["routine_slots"]["Row"];
export type WorkoutVariationRow =
  Tables["workout_variations"]["Row"];
export type ExerciseRow =
  Tables["exercises"]["Row"];
export type WorkoutSessionRow =
  Tables["workout_sessions"]["Row"];
export type WorkoutSetRow =
  Tables["workout_sets"]["Row"];
export type FoodLogRow =
  Tables["food_log"]["Row"];
export type WeightLogRow =
  Tables["weight_log"]["Row"];
export type SleepLogRow =
  Tables["sleep_log"]["Row"];
export type RecipeRow =
  Tables["recipes"]["Row"];
export type UserProfileRow =
  Tables["user_profile"]["Row"];
