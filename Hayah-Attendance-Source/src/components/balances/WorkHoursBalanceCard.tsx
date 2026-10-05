"use client";

import React from "react";
import { Clock, Plus, Minus } from "lucide-react";

interface WorkHoursBalanceCardProps {
  overtimeHours?: string;
  delayedHours?: string;
  periodLabel?: string;
}

export function WorkHoursBalanceCard({
  overtimeHours = "+14:30",
  delayedHours = "-03:15",
  periodLabel = "الشهر الحالي",
}: WorkHoursBalanceCardProps) {
  return (
    <div
      className="w-full lg:w-[692px] min-h-[426px] bg-[#131313] rounded-[34px] p-5 flex flex-col justify-between border border-[#262626]/40 select-none"
      dir="rtl"
    >
      {/* sec-h: 652px x 24px */}
      <div className="w-full flex items-center justify-between h-[24px]">
        <h2 className="text-[16px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          ساعات العمل
        </h2>
        <span className="text-[14px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F39708]">
          {periodLabel}
        </span>
      </div>

      {/* statgrid: 652px x 122px */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Stat Card 1: ساعات إضافية (320px x 122px, bg #1F1F1F, rounded 26px) */}
        <div className="w-full h-[122px] bg-[#1F1F1F] rounded-[26px] p-4 flex flex-col justify-between border border-[#262626]/40">
          <div className="flex items-center justify-between w-full">
            <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
              ساعات إضافية
            </span>
            <div className="w-9 h-9 rounded-full bg-[#F5F3EF] flex items-center justify-center">
              <div className="relative">
                <Clock className="w-4 h-4 text-[#8FCB4E]" />
                <Plus className="w-2.5 h-2.5 text-[#8FCB4E] absolute -top-1 -right-1 font-bold" />
              </div>
            </div>
          </div>
          <span className="text-[28px] font-semibold font-[family-name:var(--font-poppins)] text-[#8FCB4E] text-right" dir="ltr">
            {overtimeHours}
          </span>
        </div>

        {/* Stat Card 2: ساعات متأخرة (320px x 122px, bg #1F1F1F, rounded 26px) */}
        <div className="w-full h-[122px] bg-[#1F1F1F] rounded-[26px] p-4 flex flex-col justify-between border border-[#262626]/40">
          <div className="flex items-center justify-between w-full">
            <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
              ساعات متأخرة
            </span>
            <div className="w-9 h-9 rounded-full bg-[#F5F3EF] flex items-center justify-center">
              <div className="relative">
                <Clock className="w-4 h-4 text-[#FF453A]" />
                <Minus className="w-2.5 h-2.5 text-[#FF453A] absolute -top-1 -right-1 font-bold" />
              </div>
            </div>
          </div>
          <span className="text-[28px] font-semibold font-[family-name:var(--font-poppins)] text-[#FF453A] text-right" dir="ltr">
            {delayedHours}
          </span>
        </div>
      </div>

      {/* hours-log: Empty State Box (652px x 174px, border 1px dashed #262626, rounded 22px) */}
      <div className="w-full h-[174px] min-h-[174px] border border-dashed border-[#262626] rounded-[22px] p-[28px_18px] flex flex-col items-center justify-center gap-2.5">
        {/* es-ic: 56px x 56px */}
        <div className="w-[56px] h-[56px] min-h-[56px] rounded-[28px] bg-[#1F1F1F] flex items-center justify-center text-[#F39708]">
          <Clock className="w-6 h-6 text-[#F39708]" strokeWidth={1.8} />
        </div>

        {/* text 1: Title */}
        <h3 className="text-[15px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] text-center leading-tight">
          لا توجد سجلات ساعات إضافية
        </h3>

        {/* text 2: Subtitle */}
        <p className="text-[12.5px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] text-center leading-tight">
          سجل الساعات الإضافية والعجز يظهر هنا شهرياً
        </p>
      </div>

      {/* sub: Footnote (326px x 14px) */}
      <div className="w-full text-right pt-0.5">
        <p className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E]">
          * يتم تسوية رصيد الساعات تلقائياً مع نهاية كل شهر ميلادي
        </p>
      </div>
    </div>
  );
}
