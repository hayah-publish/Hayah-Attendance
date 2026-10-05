import React from "react";
import { ArrowUpLeft } from "lucide-react";

interface ReviewTasksCardProps {
  onDetailsClick?: () => void;
}

export function ReviewTasksCard({ onDetailsClick }: ReviewTasksCardProps) {
  return (
    <div className="bg-[#F2F2F2] text-[#141414] rounded-[30px] p-5 flex flex-col justify-between h-[184px] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-extrabold text-[#141414] tracking-tight">
          مهام تحتاج الي مراجعتك : -
        </h3>
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="عرض مهام المراجعة"
          className="w-8 h-8 rounded-full bg-[#141414] text-[#F5F3EF] flex items-center justify-center hover:bg-[#2A2A2A] transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Dashed Inner Container */}
      <div className="bg-[#FFFFFF] border border-dashed border-[#D8D6D1] rounded-[18px] p-3 text-center flex-1 flex flex-col items-center justify-center mt-2">
        <h4 className="text-[14px] font-extrabold text-[#141414]">
          لا توجد مهام بانتظار مراجعتك
        </h4>
        <p className="text-[12px] text-[#5B5750] mt-1 leading-tight">
          المهام التي ترسلها لزملائك وتُسلّم ستظهر هنا لتعمدها.
        </p>
      </div>
    </div>
  );
}
