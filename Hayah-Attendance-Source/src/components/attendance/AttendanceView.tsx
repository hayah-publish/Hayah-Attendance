"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { WeeklyStripCard } from "./WeeklyStripCard";
import { CheckInOutCard } from "./CheckInOutCard";
import { AttendanceTodayLogCard, AttendanceLogItem } from "./AttendanceTodayLogCard";
import { DEFAULT_USER } from "@/lib/userService";
import { getTodayDateString } from "@/lib/dateUtils";

interface AttendanceViewProps {
  currentDate?: string;
  userName?: string;
}

export function AttendanceView({
  currentDate = getTodayDateString(),
  userName = DEFAULT_USER.firstName,
}: AttendanceViewProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [logs, setLogs] = useState<AttendanceLogItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (checkedIn: boolean) => {
    setIsCheckedIn(checkedIn);
    if (checkedIn) {
      setLogs([
        {
          id: "1",
          title: "تسجيل الحضور",
          status: "present",
          statusLabel: "حضور",
          timeRange: "09:00 ص - 05:00 م",
          totalHours: "8 ساعات",
        },
      ]);
      showToast("تم تسجيل الحضور بنجاح");
    } else {
      setLogs([]);
      showToast("تم تسجيل الانصراف بنجاح");
    }
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

      {/* Frame 2147228935: 1376px container with 24px gap */}
      <div
        className="w-full max-w-[1376px] flex flex-col lg:flex-row items-start justify-start gap-6"
        dir="rtl"
      >
        {/* 1. Right Side in RTL: Sidebar (264px width) with activeTab="attendance" */}
        <Sidebar activeTab="attendance" userName={userName} />

        {/* 2. Left Side in RTL: Main Content Column (1088px width) */}
        <div className="w-[1088px] max-w-full flex flex-col gap-6" dir="rtl">
          
          {/* Top Header */}
          <TopNavbar
            userName={userName === DEFAULT_USER.firstName ? DEFAULT_USER.greetingName : `أهلاً، ${userName}`}
            userEmail={DEFAULT_USER.email}
            avatarLetter={DEFAULT_USER.avatarLetter}
            onNewClick={() => setIsModalOpen(true)}
          />

          {/* Main Black Rounded Frame (Frame 2147228918: bg #000000, border-radius 34px, p-32px 24px) */}
          <main className="w-full bg-[#000000] rounded-[34px] p-6 lg:p-8 flex flex-col gap-6 border border-[#262626]/30">
            
            {/* Row 1: Header Row (Frame 2147228884: Title & Subtitle on Right, Date Pill on Left) */}
            <div className="flex items-center justify-between gap-4 w-full">
              {/* Right in RTL: greet */}
              <div className="text-right">
                <h1 className="text-[26px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-tight">
                  الحضور
                </h1>
                <p className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-1">
                  سجل ومتابعة الحضور والانصراف اليومي
                </p>
              </div>

              {/* Left in RTL: Button -3 (Date Pill) */}
              <button
                type="button"
                className="h-[40px] px-4 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-full flex items-center gap-2 text-[14px] font-medium font-[family-name:var(--font-tajawal)] text-[#F5F3EF] transition-all cursor-pointer select-none"
              >
                <span>{currentDate}</span>
                <Calendar className="w-4 h-4 text-[#F5F3EF]" />
              </button>
            </div>

            {/* Row 2: Attendance Content Row (Frame 2147228945: gap 24px) */}
            <div className="flex flex-col lg:flex-row items-start gap-6 w-full" dir="rtl">
              
              {/* Right Column in RTL: Frame 2147228942 (Weekly Strip + Check-In/Out Card: 487px width) */}
              <div className="w-full lg:w-[487px] flex flex-col gap-5 shrink-0">
                {/* 1. Component 6: Weekly Days Row (132px height) */}
                <WeeklyStripCard />

                {/* 2. check in card (227px height) */}
                <CheckInOutCard
                  initialCheckedIn={isCheckedIn}
                  onStatusChange={handleStatusChange}
                />
              </div>

              {/* Left Column in RTL: Attendance Log Card (529px width) */}
              <div className="w-full lg:w-[529px] flex-1">
                <AttendanceTodayLogCard logs={logs} />
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
