import { NextResponse } from "next/server";
import { fetchAndDecryptUser } from "@/lib/userService";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id") || "mo991999";
    const user = await fetchAndDecryptUser(userId);
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}
