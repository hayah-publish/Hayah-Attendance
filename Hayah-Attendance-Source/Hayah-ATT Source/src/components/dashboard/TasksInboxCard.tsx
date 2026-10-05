import React from "react";
import { ArrowUpLeft, Sparkles } from "lucide-react";

interface TasksInboxCardProps {
  onDetailsClick?: () => void;
}

export function TasksInboxCard({ onDetailsClick }: TasksInboxCardProps) {
  return (
    <div className="bg-[#F2F2F2] text-[#141414] rounded-[26px] p-5 flex flex-col justify-between h-[409px] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-extrabold text-[#141414] tracking-tight">
          المهام المرسلة إليك : -
        </h3>
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="عرض كل المهام المرسلة إليك"
          className="w-8 h-8 rounded-full bg-[#141414] text-[#F5F3EF] flex items-center justify-center hover:bg-[#2A2A2A] transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Dashed Inner Container */}
      <div className="bg-[#FFFFFF] border border-dashed border-[#E5E5E5] rounded-[18px] py-8 px-4 text-center flex flex-col items-center justify-center gap-2 flex-1 mt-3">
        <div className="w-14 h-14 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#F39708] mb-1 shrink-0">
          <Sparkles className="w-6 h-6 stroke-[1.75]" />
        </div>
        <h4 className="text-[15px] font-extrabold text-[#141414]">
          لا توجد مهام مرسلة إليك
        </h4>
        <p className="text-[12.5px] text-[#5B5750] leading-tight max-w-[240px]">
          عندما يرسل لك زميل مهمة ستظهر هنا فورًا.
        </p>
      </div>
    </div>
  );
}
