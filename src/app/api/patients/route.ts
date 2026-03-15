import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("patients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, patients: data });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to load patients" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = getSupabaseServerClient();

    const payload = {
      full_name: body.fullName,
      country: body.country,
      dob: body.dob,
      gender: body.gender,
      phone_code: body.phoneCode || "",
      phone: body.phone,
      full_phone_number: `${body.phoneCode || ""} ${body.phone}`.trim(),
      email: body.email,
      disease: body.disease,
      package_type: body.packageType,
      notes: body.notes || "",
      report_file_name: body.reportFileName || "",
      report_file_path: body.reportFilePath || "",
      status: "New",
    };

    const { data, error } = await supabase
      .from("patients")
      .insert(payload)
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
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}