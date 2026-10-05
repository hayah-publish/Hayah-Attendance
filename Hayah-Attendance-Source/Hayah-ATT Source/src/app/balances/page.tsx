import { BalancesView } from "@/components/balances/BalancesView";

export const metadata = {
  title: "الارصده | Hayah-Attendance",
  description: "متابعة أرصدة الإجازات وساعات العمل في نظام Hayah-Attendance",
};

export default function BalancesPage() {
  return <BalancesView userName="سلمى" />;
}
