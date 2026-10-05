"use client";

import React from "react";
import { Sparkles, WholeWord, Clock, Send } from "lucide-react";

interface SummaryStatsRowProps {
  completedTasks?: number;
  wordCount?: number;
  minutesCount?: number;
  sentApprovedTasks?: number;
  activePeriod?: "today" | "week" | "month";
  dateText?: string;
}

export function SummaryStatsRow({
  completedTasks = 0,
  wordCount = 0,
  minutesCount = 0,
  sentApprovedTasks = 0,
  activePeriod = "today",
  dateText = "ملخص اليوم - الأحد، 27 سبتمبر",
}: SummaryStatsRowProps) {
  // Dynamically adapt subheader based on active period if dateText is default
  const resolvedDateText =
    dateText !== "ملخص اليوم - الأحد، 27 سبتمبر"
      ? dateText
      : activePeriod === "today"
      ? "ملخص اليوم - الأحد، 27 سبتمبر"
      : activePeriod === "week"
      ? "ملخص هذا الأسبوع - الأحد، 27 سبتمبر"
      : "ملخص هذا الشهر - سبتمبر 2026";

  const stats = [
    {
      id: "completed",
      title: "مهام مكتملة",
      value: completedTasks,
      isLight: true,
      icon: <Sparkles className="w-5 h-5 text-[#141414] stroke-[2]" />,
    },
    {
      id: "words",
      title: "عدد الكلمات",
      value: wordCount,
      isLight: false,
      icon: <WholeWord className="w-5 h-5 text-[#141414] stroke-[2]" />,
    },
    {
      id: "minutes",
      title: "عدد الدقائق",
      value: minutesCount,
      isLight: false,
      icon: <Clock className="w-5 h-5 text-[#141414] stroke-[2]" />,
    },
    {
      id: "sent_approved",
      title: "مهام أرسلتها واعتُمدت",
      value: sentApprovedTasks,
      isLight: false,
      icon: <Send className="w-4 h-4 text-[#141414] stroke-[2] -scale-x-100" />,
    },
  ];

  return (
    <div className="flex flex-col gap-2.5 w-full select-none" dir="rtl">
      {/* Subheader: ملخص اليوم - الأحد، 27 سبتمبر (aligned right directly above the cards) */}
      <div className="flex justify-start pr-1">
        <span className="text-[12px] font-medium font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-[14px]">
          {resolvedDateText}
        </span>
      </div>

      {/* 4 Stat Cards Row (Right to Left: مهام مكتملة -> عدد الكلمات -> عدد الدقائق -> مهام أرسلتها واعتُمدت) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className={`h-[130px] rounded-[26px] p-[18px] flex flex-col justify-between transition-all hover:scale-[1.01] ${
              stat.isLight
                ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                : "bg-[#131313] text-[#F5F3EF] border border-[#262626]/30"
            }`}
          >
            {/* Top Row: Title on right, Circular Badge on left (in RTL) */}
            <div className="flex items-center justify-between w-full">
              <span
                className={`text-[15px] font-bold font-[family-name:var(--font-tajawal)] ${
                  stat.isLight ? "text-[#141414]" : "text-[#F5F3EF]"
                }`}
              >
                {stat.title}
              </span>

              {/* Circular Badge: 36px x 36px, bg #F39708 */}
              <div className="w-[36px] h-[36px] rounded-full bg-[#F39708] flex items-center justify-center shrink-0 shadow-inner">
                {stat.icon}
              </div>
            </div>

            {/* Bottom Row: Stat Value (0) */}
            <div className="text-right">
              <span
                className={`text-[28px] font-semibold font-[family-name:var(--font-poppins)] leading-[42px] ${
                  stat.isLight ? "text-[#141414]" : "text-[#F5F3EF]"
                }`}
              >
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
