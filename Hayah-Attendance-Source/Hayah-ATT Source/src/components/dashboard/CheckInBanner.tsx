"use client";

import React from "react";
import { Play } from "lucide-react";

interface CheckInBannerProps {
  dateStr?: string;
  onCheckIn?: () => void;
}

export function CheckInBanner({
  dateStr = "الاثنين، 17 سبتمبر",
  onCheckIn,
}: CheckInBannerProps) {
  return (
    <div className="bg-[#ADA9E3] text-[#141414] rounded-[30px] p-5 flex flex-col justify-between h-[184px] shadow-sm select-none">
      <div>
        <span className="text-[12px] font-normal text-[#141414] block mb-1">
          {dateStr}
        </span>
        <h3 className="text-[20px] font-bold text-[#19172B] leading-[22px] max-w-[185px]">
          جاهز ليوم جديد؟ ابدأ عملك الان و سجل حضورك
        </h3>
      </div>

      <div>
        <button
          type="button"
          onClick={onCheckIn}
          className="w-full bg-[#F2F2F2] hover:bg-white text-[#141414] font-extrabold text-[14px] h-[48px] px-2 rounded-[24px] flex items-center justify-between transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <div className="w-[36px] h-[36px] rounded-full bg-[#000000] text-[#F5F3EF] flex items-center justify-center shrink-0">
            <Play className="w-3.5 h-3.5 fill-[#F5F3EF] text-[#F5F3EF] rotate-180 ml-0.5" />
          </div>
          <span className="flex-1 text-center pr-2">تسجيل حضور</span>
        </button>
      </div>
    </div>
  );
}
