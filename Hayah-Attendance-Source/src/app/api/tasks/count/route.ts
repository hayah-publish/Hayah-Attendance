import { NextRequest, NextResponse } from "next/server";
import { fetchUserTasks } from "@/lib/tasksService";
import { fetchUserReviews } from "@/lib/reviewsService";
import { DEFAULT_USER } from "@/lib/userService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId") || searchParams.get("send_to") || DEFAULT_USER.id;

    const [tasks, reviews] = await Promise.all([
      fetchUserTasks(userId),
      fetchUserReviews(userId),
    ]);

    const tasksCount = tasks?.length || 0;
    const reviewsCount = reviews?.length || 0;
    const totalCount = tasksCount + reviewsCount;

    return NextResponse.json({
      success: true,
      userId,
      tasksCount,
      reviewsCount,
      totalCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to calculate total tasks count" },
      { status: 500 }
    );
  }
}
