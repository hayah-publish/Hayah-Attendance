import { RequestsView } from "@/components/requests/RequestsView";

export const metadata = {
  title: "الطلبات | Hayah-Attendance",
  description: "تقديم ومتابعة طلبات الإجازات والأذونات في نظام Hayah-Attendance",
};

export default function RequestsPage() {
  return <RequestsView />;
}
