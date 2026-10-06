"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeft, Sparkles, Clock } from "lucide-react";
import { RequestTask } from "@/lib/tasksService";

interface TasksInboxCardProps {
  tasks?: RequestTask[];
  isLoading?: boolean;
  onDetailsClick?: () => void;
  href?: string;
}

export function TasksInboxCard({
  tasks = [],
  isLoading = false,
  onDetailsClick,
  href = "/tasks?tab=today",
}: TasksInboxCardProps) {
  const count = tasks.length;
  const displayTasks = React.useMemo(() => [...tasks].reverse(), [tasks]);

  return (
    <div
      className="bg-[#F2F2F2] text-[#141414] rounded-[26px] p-5 flex flex-col justify-between h-[409px] shadow-sm select-none"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-extrabold text-[#141414] tracking-tight font-[family-name:var(--font-tajawal)]">
            المهام المرسلة إليك : -
          </h3>
          {!isLoading && count > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#141414] text-[#F5F3EF] text-[11px] font-bold font-[family-name:var(--font-poppins)] flex items-center justify-center">
              {count}
            </span>
          )}
        </div>

        {href ? (
          <Link
            href={href}
            onClick={onDetailsClick}
            aria-label="عرض كل المهام المرسلة إليك"
            className="w-8 h-8 rounded-full bg-[#141414] text-[#F5F3EF] flex items-center justify-center hover:bg-[#2A2A2A] transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onDetailsClick}
            aria-label="عرض كل المهام المرسلة إليك"
            className="w-8 h-8 rounded-full bg-[#141414] text-[#F5F3EF] flex items-center justify-center hover:bg-[#2A2A2A] transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Content Area */}
      {isLoading ? (
        /* Loading skeleton matching the card design */
        <div className="flex-1 overflow-hidden mt-3.5 space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-full h-[88px] bg-[#FFFFFF] rounded-[26px] p-[14px] flex flex-col justify-between animate-pulse shadow-sm"
            >
              {/* Top Row Skeleton */}
              <div className="flex items-start gap-2.5 w-full" dir="rtl">
                <div className="w-[30px] h-[30px] rounded-full bg-[#EAEAEA] shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5 pt-1">
                  <div className="h-3.5 bg-[#EAEAEA] rounded-md w-4/5" />
                  <div className="h-2.5 bg-[#F5F5F5] rounded-md w-1/2" />
                </div>
              </div>

              {/* Bottom Row Skeleton */}
              <div className="flex items-center justify-between w-full h-[20px] pt-0.5" dir="rtl">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#EAEAEA] shrink-0" />
                  <div className="w-24 h-2.5 bg-[#EAEAEA] rounded-md" />
                </div>
                <div className="w-12 h-2.5 bg-[#F5F5F5] rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : tasks.length > 0 ? (
        <div className="flex-1 overflow-y-auto mt-3.5 space-y-2.5 pl-1.5 pr-0.5 max-h-[320px] custom-scrollbar-light">
          {displayTasks.map((task) => {
            const senderName =
              task.sender_name ||
              task.sender_first_name ||
              (task.sent_from === "razki03"
                ? "Rahma Ahmed"
                : task.sent_from === "ag-hayah"
                ? "Ahmed Galal"
                : task.sent_from || "");
            const senderJob =
              task.sender_job ||
              (task.sent_from === "razki03"
                ? "Ui/Ux"
                : task.sent_from === "ag-hayah"
                ? "CEO"
                : "");
            const senderDisplay = senderJob
              ? `${senderName} - ${senderJob}`
              : senderName;
            const cleanLetters = senderName.replace(/[^a-zA-Z\u0621-\u064A]/g, "");
            const avatarLetter = (
              task.sender_avatar ||
              cleanLetters[0] ||
              (task.sent_from ? task.sent_from[0] : "U")
            ).toUpperCase();

            return (
              <Link
                key={task.code}
                href="/tasks?tab=today"
                className="w-full min-h-[88px] h-auto bg-[#FFFFFF] rounded-[26px] p-[14px] flex flex-col justify-between gap-2.5 hover:shadow-md transition-all text-right shrink-0 cursor-pointer block select-none border border-transparent hover:border-[#E5E5E5]"
              >
                {/* in-top: Top Row with Icon and 2-Line Expandable Title */}
                <div className="flex items-start gap-2.5 w-full min-w-0" dir="rtl">
                  {/* ic:round-auto-graph (30px x 30px red circle with black auto-graph icon) */}
                  <div className="w-[30px] h-[30px] rounded-full bg-[#FF453A] flex items-center justify-center shrink-0 mt-0.5">
                    <svg
                      width="18"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0"
                    >
                      <path
                        d="M14.06 9.94L15.5 9l-1.44-.94L13.12 6.62l-.94 1.44L10.74 9l1.44.94.94 1.44.94-1.44zm-5.06-2L8.06 6.5 7.12 5.06l-.94 1.44L4.74 7.44l1.44.94.94 1.44.94-1.44zm11 8l-1.44-.94-.94-1.44-.94 1.44-1.44.94 1.44.94.94 1.44.94-1.44 1.44-.94zM3.5 18.5l6-6 4 4 8.5-9.5-1.4-1.4-7.1 8-4-4L2.1 17.1l1.4 1.4zm16.5-2.5l-1.4-.9-.9-1.4-.9 1.4-1.4.9 1.4.9.9 1.4.9-1.4 1.4-.9z"
                        fill="#000000"
                      />
                    </svg>
                  </div>

                  {/* b: Title (Expandable to 2 lines) */}
                  <h4 className="text-[14px] font-bold text-[#141414] font-[family-name:var(--font-tajawal)] leading-[19px] line-clamp-2 flex-1 text-right">
                    {task.title}
                  </h4>
                </div>

                {/* Frame 2147228198: Bottom Row */}
                <div className="flex items-center justify-between w-full h-[20px] pt-0.5" dir="rtl">
                  {/* Frame 2147228194: Right in RTL: Avatar + Sender/Team */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    {/* Avatar circle (20px x 20px, rgba(243, 151, 8, 0.2), radius 40.8px) */}
                    <div className="w-5 h-5 rounded-full bg-[rgba(243,151,8,0.2)] flex items-center justify-center shrink-0">
                      <span className="text-[#F39708] text-[10px] font-bold font-[family-name:var(--font-tajawal)] leading-[11px]">
                        {avatarLetter}
                      </span>
                    </div>

                    {/* Frame 2147228193: Sender / Team text */}
                    <span className="text-[12px] font-medium text-[#141414] font-[family-name:var(--font-tajawal)] leading-[14px] truncate max-w-[220px]">
                      {senderDisplay}
                    </span>
                  </div>

                  {/* Left in RTL: Publish Time (10px, #9A968E, LTR format) */}
                  <span
                    dir="ltr"
                    className="text-[10px] font-normal text-[#9A968E] leading-[12px] shrink-0 font-sans tracking-wide"
                  >
                    {task.publish_time}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FFFFFF] border border-dashed border-[#E5E5E5] rounded-[18px] py-8 px-4 text-center flex flex-col items-center justify-center gap-2 flex-1 mt-3">
          <div className="w-14 h-14 rounded-full bg-[#F2F2F2] flex items-center justify-center text-[#F39708] mb-1 shrink-0">
            <Sparkles className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h4 className="text-[15px] font-extrabold text-[#141414] font-[family-name:var(--font-tajawal)]">
            لا توجد مهام مرسلة إليك
          </h4>
          <p className="text-[12.5px] text-[#5B5750] font-[family-name:var(--font-tajawal)] leading-tight max-w-[240px]">
            عندما يرسل لك زميل مهمة ستظهر هنا فورًا.
          </p>
        </div>
      )}
    </div>
  );
}
