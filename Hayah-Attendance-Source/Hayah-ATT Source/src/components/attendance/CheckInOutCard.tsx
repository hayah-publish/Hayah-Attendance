"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

interface CheckInOutCardProps {
  initialCheckedIn?: boolean;
  onStatusChange?: (isCheckedIn: boolean) => void;
}

export function CheckInOutCard({
  initialCheckedIn = false, // Default is empty as requested: "خلي البيانات فارغة في الوقت الحالي"
  onStatusChange,
}: CheckInOutCardProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(initialCheckedIn);

  const handleToggle = () => {
    const nextState = !isCheckedIn;
    setIsCheckedIn(nextState);
    if (onStatusChange) onStatusChange(nextState);
  };

  return (
    <div
      className="w-full h-[227px] bg-[#131313] border border-[#262626] rounded-[34px] p-5 flex flex-col justify-between select-none"
      dir="rtl"
    >
      {/* 1. Header: Title on Right, Status Badge on Left */}
      <div className="flex items-center justify-between w-full h-[26px]">
        {/* Right in RTL: Title */}
        <h3 className="text-[17px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          تسجيل الحضور
        </h3>

        {/* Left in RTL: Status Badge (Matching Screenshot 1) */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F1F1F]">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isCheckedIn ? "bg-[#8FCB4E]" : "bg-[#9A968E]"
            }`}
          />
          <span className="text-[12px] font-medium font-[family-name:var(--font-tajawal)] text-[#9A968E]">
            {isCheckedIn ? "حاضر الآن" : "غير مسجل"}
          </span>
        </div>
      </div>

      {/* 2. Middle Stats (3 Columns: وقت الحضور / وقت الانصراف / ساعات العمل) */}
      <div className="grid grid-cols-3 gap-2 w-full pt-1 pb-1">
        {/* Col 1: وقت الحضور (Right in RTL) */}
        <div className="flex flex-col items-start gap-1">
          <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E]">
            وقت الحضور
          </span>
          <span className="text-[18px] font-semibold font-[family-name:var(--font-poppins)] text-[#F5F3EF]">
            {isCheckedIn ? "09:00" : "--:--"}
          </span>
        </div>

        {/* Col 2: وقت الانصراف (Center in RTL) */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E]">
            وقت الانصراف
          </span>
          <span className="text-[18px] font-semibold font-[family-name:var(--font-poppins)] text-[#F5F3EF]">
            --:--
          </span>
        </div>

        {/* Col 3: ساعات العمل (Left in RTL) */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E]">
            ساعات العمل
          </span>
          <span className="text-[18px] font-semibold font-[family-name:var(--font-poppins)] text-[#F5F3EF]">
            {isCheckedIn ? "8" : "--"}
          </span>
        </div>
      </div>

      {/* 3. Bottom Area: Centered Action Button + Bottom Left Note */}
      <div className="flex flex-col items-center gap-2.5 w-full pt-1">
        {/* Button - Add/Action (coBtn: 200px x 48px, bg #F5F3EF, rounded-full) - Strictly RTL Layout */}
        <button
          type="button"
          onClick={handleToggle}
          className="w-[200px] h-[48px] bg-[#F5F3EF] hover:bg-white active:scale-95 rounded-full p-1.5 flex items-center justify-between px-3 transition-all cursor-pointer shadow-sm group mx-auto"
        >
          {/* 1. Button Text (Right in RTL) */}
          <span className="text-[14px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#141414] pr-2 flex-1 text-right">
            {isCheckedIn ? "تسجيل انصراف" : "تسجيل حضور"}
          </span>

          {/* 2. Black Circle with Left-Pointing Triangle (Left in RTL) */}
          <div className="w-[36px] h-[36px] rounded-full bg-[#000000] flex items-center justify-center text-[#F5F3EF] shrink-0 group-hover:scale-105 transition-transform">
            <Play className="w-3.5 h-3.5 fill-current rotate-180 ml-0.5" />
          </div>
        </button>

        {/* Sub Note (Bottom Left in RTL, matching Screenshot 1) */}
        <div className="flex items-center justify-start gap-1.5 w-full">
          <span className="w-3 h-3 rounded-full border border-[#8FCB4E] flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FCB4E]" />
          </span>
          <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E]">
            {isCheckedIn ? "تم تسجيل الحضور تلقائياً" : "بانتظار تسجيل الحضور"}
          </span>
        </div>
      </div>
    </div>
  );
}
