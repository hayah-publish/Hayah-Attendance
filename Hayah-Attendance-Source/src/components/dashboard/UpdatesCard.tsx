import React from "react";
import { ArrowUpLeft, Megaphone } from "lucide-react";

interface UpdatesCardProps {
  onDetailsClick?: () => void;
}

export function UpdatesCard({ onDetailsClick }: UpdatesCardProps) {
  return (
    <div className="bg-[#141519] border border-[#21232B] rounded-[28px] p-5 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-tight">
          آخر التحديثات
        </h3>
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="عرض التحديثات"
          className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowUpLeft className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      <div className="border border-dashed border-[#2A2D37] rounded-2xl py-6 px-4 text-center my-3 flex flex-col items-center justify-center">
        <div className="w-9 h-9 rounded-full bg-[#1F2229] border border-[#2D303B] text-cyan-400 flex items-center justify-center mb-2.5 shadow-sm">
          <Megaphone className="w-4 h-4" />
        </div>
        <h4 className="text-xs font-bold text-white">
          لا توجد تحديثات بعد
        </h4>
        <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed max-w-[230px]">
          أخبار الشركة وإنجازات الفريق ستظهر هنا أول بأول.
        </p>
      </div>
    </div>
  );
}
