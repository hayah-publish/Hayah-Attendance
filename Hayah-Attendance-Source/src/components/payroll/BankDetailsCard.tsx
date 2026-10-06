"use client";

import React from "react";

interface BankDetailsCardProps {
  onRequestLoan?: () => void;
}

export function BankDetailsCard({ onRequestLoan }: BankDetailsCardProps) {
  return (
    <div className="w-full lg:w-[494px] flex flex-col gap-4 select-none" dir="rtl">
      
      {/* 1. Bank Details Card (height 232px) */}
      <div className="w-full bg-[#131313] border border-[#262626] rounded-[34px] p-5 flex flex-col justify-between gap-3 shadow-sm">
        
        {/* Info Box (rounded 26px with internal dividers) */}
        <div className="w-full border border-[#262626] rounded-[26px] overflow-hidden flex flex-col bg-[#161616]/60">
          
          {/* Row 1: الراتب الأساسي */}
          <div className="flex items-center justify-between px-5 py-3 text-[14px] font-[family-name:var(--font-tajawal)]">
            <span className="font-normal text-[#9A968E]">الراتب الأساسي</span>
            <span className="font-bold text-[#F5F3EF]">12,000</span>
          </div>

          {/* Row 2: تاريخ استلام الراتب */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#262626] text-[14px] font-[family-name:var(--font-tajawal)]">
            <span className="font-normal text-[#9A968E]">تاريخ استلام الراتب</span>
            <span className="font-bold text-[#F5F3EF]">1 أكتوبر</span>
          </div>

          {/* Row 3: دورة العمل */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-[#262626] text-[14px] font-[family-name:var(--font-tajawal)]">
            <span className="font-normal text-[#9A968E]">دورة العمل</span>
            <span className="font-bold text-[#F5F3EF] flex items-center gap-1.5" dir="rtl">
              <span>23 أغسطس</span>
              <span className="text-[#9A968E]">←</span>
              <span>23 سبتمبر</span>
            </span>
          </div>

        </div>

        {/* Subtext notice matching exact screenshot wording */}
        <p className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] leading-relaxed text-right px-1">
          الراتب الفعلي يُصرف يوم 1 من كل شهر، دورة العمل (23 ← 23) مستقلة عن تاريخ الصرف وتُستخدم فقط لحساب أيام العمل والإجازات.
        </p>

      </div>

      {/* 2. Request Loan Button (sLoan: 494px x 46px, radius 23px, bg #1F1F1F) */}
      <button
        type="button"
        onClick={onRequestLoan}
        className="w-full h-[46px] bg-[#1F1F1F] hover:bg-[#282828] active:scale-[0.99] border border-[#262626]/50 rounded-[23px] text-[#F5F3EF] font-bold text-[14px] font-[family-name:var(--font-tajawal)] flex items-center justify-center transition-all cursor-pointer shadow-sm"
      >
        طلب سلفة
      </button>

    </div>
  );
}
