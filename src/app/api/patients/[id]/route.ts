import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("patients")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, patient: data });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to update patient" },
      { status: 400 }
    );
  }
}

export async function DELETE(_req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const supabase = getSupabaseServerClient();

    const { error } = await supabase
      .from("patients")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to delete patient" },
      { status: 400 }
    );
  }
}