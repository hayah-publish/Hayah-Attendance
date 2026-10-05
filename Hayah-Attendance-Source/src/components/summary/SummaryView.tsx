"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { SummaryStatsRow } from "./SummaryStatsRow";
import { SummaryBoardCard } from "./SummaryBoardCard";

interface SummaryViewProps {
  currentDate?: string;
  userName?: string;
}

export function SummaryView({
  currentDate = "الأحد، 27 سبتمبر",
  userName = "سلمى",
}: SummaryViewProps) {
  const [activePeriod, setActivePeriod] = useState<"today" | "week" | "month">("today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const periodOptions = [
    { id: "today" as const, label: "اليوم", subLabel: "نظرة عامة على اليوم" },
    { id: "week" as const, label: "هذا الأسبوع", subLabel: "نظرة عامة على الأسبوع" },
    { id: "month" as const, label: "هذا الشهر", subLabel: "نظرة عامة على الشهر" },
  ];

  const currentPeriod = periodOptions.find((p) => p.id === activePeriod) || periodOptions[0];

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
        {/* 1. Right Side in RTL: Sidebar (264px width) with activeTab="summary" */}
        <Sidebar activeTab="summary" userName={userName} />

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
            
            {/* Row 1: Header (Frame 2147228884: Title & Subtitle on Right, Date Pill on Left) */}
            <div className="flex items-center justify-between gap-4 w-full">
              {/* Right in RTL: greet (Title & Subtitle) */}
              <div className="text-right">
                <h1 className="text-[26px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-tight">
                  ملخص العمل
                </h1>
                <p className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-1">
                  متابعة وإدارة ملخصات وساعات العمل
                </p>
              </div>

              {/* Left in RTL: Button -3 (Date Pill: 152px x 40px) */}
              <button
                type="button"
                className="h-[40px] px-4 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-full flex items-center gap-2 text-[14px] font-medium font-[family-name:var(--font-tajawal)] text-[#F5F3EF] transition-all cursor-pointer select-none"
              >
                <span>{currentDate}</span>
                <Calendar className="w-4 h-4 text-[#F5F3EF]" />
              </button>
            </div>

            {/* Row 2: Period Tabs (ptabs: اليوم، هذا الأسبوع، هذا الشهر) */}
            <div className="flex items-center justify-between border-b border-[#262626]/40 pb-2 w-full select-none">
              {/* Right in RTL: Tabs */}
              <div className="flex items-center gap-7">
                {periodOptions.map((period) => (
                  <button
                    key={period.id}
                    type="button"
                    onClick={() => setActivePeriod(period.id)}
                    className={`pb-1 text-[15px] font-[family-name:var(--font-tajawal)] transition-all cursor-pointer relative ${
                      activePeriod === period.id
                        ? "font-bold text-[#F5F3EF]"
                        : "font-medium text-[#9A968E] hover:text-[#F5F3EF]"
                    }`}
                  >
                    <span>{period.label}</span>
                    {activePeriod === period.id && (
                      <span className="absolute bottom-[-9px] right-0 left-0 h-[2px] bg-[#F5F3EF] rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Left in RTL: sub label */}
              <span className="text-[12px] font-medium font-[family-name:var(--font-tajawal)] text-[#9A968E]">
                {currentPeriod.subLabel}
              </span>
            </div>

            {/* Row 3: Stat Cards Row (pay-stats: 4 cards with subheader date label) */}
            <SummaryStatsRow
              completedTasks={0}
              wordCount={0}
              minutesCount={0}
              sentApprovedTasks={0}
              activePeriod={activePeriod}
              dateText={
                activePeriod === "today"
                  ? `ملخص اليوم - ${currentDate}`
                  : activePeriod === "week"
                  ? `ملخص هذا الأسبوع - ${currentDate}`
                  : `ملخص هذا الشهر - ${currentDate}`
              }
            />

            {/* Row 4: Summary Main Board (card: تفاصيل اليوم + empty state) */}
            <SummaryBoardCard
              title={activePeriod === "today" ? "تفاصيل اليوم" : `تفاصيل ${currentPeriod.label}`}
              onAddSummary={() => setIsModalOpen(true)}
            />

          </main>

        </div>

      </div>

      {/* Task / Summary Creation Modal */}
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
