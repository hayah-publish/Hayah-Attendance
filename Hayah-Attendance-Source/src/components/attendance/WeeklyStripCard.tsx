"use client";

import React, { useState } from "react";
import { ArrowUpLeft } from "lucide-react";

interface DayData {
  dayName: string;
  dayNumber: number;
  statusDot?: string; // hex color for dot (e.g. #D86900, #8FCB4E, #FF453A, #ADA9E3)
  isActive?: boolean;
}

export function WeeklyStripCard() {
  const [selectedDay, setSelectedDay] = useState("الأربعاء");

  // Week days from Saturday to Friday (matching Figma Component 6)
  const weekDays: DayData[] = [
    { dayName: "السبت", dayNumber: 5, statusDot: "#D86900" },
    { dayName: "الأحد", dayNumber: 5, statusDot: "#ADA9E3" },
    { dayName: "الاثنين", dayNumber: 5, statusDot: "#FF453A" },
    { dayName: "الثلاثاء", dayNumber: 5, statusDot: "#9A968E" },
    { dayName: "الأربعاء", dayNumber: 5, statusDot: "#8FCB4E", isActive: true },
    { dayName: "الخميس", dayNumber: 5 },
    { dayName: "الجمعة", dayNumber: 5 },
  ];

  return (
    <div
      className="w-full h-[132px] bg-[#F2F2F2] rounded-[34px] p-6 flex items-center justify-between gap-4 select-none shadow-sm"
      dir="rtl"
    >
      {/* Right side in RTL: 7 Week Days Strip */}
      <div className="flex items-center justify-between flex-1 gap-1">
        {weekDays.map((item) => {
          const isSelected = selectedDay === item.dayName;

          return (
            <button
              key={item.dayName}
              type="button"
              onClick={() => setSelectedDay(item.dayName)}
              className="flex flex-col items-center justify-between h-[84px] py-1 px-1 rounded-[31px] transition-all cursor-pointer group flex-1"
            >
              {/* Day Name */}
              <span
                className={`text-[13px] font-medium font-[family-name:var(--font-tajawal)] transition-colors leading-[21px] ${
                  isSelected || item.isActive
                    ? "text-[#141414] font-bold"
                    : "text-[#A8A29E] group-hover:text-[#141414]"
                }`}
              >
                {item.dayName}
              </span>

              {/* Day Number Pill */}
              <div
                className={`w-[32px] h-[32px] rounded-full flex flex-col items-center justify-center relative transition-all ${
                  isSelected
                    ? "bg-[#131313] text-[#F5F3EF] shadow-md"
                    : "bg-transparent text-[#141414] hover:bg-[#E5E5E5]"
                }`}
              >
                <span
                  className={`text-[14px] leading-none ${
                    isSelected
                      ? "font-bold text-[#F5F3EF]"
                      : "font-medium text-[#141414]"
                  }`}
                >
                  {item.dayNumber}
                </span>

                {/* Status Indicator Dot */}
                {item.statusDot && (
                  <span
                    className="absolute -bottom-1 w-[4px] h-[4px] rounded-full"
                    style={{ backgroundColor: item.statusDot }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Left side in RTL: Action Button (32px circle, bg #141414) */}
      <button
        type="button"
        aria-label="توسيع أو تفاصيل"
        className="w-[32px] h-[32px] rounded-full bg-[#141414] hover:bg-[#2A2A2A] text-[#F5F3EF] flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer"
      >
        <ArrowUpLeft className="w-4 h-4 text-[#F5F3EF]" />
      </button>
    </div>
  );
}
