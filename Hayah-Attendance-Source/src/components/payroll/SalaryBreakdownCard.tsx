"use client";

import React from "react";

export function SalaryBreakdownCard() {
  return (
    <div
      className="w-full lg:w-[522px] min-h-[454px] bg-[#131313] border border-[#262626] rounded-[34px] p-6 flex flex-col justify-between select-none shadow-sm"
      dir="rtl"
    >
      {/* Title matching screenshot */}
      <div className="w-full text-right pb-1">
        <h3 className="text-[17px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
          تفاصيل الشهر الحالي - سبتمبر 2026
        </h3>
      </div>

      {/* Breakdown List */}
      <div className="w-full flex flex-col flex-1 justify-between gap-1 text-[14px] font-[family-name:var(--font-tajawal)] mt-2">
        
        {/* 1. الراتب الأساسي */}
        <div className="flex items-center justify-between py-2.5">
          <span className="font-normal text-[#F5F3EF]">الراتب الأساسي</span>
          <b className="font-extrabold text-[#F5F3EF] text-[16px]">
            12,000
          </b>
        </div>

        {/* 2. الراتب الصافي */}
        <div className="flex items-center justify-between py-2.5">
          <span className="font-normal text-[#F5F3EF]">الراتب الصافي</span>
          <b className="font-extrabold text-[#F5F3EF] text-[16px]">
            12,400
          </b>
        </div>

        {/* 3. البدلات Group Header */}
        <div className="pt-2 pb-0.5 text-right">
          <span className="text-[13px] font-extrabold text-[#8FCB4E]">
            البدلات
          </span>
        </div>

        {/* الوقت الإضافي */}
        <div className="flex items-center justify-between py-1 text-[#A8A29E] text-[13px]">
          <span>الوقت الإضافي</span>
          <span className="font-bold text-[15px]">-</span>
        </div>

        {/* المكافآت */}
        <div className="flex items-center justify-between py-1 text-[#A8A29E] text-[13px]">
          <span>المكافآت</span>
          <span className="font-bold text-[15px]">-</span>
        </div>

        {/* 4. الخصومات Group Header */}
        <div className="pt-2 pb-0.5 text-right">
          <span className="text-[13px] font-extrabold text-[#FF453A]">
            الخصومات
          </span>
        </div>

        {/* التأخير */}
        <div className="flex items-center justify-between py-1 text-[#A8A29E] text-[13px]">
          <span>التأخير</span>
          <span className="font-bold text-[15px]">-</span>
        </div>

        {/* الإجازات */}
        <div className="flex items-center justify-between py-1 text-[#A8A29E] text-[13px]">
          <span>الإجازات</span>
          <span className="font-bold text-[15px]">-</span>
        </div>

        {/* 5. قيد التحويل Row (border-top) */}
        <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#262626]">
          <div className="flex flex-col text-right">
            <span className="font-medium text-[#F5F3EF] text-[14px]">
              قيد التحويل
            </span>
            <span className="text-[11px] font-normal text-[#9A968E]">
              في 1 أكتوبر 2026
            </span>
          </div>
          <span className="font-bold text-[#F5F3EF] text-[16px]">-</span>
        </div>

      </div>
    </div>
  );
}
