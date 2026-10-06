import { AttendanceView } from "@/components/attendance/AttendanceView";

export const metadata = {
  title: "الحضور | Hayah-Attendance",
  description: "سجل ومتابعة الحضور والانصراف في نظام Hayah-Attendance",
};

export default function AttendancePage() {
  return <AttendanceView />;
}
