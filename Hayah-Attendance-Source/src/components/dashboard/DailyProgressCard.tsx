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
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-[#141519] border border-[#21232B] rounded-[24px] p-5 flex flex-col items-center relative shadow-sm">
      <div className="w-full flex justify-end mb-1">
        <span className="bg-[#202228] text-neutral-300 text-[11px] px-2.5 py-0.5 rounded-full font-medium select-none">
          اليوم
        </span>
      </div>

      <div className="relative w-16 h-16 flex items-center justify-center my-1">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#23252E"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#86E040"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute font-bold text-xs text-white">
          {percentage}%
        </span>
      </div>

      <div className="text-center mt-2">
        <div className="text-xl font-bold text-white tracking-tight">
          {completedCount}/{totalCount}
        </div>
        <div className="text-xs font-bold text-white mt-1">
          مهام اليوم المنجزة
        </div>
        <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
          لم تضف مهام لليوم بعد
          <br />
          ابدأ بإضافة أول مهمة
        </p>
      </div>

      <button
        type="button"
        onClick={onViewTasks}
        className="w-full mt-4 bg-white text-black font-bold text-xs py-2.5 rounded-full hover:bg-neutral-200 transition-all text-center cursor-pointer shadow-sm active:scale-[0.98]"
      >
        عرض مهام اليوم
      </button>
    </div>
  );
}
