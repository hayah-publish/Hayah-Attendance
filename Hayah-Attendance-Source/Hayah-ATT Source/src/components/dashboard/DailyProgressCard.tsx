import React from "react";

interface DailyProgressCardProps {
  completedCount?: number;
  totalCount?: number;
  percentage?: number;
  onViewTasks?: () => void;
}

export function DailyProgressCard({
  completedCount = 0,
  totalCount = 0,
  percentage = 0,
  onViewTasks,
}: DailyProgressCardProps) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full bg-[#000000] rounded-[30px] p-5 flex flex-col items-center relative shadow-sm border border-[#262626]">
      {/* Top Tag: اليوم */}
      <div className="w-full flex justify-end mb-1">
        <span className="bg-[#1F1F1F] text-[#F5F3EF] text-[10px] font-bold px-2.5 py-1 rounded-[11px] select-none">
          اليوم
        </span>
      </div>

      {/* Progress Ring (74px x 74px) */}
      <div className="relative w-[74px] h-[74px] flex items-center justify-center my-1">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 74 74">
          <circle
            cx="37"
            cy="37"
            r={radius}
            stroke="#1F1F1F"
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx="37"
            cy="37"
            r={radius}
            stroke="#8FCB4E"
            strokeWidth="5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute font-semibold text-[15px] text-[#F5F3EF] font-[family-name:var(--font-poppins)]">
          {percentage}%
        </span>
      </div>

      {/* Text Info */}
      <div className="text-center mt-2">
        <div className="text-[20px] font-bold text-[#F5F3EF] tracking-tight">
          {completedCount}/{totalCount}
        </div>
        <div className="text-[13px] font-bold text-[#F5F3EF] mt-1">
          مهام اليوم المنجزة
        </div>
        <p className="text-[12px] text-[#9A968E] mt-1 leading-relaxed">
          لم تضف مهام لليوم بعد
          <br />
          ابدأ بإضافة أول مهمة
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onViewTasks}
        className="w-full mt-4 bg-[#F5F3EF] hover:bg-[#E5E3DF] text-[#141414] font-extrabold text-[16px] h-[44px] rounded-full transition-all text-center cursor-pointer shadow-sm active:scale-[0.98]"
      >
        عرض مهام اليوم
      </button>
    </div>
  );
}
