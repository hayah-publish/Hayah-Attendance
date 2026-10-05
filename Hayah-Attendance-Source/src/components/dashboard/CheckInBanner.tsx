"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface CheckInBannerProps {
  dateStr?: string;
  onCheckIn?: () => void;
}

export function CheckInBanner({
  dateStr = "الاثنين، 17 سبتمبر",
  onCheckIn,
}: CheckInBannerProps) {
  return (
    <div className="bg-[#B7B5F8] text-neutral-950 rounded-[28px] p-5 flex flex-col justify-between shadow-sm min-h-[170px] relative overflow-hidden">
      <div>
        <span className="text-[11px] font-semibold text-neutral-700 block mb-1">
          {dateStr}
        </span>
        <h3 className="text-base font-extrabold text-neutral-950 leading-snug max-w-[180px]">
          جاهز ليوم جديد؟ ابدأ عملك الان و سجل حضورك
        </h3>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={onCheckIn}
          className="bg-white text-neutral-950 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:bg-neutral-100 transition-all cursor-pointer active:scale-95"
        >
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
            <ArrowLeft className="w-3 h-3 stroke-[3]" />
          </div>
          <span>تسجيل حضور</span>
        </button>
      </div>
    </div>
  );
}
