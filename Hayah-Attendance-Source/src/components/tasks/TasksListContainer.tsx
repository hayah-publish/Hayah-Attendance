"use client";

import React from "react";
import { Plus, ArrowUpDown, LayoutGrid, List, Search, Sparkles, Send } from "lucide-react";

interface TasksListContainerProps {
  activeTab: "today" | "sent";
  onTabChange: (tab: "today" | "sent") => void;
  onAddTask: () => void;
}

export function TasksListContainer({
  activeTab,
  onTabChange,
  onAddTask,
}: TasksListContainerProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  return (
    <div className="w-full lg:w-[700px] h-full min-h-[477px] bg-[#131313] rounded-[34px] p-5 flex flex-col gap-5 border border-[#262626]/40 select-none" dir="rtl">
      
      {/* Row 1: Header with Tabs (قسمين فقط: مهامي اليوم و مهام أرسلتها) and + اضافه مهمه */}
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Right in RTL: Tabs (مهامي اليوم & مهام أرسلتها) */}
        <div className="flex items-center gap-1 bg-[#1F1F1F] rounded-[21px] p-1 h-[42px] border border-[#262626]/30">
          {/* Tab 1: مهامي اليوم */}
          <button
            type="button"
            onClick={() => onTabChange("today")}
            className={`flex items-center gap-1.5 px-4 h-[34px] rounded-[17px] text-[13px] font-bold transition-all cursor-pointer ${
              activeTab === "today"
                ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                : "text-[#9A968E] hover:text-[#F5F3EF]"
            }`}
          >
            <span>مهامي اليوم</span>
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-semibold font-[family-name:var(--font-poppins)] flex items-center justify-center transition-colors ${
                activeTab === "today"
                  ? "bg-[#141414] text-[#F5F3EF]"
                  : "bg-[#141414] text-[#9A968E]"
              }`}
            >
              0
            </span>
          </button>

          {/* Tab 2: مهام أرسلتها */}
          <button
            type="button"
            onClick={() => onTabChange("sent")}
            className={`flex items-center gap-1.5 px-4 h-[34px] rounded-[17px] text-[13px] font-bold transition-all cursor-pointer ${
              activeTab === "sent"
                ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                : "text-[#9A968E] hover:text-[#F5F3EF]"
            }`}
          >
            <span>مهام أرسلتها</span>
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-semibold font-[family-name:var(--font-poppins)] flex items-center justify-center transition-colors ${
                activeTab === "sent"
                  ? "bg-[#141414] text-[#F5F3EF]"
                  : "bg-[#141414] text-[#9A968E]"
              }`}
            >
              0
            </span>
          </button>
        </div>

        {/* Left in RTL: Button depending on activeTab (مهامي اليوم: + اضافه مهمه | مهام أرسلتها: جديد + send) */}
        {activeTab === "today" ? (
          <button
            type="button"
            onClick={onAddTask}
            className="bg-[#8FCB4E] hover:bg-[#81BC43] active:scale-95 text-[#122006] font-extrabold text-[14px] h-[37px] px-4 rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>اضافه مهمه</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAddTask}
            className="min-w-[132px] h-[37px] bg-[#F5F3EF] hover:bg-white active:scale-95 text-[#141414] font-extrabold text-[14px] rounded-[100px] flex items-center justify-center gap-[6px] px-4 transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span className="font-[family-name:var(--font-tajawal)] font-extrabold text-[14px] leading-[17px] text-[#141414]">
              ارسال مهمة
            </span>
            <Send className="w-[14px] h-[14px] text-[#141414] stroke-[1.5] -scale-x-100" />
          </button>
        )}
      </div>

      {/* Row 2: Search and View/Sort Controls (Frame 2147228914: height 42px) */}
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Right in RTL: Search Input (bg #1F1F1F, 42px) */}
        <div className="flex-1 max-w-[455px] h-[42px] bg-[#1F1F1F] rounded-[21px] px-4 flex items-center gap-2 border border-[#262626]/30">
          <Search className="w-4 h-4 text-[#9A968E] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المهام..."
            className="w-full bg-transparent text-[#F5F3EF] placeholder:text-[#9A968E] text-[14px] font-[family-name:var(--font-tajawal)] focus:outline-none"
          />
        </div>

        {/* Left in RTL: Sort Button & View Mode Seg */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sort Button */}
          <button
            type="button"
            className="h-[40px] px-3.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-full flex items-center gap-1.5 text-[14px] font-medium text-[#F5F3EF] transition-all cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4 text-[#F5F3EF]" />
            <span>ترتيب</span>
          </button>

          {/* View Mode Switcher (seg: 82px x 42px) */}
          <div className="flex items-center gap-0.5 bg-[#1F1F1F] rounded-[21px] p-1 h-[42px] border border-[#262626]/30">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`w-[36px] h-[34px] rounded-[17px] flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`w-[36px] h-[34px] rounded-[17px] flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Summary Banner (Frame: height 94px, bg #F2F2F2, border-radius 26px) */}
      <div className="w-full h-[94px] bg-[#F2F2F2] rounded-[26px] p-4 flex items-center justify-between text-[#171717] shadow-sm">
        {/* Right in RTL: Icon & Text */}
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-[18px] bg-[#F39708] flex items-center justify-center text-[#141414] shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="text-right">
            <div className="text-[16px] font-bold text-[#171717] leading-tight">
              {activeTab === "today" ? "مهام اليوم" : "مهام أرسلتها"}
            </div>
            <div className="text-[12px] font-normal text-[#9A968E] mt-0.5 leading-tight">
              {activeTab === "today" ? "0 مهام" : "0 مهام مرسلة"}
            </div>
          </div>
        </div>

        {/* Left in RTL: Circular 0% Progress (border: 7px solid #E6E6E6) */}
        <div className="w-[62px] h-[62px] rounded-full border-[7px] border-[#E6E6E6] flex items-center justify-center shrink-0">
          <span className="text-[14px] font-extrabold text-[#171717]">
            0٪
          </span>
        </div>
      </div>

      {/* Row 4: board (span: الأحد، 27 سبتمبر - 0 مهام + es: dashed empty state box) */}
      <div className="flex flex-col gap-3.5 w-full">
        {/* span: الأحد، 27 سبتمبر - 0 مهام (color #A8A29E, font-size 12px) */}
        <div className="flex justify-start pr-1">
          <span className="text-[12px] font-normal text-[#A8A29E] leading-[14px] select-none">
            {activeTab === "today"
              ? "الأحد، 27 سبتمبر - 0 مهام"
              : "الأحد، 27 سبتمبر - 0 مهام مرسلة"}
          </span>
        </div>

        {/* es: Dashed Empty State Box (height 171px, border 1px dashed #262626, border-radius 22px) */}
        <div className="w-full h-[171px] border border-dashed border-[#262626] rounded-[22px] py-7 px-4.5 flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#F5F3EF] mb-0.5 shrink-0">
            <Sparkles className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h4 className="text-[15px] font-extrabold text-[#F5F3EF]">
            {activeTab === "today" ? "لا توجد مهام اليوم" : "لا توجد مهام مرسلة"}
          </h4>
          <p className="text-[12.5px] text-[#9A968E] leading-tight max-w-[280px]">
            {activeTab === "today"
              ? "أضف مهامك الجديدة لتظهر في قائمتك اليومية ومتابعة إنجازها."
              : "لم تقم بإرسال أي مهام حتى الآن. يمكنك إنشاء مهمة جديدة وإرسالها لفريقك."}
          </p>
        </div>
      </div>

    </div>
  );
}
