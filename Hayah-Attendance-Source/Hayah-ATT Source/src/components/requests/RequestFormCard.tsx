"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, AlertCircle } from "lucide-react";

export interface RequestFormData {
  type: string;
  reason: string;
  fromDate: string;
  toDate: string;
  notes: string;
  days: number;
}

interface RequestFormCardProps {
  onSubmitRequest?: (data: RequestFormData) => void;
  availableBalance?: number;
}

const REQUEST_TYPES = [
  { id: "annual", label: "اجازه سنويه" },
  { id: "sick", label: "اجازه مرضيه" },
  { id: "permission", label: "إذن استئذان" },
  { id: "remote", label: "عمل عن بعد" },
  { id: "other", label: "أخرى" },
];

export function RequestFormCard({
  onSubmitRequest,
  availableBalance = 15,
}: RequestFormCardProps) {
  const [selectedType, setSelectedType] = useState("اجازه سنويه");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("2026-10-06");
  const [toDate, setToDate] = useState("2026-10-08");
  const [notes, setNotes] = useState("");

  // Calculate duration in days
  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const requestDays = calculateDays();
  const remainingBalance = Math.max(0, availableBalance - requestDays);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitRequest) {
      onSubmitRequest({
        type: selectedType,
        reason: reason.trim() || "إجازة سنوية اعتيادية",
        fromDate,
        toDate,
        notes,
        days: requestDays || 1,
      });
      // Reset reason and notes after submission
      setReason("");
      setNotes("");
    }
  };

  return (
    <div
      className="w-full lg:w-[507px] min-h-[660px] bg-[#131313] rounded-[34px] p-5 flex flex-col gap-[14px] border border-[#262626]/40 select-none"
      dir="rtl"
    >
      {/* card-head: 467px x 26px */}
      <div className="w-full flex items-center justify-start h-[26px]">
        <h2 className="text-[17px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          طلب جديد
        </h2>
      </div>

      {/* rqForm: 467px x 567px */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        {/* Field 1: نوع الطلب (Request Type) */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E] text-right">
            نوع الطلب
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full h-[50px] bg-[#1F1F1F] hover:bg-[#252525] rounded-[18px] px-4 flex items-center justify-between text-right transition-colors cursor-pointer border border-transparent focus:border-[#F39708]/50"
            >
              <span className="text-[13px] font-medium font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
                {selectedType}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#9A968E] transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-[56px] right-0 left-0 z-30 bg-[#1F1F1F] border border-[#262626] rounded-[18px] py-1 shadow-2xl backdrop-blur-md overflow-hidden animate-in fade-in zoom-in-95">
                {REQUEST_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(type.label);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-right text-[13px] font-[family-name:var(--font-tajawal)] transition-colors flex items-center justify-between cursor-pointer ${
                      selectedType === type.label
                        ? "bg-[#2A2A2A] text-[#F39708] font-bold"
                        : "text-[#F5F3EF] hover:bg-[#252525]"
                    }`}
                  >
                    <span>{type.label}</span>
                    {selectedType === type.label && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F39708]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Field 2: السبب (Reason) */}
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E] text-right">
            السبب
          </label>
          <div className="w-full h-[50px] bg-[#1F1F1F] rounded-[22px] px-4 flex items-center border border-transparent focus-within:border-[#F39708]/40 transition-all">
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="اكتب سبب الطلب هنا..."
              className="w-full bg-transparent text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#F5F3EF] placeholder-[#757575] outline-none text-right"
            />
          </div>
        </div>

        {/* Field 3: التواريخ من وإلى (Dates: From & To) */}
        <div className="w-full flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Right in RTL: من (From) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E] text-right">
                من
              </label>
              <div className="w-full h-[50px] bg-[#1F1F1F] rounded-[22px] px-3.5 flex items-center justify-between border border-transparent focus-within:border-[#F39708]/40 transition-all">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="bg-transparent text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] outline-none text-right cursor-pointer w-full [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.6]"
                />
                <Calendar className="w-3.5 h-3.5 text-[#9A968E] shrink-0 pointer-events-none" />
              </div>
            </div>

            {/* Left in RTL: إلى (To) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E] text-right">
                إلى
              </label>
              <div className="w-full h-[50px] bg-[#1F1F1F] rounded-[22px] px-3.5 flex items-center justify-between border border-transparent focus-within:border-[#F39708]/40 transition-all">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="bg-transparent text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] outline-none text-right cursor-pointer w-full [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.6]"
                />
                <Calendar className="w-3.5 h-3.5 text-[#9A968E] shrink-0 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Field 4: ملاحظات إضافية (Additional Notes) */}
        <div className="w-full flex flex-col gap-1.5">
          <label className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E] text-right">
            ملاحظات إضافية
          </label>
          <div className="w-full h-[50px] bg-[#1F1F1F] rounded-[22px] px-4 flex items-center border border-transparent focus-within:border-[#F39708]/40 transition-all">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="أي تفاصيل أو ملاحظات أخرى..."
              className="w-full bg-transparent text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#F5F3EF] placeholder-[#757575] outline-none text-right"
            />
          </div>
        </div>

        {/* req-sum: Request Summary Box (467px x 122px, border: 1px solid #262626, rounded 22px) */}
        <div className="w-full h-[122px] border border-[#262626] rounded-[22px] px-4 py-1.5 flex flex-col justify-center">
          {/* Row 1: رصيد الإجازات */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#262626]/50">
            <span className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E]">
              رصيد الإجازات
            </span>
            <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
              {availableBalance} يوم
            </span>
          </div>

          {/* Row 2: مدة الطلب */}
          <div className="flex items-center justify-between py-1.5 border-b border-[#262626]/50">
            <span className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E]">
              مدة الطلب
            </span>
            <span className="text-[14px] font-semibold font-[family-name:var(--font-poppins)] text-[#F5F3EF]">
              {requestDays} {requestDays === 1 ? "يوم" : "أيام"}
            </span>
          </div>

          {/* Row 3 (hl): الرصيد المتبقي */}
          <div className="flex items-center justify-between py-1.5">
            <span className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#A8A29E]">
              الرصيد المتبقي
            </span>
            <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F39708]">
              {remainingBalance} يوم
            </span>
          </div>
        </div>

        {/* sub: Helper text */}
        <div className="w-full text-right">
          <p className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] leading-tight">
            * سيتم خصم الأيام تلقائياً من رصيدك عند قبول واعتماد الطلب
          </p>
        </div>

        {/* btn-light: Submit Button (467px x 52px, bg #F5F3EF, rounded 26px) */}
        <button
          type="submit"
          className="w-full h-[52px] bg-[#F5F3EF] hover:bg-[#FFFFFF] active:scale-[0.99] text-[#141414] font-extrabold font-[family-name:var(--font-tajawal)] text-[15px] rounded-[26px] flex items-center justify-center transition-all cursor-pointer shadow-md mt-1"
        >
          تقديم الطلب
        </button>
      </form>
    </div>
  );
}
