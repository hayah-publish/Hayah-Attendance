import { NextRequest, NextResponse } from "next/server";
import { fetchUserTasks, fetchAllTasks } from "@/lib/tasksService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sendTo = searchParams.get("send_to");

    if (sendTo) {
      const tasks = await fetchUserTasks(sendTo);
      return NextResponse.json({ success: true, tasks });
    }

    const allTasks = await fetchAllTasks();
    return NextResponse.json({ success: true, tasks: allTasks });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
