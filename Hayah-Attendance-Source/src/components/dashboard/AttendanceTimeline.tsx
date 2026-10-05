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
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-center gap-3">
        <div className="text-right min-w-[70px]">
          <div className="text-xs font-bold text-white leading-tight">
            الحضور
          </div>
          <div className="text-[11px] text-neutral-400 font-mono leading-tight mt-0.5">
            {checkInTime}
          </div>
        </div>
        
        <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
          <span className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center bg-[#0F1013]">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="min-w-[70px]" />
        <div className="w-5 flex justify-center py-0.5">
          <div className="w-[1px] h-6 border-r-2 border-dashed border-neutral-600/80" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right min-w-[70px]">
          <div className="text-xs font-medium text-neutral-400 leading-tight">
            الانصراف
          </div>
          <div className="text-[11px] text-neutral-600 font-mono leading-tight mt-0.5">
            {checkOutTime}
          </div>
        </div>
        
        <div className="flex items-center justify-center w-5 h-5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#353842]" />
        </div>
      </div>
    </div>
  );
}
