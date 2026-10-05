import React from "react";
import { CheckSquare } from "lucide-react";

export function TaskDetailsPlaceholder() {
  return (
    <div className="w-full lg:w-[320px] h-[274px] bg-[#131313] rounded-[26px] p-6 flex flex-col items-center justify-center gap-4 text-center border border-[#262626]/40 select-none">
      {/* Icon Circle (es-ic: 56px x 56px, bg #1F1F1F) */}
      <div className="w-[56px] h-[56px] rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#F5F3EF] shrink-0 shadow-sm">
        <CheckSquare className="w-6 h-6 stroke-[1.75]" />
      </div>

      {/* Text Container (Frame 2147228936) */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[16px] font-bold text-[#F5F3EF] leading-tight">
          لا توجد مهمة محددة
        </h3>
        <p className="text-[14px] font-medium text-[#9A968E] leading-relaxed max-w-[240px]">
          حدد أي مهمة من القائمة لعرض تفاصيلها ومتابعة حالتها هنا.
        </p>
      </div>
    </div>
  );
}
