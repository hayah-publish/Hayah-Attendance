"use client";

import React from "react";
import { Inbox, Clock, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { RequestFormData } from "./RequestFormCard";

export interface RequestItem extends RequestFormData {
  id: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  statusLabel: string;
}

interface RequestsListCardProps {
  requests?: RequestItem[];
}

export function RequestsListCard({ requests = [] }: RequestsListCardProps) {
  const hasRequests = requests && requests.length > 0;

  return (
    <div
      className={`w-full lg:w-[515px] ${
        hasRequests ? "min-h-[274px]" : "h-[274px]"
      } bg-[#131313] rounded-[34px] p-5 flex flex-col gap-[14px] border border-[#262626]/40 select-none`}
      dir="rtl"
    >
      {/* card-head: 475px x 26px */}
      <div className="w-full flex items-center justify-between h-[26px]">
        <h2 className="text-[17px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          طلباتي
        </h2>
        {hasRequests && (
          <span className="text-[12px] font-medium font-[family-name:var(--font-tajawal)] text-[#9A968E] bg-[#1F1F1F] px-2.5 py-0.5 rounded-full">
            {requests.length} طلب
          </span>
        )}
      </div>

      {/* es: Empty State Box (475px x 194px, border: 1px dashed #262626, rounded 22px) */}
      {!hasRequests ? (
        <div className="w-full h-[194px] min-h-[194px] border border-dashed border-[#262626] rounded-[22px] p-[28px_18px] flex flex-col items-center justify-center gap-3">
          {/* es-ic: 56px x 56px rounded-full bg #1F1F1F */}
          <div className="w-[56px] h-[56px] min-h-[56px] rounded-[28px] bg-[#1F1F1F] flex items-center justify-center">
            {/* Custom SVG / Icon matching Figma vectors */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#F5F3EF]"
            >
              <rect
                x="4"
                y="5"
                width="16"
                height="14"
                rx="3"
                stroke="#F5F3EF"
                strokeWidth="1.7"
              />
              <path
                d="M4 13C6.5 13 7.5 15.5 10 15.5H14C16.5 15.5 17.5 13 20 13"
                stroke="#F5F3EF"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* text 1: Title */}
          <h3 className="text-[15px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] text-center leading-tight">
            لا توجد طلبات سابقة
          </h3>

          {/* text 2: Subtitle */}
          <p className="text-[12.5px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] text-center leading-tight">
            لم تقم بتقديم أي طلبات إجازة أو أذونات حتى الآن.
          </p>
        </div>
      ) : (
        /* Requests List if populated */
        <div className="w-full flex flex-col gap-2.5 overflow-y-auto max-h-[560px] pr-0.5">
          {requests.map((item) => (
            <div
              key={item.id}
              className="w-full bg-[#1F1F1F] hover:bg-[#252525] rounded-[20px] p-4 flex flex-col gap-2.5 border border-[#262626]/60 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
                    {item.type}
                  </span>
                  <span className="text-[12px] font-medium font-[family-name:var(--font-tajawal)] text-[#9A968E]">
                    ({item.days} {item.days === 1 ? "يوم" : "أيام"})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F39708]/10 text-[#F39708] border border-[#F39708]/20 text-[11px] font-bold font-[family-name:var(--font-tajawal)]">
                  <Clock className="w-3 h-3" />
                  <span>{item.statusLabel}</span>
                </div>
              </div>

              <p className="text-[12.5px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] line-clamp-1">
                السبب: {item.reason}
              </p>

              <div className="flex items-center justify-between text-[11px] font-normal font-[family-name:var(--font-tajawal)] text-[#757575] pt-1 border-t border-[#262626]/40">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#757575]" />
                  <span>
                    من {item.fromDate} إلى {item.toDate}
                  </span>
                </div>
                <span>{item.submittedAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
