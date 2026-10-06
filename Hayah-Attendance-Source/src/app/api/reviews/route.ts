import { NextRequest, NextResponse } from "next/server";
import { fetchUserReviews, fetchAllReviews } from "@/lib/reviewsService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sendTo = searchParams.get("send_to");

    if (sendTo) {
      const reviews = await fetchUserReviews(sendTo);
      return NextResponse.json({ success: true, reviews });
    }

    const allReviews = await fetchAllReviews();
    return NextResponse.json({ success: true, reviews: allReviews });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
