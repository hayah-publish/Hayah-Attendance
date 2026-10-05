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
    <div
      className="min-h-screen bg-[#141414] text-[#F5F3EF] flex justify-center py-8 px-6 antialiased selection:bg-[#8FCB4E] selection:text-[#141414]"
      dir="rtl"
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1F1F1F] border border-[#8FCB4E]/60 text-[#F5F3EF] text-[13px] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#8FCB4E]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Frame 2147228928: 1376px width with 24px gap between Sidebar and Main Content */}
      <div
        className="w-full max-w-[1376px] flex flex-col lg:flex-row items-start justify-start gap-6"
        dir="rtl"
      >
        {/* 1. Right Side in RTL: Sidebar (264px width) */}
        <Sidebar userName={userName} />

        {/* 2. Left Side in RTL: Main Content Column (1088px width) */}
        <div className="w-[1088px] max-w-full flex flex-col gap-6" dir="rtl">
          
          {/* Top Header (Search on Right, Actions on Left) */}
          <TopNavbar
            userName="أهلاً، سلمى"
            userEmail="salmaghd-studio.c"
            onNewClick={() => setIsModalOpen(true)}
          />

          {/* Main Black Rounded Frame (Frame 2147228860) */}
          <main
            className="w-full bg-[#000000] rounded-[34px] p-6 lg:p-8 flex flex-col gap-6 shadow-2xl border border-[#262626]/40"
            dir="rtl"
          >
            {/* Date Header: Right-aligned in RTL */}
            <div className="flex justify-start">
              <span className="text-[14px] font-medium text-[#A8A29E] select-none">
                {initialDate}
              </span>
            </div>

            {/* Cards Row (Frame 2147228859): Tasks Sent on Right, Other cards on Left */}
            <div className="flex flex-col lg:flex-row items-start gap-6 w-full" dir="rtl">
              
              {/* 1. Right Card in RTL: Tasks Sent Card (403px width) */}
              <div className="w-full lg:w-[403px] shrink-0">
                <TasksInboxCard
                  onDetailsClick={() => showToast("لا توجد مهام مرسلة إليك")}
                />
              </div>

              {/* 2. Left Cards Group in RTL: Frame 2147228856 (613px width) */}
              <div className="w-full lg:w-[613px] flex-1 flex flex-col gap-5">
                {/* آخر التحديثات (204px height) */}
                <UpdatesCard
                  onDetailsClick={() => showToast("لا توجد تحديثات جديدة حالياً")}
                />

                {/* Bottom Row under Updates (Review Tasks on Right, CheckInBanner on Left) */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full" dir="rtl">
                  {/* Review Tasks Card (346px width) */}
                  <div className="w-full sm:w-[346px] flex-1">
                    <ReviewTasksCard
                      onDetailsClick={() => showToast("لا توجد مهام بانتظار مراجعتك")}
                    />
                  </div>

                  {/* Check-In Lavender Card (255px width) */}
                  <div className="w-full sm:w-[255px] shrink-0">
                    <CheckInBanner
                      dateStr="الاثنين، 17 سبتمبر"
                      onCheckIn={handleCheckIn}
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Line 5: Divider */}
            <div className="w-full border-t border-[#262626] my-1" />

            {/* Bottom Row: Header, Button, Attendance Timeline */}
            <div className="flex flex-col gap-4 w-full" dir="rtl">
              
              {/* Action & Title Bar */}
              <div className="flex items-center justify-between w-full">
                {/* Right Side in RTL: Frame 2147228858 (مهامي اليوم ←) */}
                <div className="flex items-center gap-2 text-[#F5F3EF] font-extrabold text-[20px] select-none">
                  <span>مهامي اليوم</span>
                  <ArrowLeft className="w-5 h-5 text-[#F5F3EF]" />
                </div>

                {/* Left Side in RTL: Button (+ اضافه مهمه) */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#8FCB4E] hover:bg-[#81BC43] active:scale-95 text-[#141414] font-extrabold text-[14px] h-[37px] px-4 rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer select-none"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>اضافه مهمه</span>
                </button>
              </div>

              {/* Attendance Timeline: Right-aligned under مهامي اليوم in RTL */}
              <div className="flex justify-start pr-1 pt-1">
                <AttendanceTimeline
                  checkInTime={attendance.checkInTime || undefined}
                  checkOutTime={attendance.checkOutTime || undefined}
                />
              </div>

            </div>

          </main>

        </div>

      </div>

      {/* Task Creation Modal */}
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
