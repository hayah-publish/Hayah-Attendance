"use client";

import React, { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { TopNavbar } from "./TopNavbar";
import { Sidebar } from "./Sidebar";
import { TasksInboxCard } from "./TasksInboxCard";
import { UpdatesCard } from "./UpdatesCard";
import { CheckInBanner } from "./CheckInBanner";
import { ReviewTasksCard } from "./ReviewTasksCard";
import { AttendanceTimeline } from "./AttendanceTimeline";
import { AddTaskModal } from "./AddTaskModal";

interface DashboardViewProps {
  initialDate?: string;
  userName?: string;
}

export function DashboardView({
  initialDate = "الأحد، 27 سبتمبر",
  userName = "سلمى",
}: DashboardViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendance, setAttendance] = useState({
    checkInTime: "08:55 AM",
    checkOutTime: "--:--",
  });
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCheckIn = () => {
    const now = new Date();
    const formatted = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setAttendance((prev) => ({ ...prev, checkInTime: formatted }));
    showToast(`تم تسجيل الحضور بنجاح في ${formatted}`);
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-white flex flex-col antialiased selection:bg-[#89E043] selection:text-black">
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#16171B] border border-[#89E043]/50 text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#89E043]" />
          <span>{notification}</span>
        </div>
      )}

      <TopNavbar
        userName={userName}
        onNewClick={() => setIsModalOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 p-5 lg:p-7 overflow-y-auto">
          <div className="max-w-[1140px] mx-auto flex flex-col gap-3">
            <div className="flex justify-end px-3">
              <span className="text-xs font-semibold text-neutral-400 select-none">
                {initialDate}
              </span>
            </div>

            <div className="bg-[#0E0F12] border border-[#1C1E26] rounded-[32px] p-6 lg:p-7 flex flex-col gap-6 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className="lg:col-span-7 flex flex-col gap-5 justify-between">
                  <UpdatesCard
                    onDetailsClick={() => showToast("لا توجد تحديثات جديدة حالياً")}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
                    <CheckInBanner
                      dateStr="الاثنين، 17 سبتمبر"
                      onCheckIn={handleCheckIn}
                    />
                    <ReviewTasksCard
                      onDetailsClick={() => showToast("لا توجد مهام بانتظار مراجعتك")}
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col">
                  <TasksInboxCard
                    onDetailsClick={() => showToast("لا توجد مهام مرسلة إليك")}
                  />
                </div>
              </div>

              <div className="w-full border-t border-[#1F2129] my-1" />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-1">
                <div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#89E043] hover:bg-[#78CC38] active:scale-95 text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer select-none"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>اضافه مهمه</span>
                  </button>
                </div>

                <div className="flex items-start gap-8 self-end sm:self-auto">
                  <AttendanceTimeline
                    checkInTime={attendance.checkInTime || undefined}
                    checkOutTime={attendance.checkOutTime || undefined}
                  />

                  <div className="flex items-center gap-2 text-white font-bold text-base cursor-pointer select-none group pt-0.5">
                    <span>مهامي اليوم</span>
                    <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Sidebar userName={userName} />
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={(task) => {
          showToast(`تمت إضافة المهمة: "${task.title}" بنجاح`);
        }}
      />
    </div>
  );
}
