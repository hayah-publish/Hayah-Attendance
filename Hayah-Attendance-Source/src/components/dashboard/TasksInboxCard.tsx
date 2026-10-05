import React from "react";
import { ArrowUpLeft, Sparkles } from "lucide-react";

interface TasksInboxCardProps {
  onDetailsClick?: () => void;
}

export function TasksInboxCard({ onDetailsClick }: TasksInboxCardProps) {
  return (
    <div className="bg-white text-neutral-950 rounded-[28px] p-6 flex flex-col justify-between min-h-[320px] shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-neutral-950 tracking-tight">
          المهام المرسلة إليك : -
        </h3>
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="عرض كل المهام المرسلة إليك"
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        <div className="w-14 h-14 rounded-2xl bg-[#FFFBEB] border border-[#FEF3C7] flex items-center justify-center mb-3 text-[#D97706] shadow-sm">
          <div className="relative">
            <Sparkles className="w-6 h-6 stroke-[1.75]" />
          </div>
        </div>
        <h4 className="text-sm font-bold text-neutral-900">
          لا توجد مهام مرسلة إليك
        </h4>
        <p className="text-xs text-neutral-500 mt-1 leading-relaxed max-w-[220px]">
          عندما يرسل لك زميل مهمة ستظهر هنا فورًا.
        </p>
      </div>

      <div className="h-2" />
    </div>
  );
}
