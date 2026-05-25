// POST /api/skills/[skill]/advance
// Confirma ou recusa o avanço de nível para uma skill.
// Body: { confirm: true | false }

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { skill: string } }
) {
  const skill = params.skill.toUpperCase();
  const { confirm } = await req.json() as { confirm: boolean };

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // ── Buscar nível atual ────────────────────────────────────
  const { data: skillLevel, error: lvlErr } = await supabase
    .from("user_skill_level")
    .select("current_level, status")
    .eq("skill", skill)
    .maybeSingle();

  if (lvlErr || !skillLevel) {
    return NextResponse.json({ error: "Skill não encontrada" }, { status: 404 });
  }

  const fromLevel = (skillLevel as any).current_level as number;

  if (!confirm) {
    // Usuário recusou — volta para 'active', contagem zera (via nova sessão)
    await supabase
      .from("user_skill_level")
      .update({ status: "active", last_reviewed_at: new Date().toISOString() })
      .eq("skill", skill);

    return NextResponse.json({ advanced: false, current_level: fromLevel });
  }

  // ── Confirmar avanço ──────────────────────────────────────
  const toLevel = fromLevel + 1;

  // Verificar se próximo nível existe
  const { data: nextProg } = await supabase
    .from("skill_progressions")
    .select("progression_name")
    .eq("skill", skill)
    .eq("progression_level", toLevel)
    .maybeSingle();

  if (!nextProg) {
    return NextResponse.json(
      { error: "Já está no nível máximo" },
      { status: 400 }
    );
  }

  // Inserir histórico
  await supabase.from("skill_level_history").insert({
    skill,
    from_level: fromLevel,
    to_level: toLevel,
    reason: "auto_advance",
  });

  // Atualizar nível atual
  await supabase
    .from("user_skill_level")
    .update({
      current_level: toLevel,
      status: "active",
      started_at: new Date().toISOString(),
      last_reviewed_at: new Date().toISOString(),
    })
    .eq("skill", skill);

  return NextResponse.json({
    advanced: true,
    from_level: fromLevel,
    to_level: toLevel,
    next_progression_name: (nextProg as any).progression_name,
  });
}
