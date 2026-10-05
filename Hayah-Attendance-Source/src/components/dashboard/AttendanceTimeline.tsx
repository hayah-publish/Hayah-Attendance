import React from "react";

interface AttendanceTimelineProps {
  checkInTime?: string;
  checkOutTime?: string;
}

export function AttendanceTimeline({
  checkInTime = "08:55 AM",
  checkOutTime = "--:--",
}: AttendanceTimelineProps) {
  return (
    <div className="flex flex-col gap-0 select-none">
      {/* Row 1: الحضور */}
      <div className="flex items-center gap-3">
        {/* Active Bullet */}
        <div className="w-[24px] h-[24px] rounded-full bg-[#F5F3EF] flex items-center justify-center shrink-0">
          <div className="w-[8px] h-[8px] rounded-full bg-[#000000]" />
        </div>

        {/* Text */}
        <div className="text-right min-w-[70px]">
          <div className="text-[16px] font-extrabold text-[#F5F3EF] leading-tight">
            الحضور
          </div>
          <div className="text-[14px] text-[#9A968E] font-mono leading-tight mt-0.5">
            {checkInTime}
          </div>
        </div>
      </div>

      {/* Vertical Dashed Line */}
      <div className="flex items-center gap-3 py-1">
        <div className="w-[24px] flex justify-center">
          <div className="w-[1.5px] h-[34px] border-r-[1.5px] border-dashed border-[#525252]" />
        </div>
        <div className="min-w-[70px]" />
      </div>

      {/* Row 2: الانصراف */}
      <div className="flex items-center gap-3">
        {/* Inactive Bullet */}
        <div className="w-[24px] h-[24px] rounded-full bg-[#1F1F1F] flex items-center justify-center shrink-0">
          <div className="w-[8px] h-[8px] rounded-full bg-[#404040]" />
        </div>

        {/* Text */}
        <div className="text-right min-w-[70px]">
          <div className="text-[16px] font-extrabold text-[#F5F3EF] leading-tight">
            الانصراف
          </div>
          <div className="text-[12px] text-[#9A968E] font-[family-name:var(--font-poppins)] leading-tight mt-0.5">
            {checkOutTime}
          </div>
        </div>
      </div>
    </div>
  );
}
