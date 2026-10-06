"use client";

import React from "react";
import { CheckSquare, Clock, User, AlertCircle, FileText } from "lucide-react";
import { RequestTask } from "@/lib/tasksService";

interface TaskDetailsPlaceholderProps {
  selectedTask?: RequestTask | null;
}

export function TaskDetailsPlaceholder({ selectedTask }: TaskDetailsPlaceholderProps) {
  if (selectedTask) {
    const isHigh =
      selectedTask.priority === "high" || selectedTask.priority === "عالية";
    const isLow =
      selectedTask.priority === "low" || selectedTask.priority === "منخفضة";
    const isInProgress =
      selectedTask.status === "In progress" || selectedTask.status === "قيد التنفيذ";

    return (
      <div
        className="w-full lg:w-[320px] bg-[#131313] rounded-[26px] p-5 flex flex-col gap-4 text-right border border-[#262626]/60 select-none shadow-md animate-in fade-in"
        dir="rtl"
      >
        {/* Header: Code & Priority */}
        <div className="flex items-center justify-between">
          <span className="bg-[#1F1F1F] text-[#F39708] border border-[#262626] text-[12px] font-extrabold px-3 py-1 rounded-full font-mono">
            {selectedTask.code}
          </span>
          <span
            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full font-[family-name:var(--font-tajawal)] ${
              isHigh
                ? "bg-[#DC2626]/20 text-[#EF4444]"
                : isLow
                ? "bg-[#16A34A]/20 text-[#8FCB4E]"
                : "bg-[#D97706]/20 text-[#F59E0B]"
            }`}
          >
            {isHigh ? "أولوية عالية" : isLow ? "أولوية منخفضة" : "أولوية متوسطة"}
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-[#9A968E] font-medium font-[family-name:var(--font-tajawal)]">
            عنوان المهمة
          </span>
          <h3 className="text-[16px] font-extrabold text-[#F5F3EF] leading-snug font-[family-name:var(--font-tajawal)]">
            {selectedTask.title}
          </h3>
        </div>

        {/* Info / Description */}
        <div className="flex flex-col gap-1 bg-[#1A1A1A] p-3 rounded-[16px] border border-[#262626]/40">
          <div className="flex items-center gap-1.5 text-[11px] text-[#9A968E] font-semibold font-[family-name:var(--font-tajawal)]">
            <FileText className="w-3.5 h-3.5 text-[#F39708]" />
            <span>تفاصيل وملاحظات المهمة</span>
          </div>
          <p className="text-[12.5px] text-[#D4D4D4] font-[family-name:var(--font-tajawal)] leading-relaxed mt-1">
            {selectedTask.info}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#262626]/60 text-[12px] text-[#9A968E] font-[family-name:var(--font-tajawal)]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#9A968E]">
              <User className="w-3.5 h-3.5" />
              <span>المرسل:</span>
            </span>
            <span className="text-[#F5F3EF] font-bold font-sans">
              {selectedTask.sender_name
                ? `${selectedTask.sender_name}${selectedTask.sender_job ? ` (${selectedTask.sender_job})` : ""}`
                : selectedTask.sent_from}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[#9A968E]">
              <Clock className="w-3.5 h-3.5" />
              <span>التاريخ:</span>
            </span>
            <span className="text-[#F5F3EF] font-medium">
              {selectedTask.publish_date}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#9A968E]">الحالة:</span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                isInProgress
                  ? "bg-[#F39708]/20 text-[#F39708]"
                  : "bg-[#262626] text-[#9A968E]"
              }`}
            >
              {isInProgress ? "قيد التنفيذ" : "لم تبدأ"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-[320px] h-[274px] bg-[#131313] rounded-[26px] p-6 flex flex-col items-center justify-center gap-4 text-center border border-[#262626]/40 select-none">
      {/* Icon Circle */}
      <div className="w-[56px] h-[56px] rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#F5F3EF] shrink-0 shadow-sm">
        <CheckSquare className="w-6 h-6 stroke-[1.75]" />
      </div>

      {/* Text Container */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[16px] font-bold text-[#F5F3EF] leading-tight font-[family-name:var(--font-tajawal)]">
          لا توجد مهمة محددة
        </h3>
        <p className="text-[13px] font-normal text-[#9A968E] leading-relaxed max-w-[240px] font-[family-name:var(--font-tajawal)]">
          حدد أي مهمة من القائمة لعرض تفاصيلها ومتابعة حالتها هنا.
        </p>
      </div>
    </div>
  );
}
