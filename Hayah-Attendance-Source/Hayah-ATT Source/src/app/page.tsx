import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata = {
  title: "الرئيسية | Hayah-Attendance",
  description: "لوحة التحكم الرئيسية لمنصة Hayah-Attendance",
};

export default function HomePage() {
  return <DashboardView initialDate="الأحد، 27 سبتمبر" userName="سلمى" />;
}
