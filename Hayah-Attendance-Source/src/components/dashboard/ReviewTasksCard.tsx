import React from "react";
import { ArrowUpLeft } from "lucide-react";

interface ReviewTasksCardProps {
  onDetailsClick?: () => void;
}

export function ReviewTasksCard({ onDetailsClick }: ReviewTasksCardProps) {
  return (
    <div className="bg-white text-neutral-950 rounded-[28px] p-5 flex flex-col justify-between min-h-[170px] shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-neutral-950 tracking-tight">
          مهام تحتاج الي مراجعتك : -
        </h3>
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="عرض مهام المراجعة"
          className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-800 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ArrowUpLeft className="w-3 h-3 stroke-[2.5]" />
        </button>
      </div>

      <div className="border border-dashed border-neutral-300 rounded-2xl p-3.5 text-center my-1 flex-1 flex flex-col items-center justify-center">
        <h4 className="text-xs font-bold text-neutral-900">
          لا توجد مهام بانتظار مراجعتك
        </h4>
        <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
          المهام التي ترسلها لزملائك وتُسلّم ستظهر هنا لتعمدها.
        </p>
      </div>
    </div>
  );
}
