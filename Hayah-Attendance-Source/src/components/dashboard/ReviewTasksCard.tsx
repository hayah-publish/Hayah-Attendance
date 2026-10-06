"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";
import { ReviewTask } from "@/lib/reviewsService";

interface ReviewTasksCardProps {
  reviews?: ReviewTask[];
  isLoading?: boolean;
  onDetailsClick?: () => void;
  href?: string;
}

export function ReviewTasksCard({
  reviews = [],
  isLoading = false,
  onDetailsClick,
  href = "/tasks?tab=review",
}: ReviewTasksCardProps) {
  const count = reviews.length;
  const displayReviews = React.useMemo(() => [...reviews].reverse(), [reviews]);

  return (
    <div
      className="bg-[#F2F2F2] text-[#141414] rounded-[30px] p-5 flex flex-col justify-between h-[184px] shadow-sm select-none"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <h3 className="text-[16px] font-extrabold text-[#141414] tracking-tight font-[family-name:var(--font-tajawal)]">
            مهام تحتاج الي مراجعتك : -
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
            aria-label="عرض مهام المراجعة"
            className="w-8 h-8 rounded-full bg-[#141414] text-[#F5F3EF] flex items-center justify-center hover:bg-[#2A2A2A] transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onDetailsClick}
            aria-label="عرض مهام المراجعة"
            className="w-8 h-8 rounded-full bg-[#141414] text-[#F5F3EF] flex items-center justify-center hover:bg-[#2A2A2A] transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            <ArrowUpLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Content Area */}
      {isLoading ? (
        /* Loading skeleton matching review card design */
        <div className="flex-1 overflow-hidden mt-2 space-y-2">
          <div className="w-full h-[88px] bg-[#FFFFFF] rounded-[26px] p-[14px] flex flex-col justify-between animate-pulse shadow-sm">
            {/* Top row */}
            <div className="flex items-start gap-2.5 w-full" dir="rtl">
              <div className="w-[30px] h-[30px] rounded-full bg-[#EAEAEA] shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="h-3.5 bg-[#EAEAEA] rounded-md w-3/4" />
                <div className="h-2.5 bg-[#F5F5F5] rounded-md w-1/2" />
              </div>
            </div>
            {/* Bottom row */}
            <div className="flex items-center justify-between w-full h-[20px] pt-0.5" dir="rtl">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#EAEAEA] shrink-0" />
                <div className="w-24 h-2.5 bg-[#EAEAEA] rounded-md" />
              </div>
              <div className="w-12 h-2.5 bg-[#F5F5F5] rounded-md" />
            </div>
          </div>
        </div>
      ) : reviews.length > 0 ? (
        <div className="flex-1 overflow-y-auto mt-2 space-y-2 pl-1.5 pr-0.5 max-h-[105px] custom-scrollbar-light">
          {displayReviews.map((review) => {
            const senderName =
              review.sender_name ||
              review.sender_first_name ||
              (review.sent_from === "razki03"
                ? "Rahma Ahmed"
                : review.sent_from === "ag-hayah"
                ? "Ahmed Galal"
                : review.sent_from || "");
            const senderJob =
              review.sender_job ||
              (review.sent_from === "razki03"
                ? "Ui/Ux"
                : review.sent_from === "ag-hayah"
                ? "CEO"
                : "");
            const senderDisplay = senderJob
              ? `${senderName} - ${senderJob}`
              : senderName;
            const cleanLetters = senderName.replace(/[^a-zA-Z\u0621-\u064A]/g, "");
            const avatarLetter = (
              review.sender_avatar ||
              cleanLetters[0] ||
              (review.sent_from ? review.sent_from[0] : "U")
            ).toUpperCase();

            return (
              <Link
                key={review.code}
                href={href}
                className="w-full min-h-[88px] h-auto bg-[#FFFFFF] rounded-[26px] p-[14px] flex flex-col justify-between gap-2 hover:shadow-md transition-all text-right shrink-0 cursor-pointer block select-none border border-transparent hover:border-[#E5E5E5]"
              >
                {/* in-top: Top Row with Green Auto-Graph Icon (#8FCB4E) and 2-Line Expandable Title */}
                <div className="flex items-start gap-2.5 w-full min-w-0" dir="rtl">
                  {/* ic:round-auto-graph with Green Background (#8FCB4E) */}
                  <div className="w-[30px] h-[30px] rounded-full bg-[#8FCB4E] flex items-center justify-center shrink-0 mt-0.5">
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

                  {/* Title (Expandable up to 2 lines) */}
                  <h4 className="text-[14px] font-bold text-[#141414] font-[family-name:var(--font-tajawal)] leading-[19px] line-clamp-2 flex-1 text-right">
                    {review.title}
                  </h4>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between w-full h-[20px] pt-0.5" dir="rtl">
                  {/* Right in RTL: Avatar + Sender/Team text */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    {/* Avatar circle (20px x 20px, rgba(243, 151, 8, 0.2)) */}
                    <div className="w-5 h-5 rounded-full bg-[rgba(243,151,8,0.2)] flex items-center justify-center shrink-0">
                      <span className="text-[#F39708] text-[10px] font-bold font-[family-name:var(--font-tajawal)] leading-[11px]">
                        {avatarLetter}
                      </span>
                    </div>

                    {/* Sender text */}
                    <span className="text-[12px] font-medium text-[#141414] font-[family-name:var(--font-tajawal)] leading-[14px] truncate max-w-[170px]">
                      {senderDisplay}
                    </span>
                  </div>

                  {/* Left in RTL: Publish Time (LTR format) */}
                  <span
                    dir="ltr"
                    className="text-[10px] font-normal text-[#9A968E] leading-[12px] shrink-0 font-sans tracking-wide"
                  >
                    {review.publish_time}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-[#FFFFFF] border border-dashed border-[#D8D6D1] rounded-[18px] p-3 text-center flex-1 flex flex-col items-center justify-center mt-2">
          <h4 className="text-[14px] font-extrabold text-[#141414] font-[family-name:var(--font-tajawal)]">
            لا توجد مهام بانتظار مراجعتك
          </h4>
          <p className="text-[12px] text-[#5B5750] mt-1 leading-tight font-[family-name:var(--font-tajawal)]">
            المهام التي ترسلها لزملائك وتُسلّم ستظهر هنا لتعمدها.
          </p>
        </div>
      )}
    </div>
  );
}
