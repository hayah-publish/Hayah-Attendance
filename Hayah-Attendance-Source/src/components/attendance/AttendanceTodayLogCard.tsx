"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";

export interface AttendanceLogItem {
  id: string;
  title: string;
  status: "present" | "late" | "absent";
  statusLabel: string;
  timeRange: string;
  totalHours: string;
}

interface AttendanceTodayLogCardProps {
  logs?: AttendanceLogItem[];
}

export function AttendanceTodayLogCard({
  logs = [], // Default empty as requested: "خلي البيانات فارغة في الوقت الحالي"
}: AttendanceTodayLogCardProps) {
  return (
    <div
      className="w-full lg:w-[529px] h-full min-h-[186px] bg-[#131313] border border-[#262626] rounded-[34px] p-5 flex flex-col justify-between gap-3.5 select-none"
      dir="rtl"
    >
      {/* 1. Header Row (Frame: height 26px) */}
      <div className="flex items-center justify-between w-full h-[26px]">
        {/* Right in RTL: Title */}
        <h3 className="text-[16px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          سجل اليوم
        </h3>

        {/* Left in RTL: Link 'عرض السجل' (Text on right, Chevron pointing left on the left) */}
        <button
          type="button"
          className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] hover:text-[#F5F3EF] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>عرض السجل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Items List or Empty State */}
      <div className="flex flex-col gap-2 w-full flex-1 justify-center">
        {logs.length === 0 ? (
          /* Empty State Box matching Figma empty status */
          <div className="w-full h-[104px] border border-dashed border-[#262626] rounded-[22px] p-4 flex flex-col items-center justify-center gap-1.5 text-center">
            <span className="text-[14px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
              لا توجد سجلات حضور اليوم
            </span>
            <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E]">
              لم يتم تسجيل أي حضور حتى الآن.
            </span>
          </div>
        ) : (
          /* Populated items matching Screenshot 2 */
          logs.map((item) => (
            <div
              key={item.id}
              className="w-full rounded-[22px] bg-[#131313] border border-[#E5E5E5]/20 p-3.5 flex flex-col gap-2.5 transition-all hover:border-[#E5E5E5]/40"
            >
              {/* Upper row: Title + Status on right, Time on left */}
              <div className="flex items-center justify-between w-full">
                {/* Right in RTL: Title & Status Badge */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
                    {item.title}
                  </span>

                  {/* Status Pill with dot */}
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#122006] border border-[#8FCB4E]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FCB4E]" />
                    <span className="text-[12px] font-medium font-[family-name:var(--font-tajawal)] text-[#8FCB4E]">
                      {item.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Left in RTL: Time Range */}
                <span className="text-[14px] font-medium font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
                  {item.timeRange}
                </span>
              </div>

              {/* Bottom Row: Total hours */}
              <div className="flex items-center justify-between w-full pt-2 border-t border-[#262626]">
                <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E]">
                  إجمالي الساعات
                </span>
                <span className="text-[14px] font-semibold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
                  {item.totalHours}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
