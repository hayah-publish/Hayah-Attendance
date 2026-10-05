"use client";

import React from "react";
import { SortTimeIcon } from "../dashboard/Sidebar";

export function BalanceHistoryCard() {
  return (
    <div
      className="w-full lg:w-[508px] h-[252px] bg-[#131313] rounded-[34px] p-5 flex flex-col justify-between border border-[#262626]/40 select-none"
      dir="rtl"
    >
      {/* sec-h: 468px x 24px */}
      <div className="w-full flex items-center justify-between h-[24px]">
        <h2 className="text-[16px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          حركات الرصيد السابقة
        </h2>
        <span className="text-[14px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F39708] cursor-pointer hover:underline">
          سجل
        </span>
      </div>

      {/* es: Empty State Box (468px x 174px, border: 1px dashed #262626, rounded 22px) */}
      <div className="w-full h-[174px] min-h-[174px] border border-dashed border-[#262626] rounded-[22px] p-[28px_18px] flex flex-col items-center justify-center gap-3">
        {/* es-ic: 56px x 56px */}
        <div className="w-[56px] h-[56px] min-h-[56px] rounded-[28px] bg-[#1F1F1F] flex items-center justify-center text-[#F5F3EF]">
          <SortTimeIcon className="w-6 h-6 text-[#F5F3EF]" />
        </div>

        {/* text: Title */}
        <h3 className="text-[15px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] text-center leading-tight">
          لا توجد حركات سابقة
        </h3>
      </div>
    </div>
  );
}
