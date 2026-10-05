"use client";

import React, { useState } from "react";
import { ArrowUpDown, LayoutGrid, List, CheckCircle2 } from "lucide-react";

interface SummaryBoardCardProps {
  title?: string;
  onAddSummary?: () => void;
}

export function SummaryBoardCard({
  title = "تفاصيل اليوم",
  onAddSummary,
}: SummaryBoardCardProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div
      className="w-full bg-[#131313] rounded-[34px] p-5 flex flex-col gap-4 border border-[#262626]/30 select-none"
      dir="rtl"
    >
      {/* Header Row (Frame: height 42px) */}
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Right in RTL: Title */}
        <h3 className="text-[17px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          {title}
        </h3>

        {/* Left in RTL: Sort & View Mode Switcher */}
        <div className="flex items-center gap-3">
          {/* Sort Button */}
          <button
            type="button"
            className="h-[40px] px-4 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-full flex items-center gap-1.5 text-[14px] font-medium font-[family-name:var(--font-tajawal)] text-[#F5F3EF] transition-all cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4 text-[#F5F3EF]" />
            <span>ترتيب</span>
          </button>

          {/* View Mode Switcher (seg: 82px x 42px) */}
          <div className="flex items-center gap-0.5 bg-[#1F1F1F] rounded-[21px] p-1 h-[42px] border border-[#262626]/30">
            {/* Grid button (Active default in Figma for summary) */}
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="عرض شبكي"
              className={`w-[36px] h-[34px] rounded-[17px] flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            {/* List button */}
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-label="عرض قائمة"
              className={`w-[36px] h-[34px] rounded-[17px] flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State Box (es: 171px dashed box) */}
      <div className="w-full min-h-[171px] border border-dashed border-[#262626] rounded-[22px] py-7 px-4 flex flex-col items-center justify-center gap-3 text-center">
        {/* es-ic: 56px circle */}
        <div className="w-[56px] h-[56px] rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#F5F3EF] mb-0.5 shrink-0">
          <CheckCircle2 className="w-6 h-6 stroke-[1.5]" />
        </div>

        <h4 className="text-[15px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          لا توجد ملخصات عمل مسجلة لهذا اليوم
        </h4>

        <p className="text-[12.5px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] max-w-[390px] leading-relaxed">
          ابدأ بتسجيل ملخص إنجازاتك اليومية لمتابعة أدائك وساعات عملك بدقة.
        </p>
      </div>
    </div>
  );
}
