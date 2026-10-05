import React from "react";
import { ArrowUpLeft, Megaphone } from "lucide-react";

interface UpdatesCardProps {
  onDetailsClick?: () => void;
}

export function UpdatesCard({ onDetailsClick }: UpdatesCardProps) {
  return (
    <div className="bg-[#131313] border border-[#262626] rounded-[26px] p-5 flex flex-col justify-between h-[204px] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-extrabold text-[#F5F3EF] tracking-tight">
          آخر التحديثات
        </h3>
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="عرض التحديثات"
          className="w-8 h-8 rounded-full bg-[#F5F3EF] text-[#141414] flex items-center justify-center hover:bg-[#E5E3DF] transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Dashed Inner Area */}
      <div className="border border-dashed border-[#262626] rounded-[22px] py-4 px-4 text-center flex flex-col items-center justify-center gap-1.5 flex-1 mt-3">
        <div className="w-11 h-11 rounded-full bg-[#1F1F1F] text-[#00B1FF] flex items-center justify-center shrink-0">
          <Megaphone className="w-5 h-5 text-[#00B1FF]" />
        </div>
        <h4 className="text-[15px] font-extrabold text-[#F5F3EF]">
          لا توجد تحديثات بعد
        </h4>
        <p className="text-[12.5px] text-[#9A968E] leading-tight">
          أخبار الشركة وإنجازات الفريق ستظهر هنا أول بأول.
        </p>
      </div>
    </div>
  );
}
