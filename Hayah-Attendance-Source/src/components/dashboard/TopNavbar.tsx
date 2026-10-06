"use client";

import React, { useState } from "react";
import { Search, Bell, Plus } from "lucide-react";
import { DEFAULT_USER } from "@/lib/userService";

interface TopNavbarProps {
  userName?: string;
  userEmail?: string;
  avatarLetter?: string;
  onNewClick?: () => void;
}

export function TopNavbar({
  userName = DEFAULT_USER.greetingName,
  userEmail = DEFAULT_USER.email,
  avatarLetter = DEFAULT_USER.avatarLetter,
  onNewClick,
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full h-[55px] flex items-center justify-between gap-6" dir="rtl">
      {/* 1. Right Side in RTL: Search Bar (Frame 2147228848: 494px x 55px) */}
      <div className="w-[494px] max-w-full">
        <div className="relative flex items-center justify-between bg-[#000000] rounded-[26px] h-[55px] px-4 border border-transparent hover:border-[#262626] transition-all">
          <div className="flex items-center gap-2.5 flex-1">
            <Search className="w-5 h-5 text-[#9A968E] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المهمة، الملف أو الزميل..."
              className="w-full bg-transparent text-[#F5F3EF] placeholder:text-[#9A968E] text-[14px] font-[family-name:var(--font-tajawal)] focus:outline-none"
            />
          </div>

          <div className="border border-[#262626] rounded-[8px] px-2 py-0.5 text-[12px] text-[#9A968E] font-mono shrink-0 select-none">
            Ctrl K
          </div>
        </div>
      </div>

      {/* 2. Left Side in RTL: Frame 2147228862 (me-chip + Bell + Button جدید) */}
      <div className="flex items-center gap-3.5 select-none">
        {/* Button - Add Completed Task (جديد) */}
        <button
          type="button"
          onClick={onNewClick}
          className="h-[40px] px-4 py-2 bg-[#F5F3EF] hover:bg-[#E5E3DF] text-[#141414] font-extrabold text-[16px] rounded-full flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95 whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>جديد</span>
        </button>

        {/* Bell Button */}
        <button
          type="button"
          aria-label="التنبيهات"
          className="relative w-[42px] h-[42px] bg-[#1F1F1F] rounded-full flex items-center justify-center text-[#F5F3EF] hover:bg-[#2A2A2A] transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4 stroke-[1.75]" />
          <span className="absolute top-[11px] left-[11px] w-[6px] h-[6px] bg-[#F39708] rounded-full ring-2 ring-[#1F1F1F]" />
        </button>

        {/* Me Chip */}
        <div className="flex items-center gap-2.5 bg-transparent pl-1">
          <div className="w-[44px] h-[44px] rounded-full bg-[#2D2922] text-[#F39708] font-extrabold text-[16px] flex items-center justify-center shrink-0">
            {avatarLetter}
          </div>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[14px] font-extrabold text-[#F5F3EF] leading-tight">
              {userName}
            </span>
            <span className="text-[14px] text-[#9A968E] font-normal leading-tight font-sans">
              {userEmail}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
