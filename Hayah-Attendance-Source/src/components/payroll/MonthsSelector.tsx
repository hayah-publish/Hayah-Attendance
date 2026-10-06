"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface MonthsSelectorProps {
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
  year?: string;
}

const MONTHS = [
  { num: 1, name: "يناير" },
  { num: 2, name: "فبراير" },
  { num: 3, name: "مارس" },
  { num: 4, name: "ابريل" },
  { num: 5, name: "مايو" },
  { num: 6, name: "يونيو" },
  { num: 7, name: "يوليو" },
  { num: 8, name: "أغسطس" },
  { num: 9, name: "سبتمبر" },
  { num: 10, name: "أكتوبر" },
  { num: 11, name: "نوفمبر" },
  { num: 12, name: "ديسمبر" },
];

export function MonthsSelector({
  selectedMonth,
  onSelectMonth,
  year = "2026",
}: MonthsSelectorProps) {
  return (
    <div
      className="w-full flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-1 select-none"
      dir="rtl"
    >
      {/* 12 Months Buttons Row */}
      <div className="flex items-center gap-1.5 flex-1 justify-start">
        {MONTHS.map((m) => {
          const isActive = m.num === selectedMonth;
          return (
            <button
              key={m.num}
              type="button"
              onClick={() => onSelectMonth(m.num)}
              className={`w-[64px] h-[64px] rounded-[22px] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer shrink-0 ${
                isActive
                  ? "bg-[#F5F3EF] text-[#141414] shadow-md font-bold"
                  : "text-[#A8A29E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A] font-normal"
              }`}
            >
              <span
                className={`text-[14px] leading-tight font-[family-name:var(--font-tajawal)] ${
                  isActive ? "text-[#141414] font-bold" : "text-[#A8A29E]"
                }`}
              >
                {m.num}
              </span>
              <span
                className={`text-[12px] leading-tight font-[family-name:var(--font-tajawal)] ${
                  isActive ? "text-[#141414] font-bold" : "text-[#A8A29E]"
                }`}
              >
                {m.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Year Pill (Frame 2147228376) */}
      <div className="h-[38px] px-3 bg-[#1F1F1F] rounded-[18px] border border-[#262626]/50 flex items-center justify-center gap-1.5 shrink-0 select-none cursor-default">
        <span className="text-[14px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          {year}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-[#F5F3EF]" />
      </div>
    </div>
  );
}
