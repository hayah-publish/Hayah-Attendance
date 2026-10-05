"use client";

import React, { useState } from "react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { LeaveBalanceCard } from "./LeaveBalanceCard";
import { BalanceHistoryCard } from "./BalanceHistoryCard";
import { WorkHoursBalanceCard } from "./WorkHoursBalanceCard";

interface BalancesViewProps {
  userName?: string;
}

export function BalancesView({ userName = "سلمى" }: BalancesViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div
      className="min-h-screen bg-[#141414] text-[#F5F3EF] flex justify-center py-8 px-6 antialiased selection:bg-[#8FCB4E] selection:text-[#141414]"
      dir="rtl"
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1F1F1F] border border-[#F39708]/60 text-[#F5F3EF] text-[13px] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#F39708]" />
          <span className="font-[family-name:var(--font-tajawal)]">{notification}</span>
        </div>
      )}

      {/* Frame 2147228935: 1376px container with 24px gap */}
      <div
        className="w-full max-w-[1376px] flex flex-col lg:flex-row items-start justify-start gap-6"
        dir="rtl"
      >
        {/* 1. Right Side in RTL: Sidebar (264px width) with activeTab="balances" */}
        <Sidebar activeTab="balances" userName={userName} />

        {/* 2. Left Side in RTL: Main Content Column (1088px width) */}
        <div className="w-[1088px] max-w-full flex flex-col gap-6" dir="rtl">
          
          {/* Top Header */}
          <TopNavbar
            userName="أهلاً، سلمى"
            userEmail="salmaghd-studio.c"
            onNewClick={() => setIsModalOpen(true)}
          />

          {/* Main Black Rounded Frame (Frame 2147228918: bg #000000, border-radius 34px, p-32px 24px) */}
          <main className="w-full bg-[#000000] rounded-[34px] p-6 lg:p-8 flex flex-col gap-6 border border-[#262626]/30">
            
            {/* Header: greet (Frame 2147228918 header: Title & Subtitle) */}
            <div className="text-right w-full">
              <h1 className="text-[26px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-tight">
                الارصده
              </h1>
              <p className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-1">
                متابعة أرصدة الإجازات وساعات العمل
              </p>
            </div>

            {/* Section 1: pgrid (1040px width x 371px height, gap 24px) */}
            <div className="flex flex-col lg:flex-row items-start gap-6 w-full" dir="rtl">
              {/* Right Column in RTL: Leave Balance Card (508px x 371px) */}
              <LeaveBalanceCard />

              {/* Left Column in RTL: Balance History Card (508px x 252px) */}
              <BalanceHistoryCard />
            </div>

            {/* Section 2: Work Hours Card (692px width x 426px height) */}
            <div className="w-full flex flex-col items-start" dir="rtl">
              <WorkHoursBalanceCard />
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
