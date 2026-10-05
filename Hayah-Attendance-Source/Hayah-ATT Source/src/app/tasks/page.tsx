import { TasksView } from "@/components/tasks/TasksView";

export const metadata = {
  title: "مهامي اليوم | Hayah-Attendance",
  description: "إدارة ومتابعة مهام اليوم في نظام Hayah-Attendance",
};

export default function TasksPage() {
  return <TasksView currentDate="الأحد، 27 سبتمبر" userName="سلمى" />;
}
