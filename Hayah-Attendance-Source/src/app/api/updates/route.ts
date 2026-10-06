import { NextResponse } from "next/server";
import { fetchAndDecryptUpdates } from "@/lib/updatesService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const updates = await fetchAndDecryptUpdates();
    return NextResponse.json({ success: true, updates });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch updates" },
      { status: 500 }
    );
  }
}
