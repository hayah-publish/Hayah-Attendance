import { DashboardView } from "@/components/dashboard/DashboardView";

export const metadata = {
  title: "الرئيسية | Internal HD",
  description: "لوحة التحكم الرئيسية لمنصة استوديو HD الداخلية",
};

export default function HomePage() {
  return <DashboardView initialDate="الأحد، 27 سبتمبر" userName="سلمى" />;
}
