import { Suspense } from "react";
import { TasksView } from "@/components/tasks/TasksView";

export const metadata = {
  title: "مهامي اليوم | Hayah-Attendance",
  description: "إدارة ومتابعة مهام اليوم في نظام Hayah-Attendance",
};

export default function TasksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#141414]" />}>
      <TasksView />
    </Suspense>
  );
}
