"use client";

import React from "react";
import Link from "next/link";

interface LeaveBalanceCardProps {
  totalLeave?: number;
  usedLeave?: number;
  remainingLeave?: number;
  year?: string;
  onRequestLeave?: () => void;
}

export function LeaveBalanceCard({
  totalLeave = 21,
  usedLeave = 6,
  remainingLeave = 15,
  year = "2026",
  onRequestLeave,
}: LeaveBalanceCardProps) {
  // Calculate percentage of remaining
  const percentage = Math.round((remainingLeave / totalLeave) * 100);
  // Circle circumferences for 120px container (r = 44, circumference = 2 * PI * 44 = 276.46)
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="w-full lg:w-[508px] h-[371px] bg-[#131313] rounded-[34px] p-5 flex flex-col justify-between border border-[#262626]/40 select-none"
      dir="rtl"
    >
      {/* sec-h: 468px x 24px */}
      <div className="w-full flex items-center justify-between h-[24px]">
        <h2 className="text-[16px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          رصيد الإجازات
        </h2>
        <span className="text-[14px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F39708]">
          {year}
        </span>
      </div>

      {/* bal-row: 468px x 120px */}
      <div className="w-full flex items-center justify-between px-3">
        {/* 1. Chart-container: Right in RTL */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          <svg className="w-[120px] h-[120px] -rotate-90" viewBox="0 0 120 120">
            {/* Background track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#262626"
              strokeWidth="11"
              fill="none"
            />
            {/* Progress arc in #F39708 */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#F39708"
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Total-container inside center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[20px] font-semibold font-[family-name:var(--font-poppins)] text-[#F5F3EF] leading-none">
              {remainingLeave}
            </span>
            <span className="text-[11px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-0.5">
              يوم متبقي
            </span>
          </div>
        </div>

        {/* 2. bal-kv (Key-Value list): Left in RTL */}
        <div className="flex flex-col gap-2.5 w-[155px]">
          {/* Row 1: المتاح */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#262626]" />
              <span className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E]">
                المتاح
              </span>
            </div>
            <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
              {totalLeave}
            </span>
          </div>

          {/* Row 2: المستخدم */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F39708]" />
              <span className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E]">
                المستخدم
              </span>
            </div>
            <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
              {usedLeave}
            </span>
          </div>

          {/* Row 3: المتبقي */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#262626]" />
              <span className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E]">
                المتبقي
              </span>
            </div>
            <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
              {remainingLeave}
            </span>
          </div>
        </div>
      </div>

      {/* bReq: Request Leave Button */}
      {onRequestLeave ? (
        <button
          type="button"
          onClick={onRequestLeave}
          className="w-full h-[44px] bg-[#F5F3EF] hover:bg-[#FFFFFF] active:scale-[0.99] rounded-[22px] flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <span className="text-[14px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#141414]">
            طلب إجازة
          </span>
        </button>
      ) : (
        <Link
          href="/requests"
          className="w-full h-[44px] bg-[#F5F3EF] hover:bg-[#FFFFFF] active:scale-[0.99] rounded-[22px] flex items-center justify-center transition-all cursor-pointer shadow-md"
        >
          <span className="text-[14px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#141414]">
            طلب إجازة
          </span>
        </Link>
      )}

      {/* hours-log: Leave Deduction Logs (468px x 101px) */}
      <div className="w-full flex flex-col border-t border-[#262626]/40 pt-1">
        {/* Row 1: إجازة سنوية (2 يوم) */}
        <div className="w-full flex items-center justify-between py-2 border-b border-[#262626]/30">
          <span className="text-[14px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
            إجازة سنوية (2 يوم)
          </span>
          <span className="h-[22px] px-2.5 bg-[#1F1F1F] rounded-[11px] flex items-center justify-center text-[13px] font-bold font-[family-name:var(--font-tajawal)] text-[#FF453A]" dir="ltr">
            -2
          </span>
        </div>

        {/* Row 2: إجازة اضطرارية */}
        <div className="w-full flex items-center justify-between py-2">
          <span className="text-[14px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
            إجازة اضطرارية
          </span>
          <span className="h-[22px] px-2.5 bg-[#1F1F1F] rounded-[11px] flex items-center justify-center text-[13px] font-bold font-[family-name:var(--font-tajawal)] text-[#FF453A]" dir="ltr">
            -1
          </span>
        </div>
      </div>
    </div>
  );
}
