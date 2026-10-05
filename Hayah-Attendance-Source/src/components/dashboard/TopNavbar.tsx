"use client";

import React, { useState } from "react";
import { Search, Bell, Plus, PanelRightClose } from "lucide-react";
import { Logo } from "./Logo";

interface TopNavbarProps {
  userName?: string;
  userEmail?: string;
  onNewClick?: () => void;
}

export function TopNavbar({
  userName = "سلمى",
  userEmail = "salma@hd-studio.com",
  onNewClick,
}: TopNavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full flex items-center justify-between px-6 py-3.5 border-b border-[#1A1C22] bg-[#0B0C0E]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#7D521B] text-[#FBD38D] font-bold text-sm flex items-center justify-center border border-[#976527]/40 shadow-inner select-none">
            S
          </div>
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-white leading-tight">
              أهلاً، {userName}
            </span>
            <span className="text-[11px] text-neutral-400 font-normal leading-tight font-sans">
              {userEmail}
            </span>
          </div>
        </div>

        <button
          type="button"
          aria-label="التنبيهات"
          className="relative w-9 h-9 rounded-full bg-[#15161A] border border-[#23252C] flex items-center justify-center text-neutral-300 hover:text-white hover:bg-[#1E2026] transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#EA580C] rounded-full ring-2 ring-[#15161A]" />
        </button>

        <button
          type="button"
          onClick={onNewClick}
          className="bg-white text-black hover:bg-neutral-200 transition-all font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm cursor-pointer select-none active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>جديد</span>
        </button>
      </div>

      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المهمة، الملف أو الزميل..."
            className="w-full bg-[#131418] border border-[#21232B] hover:border-[#2F323D] focus:border-[#4B5061] text-xs text-white placeholder:text-neutral-500 rounded-full py-2.5 pr-10 pl-16 focus:outline-none transition-all shadow-inner"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 pointer-events-none" />
          <div className="absolute left-3 bg-[#1C1E25] border border-[#2B2E38] text-[10px] text-neutral-400 font-mono px-2 py-0.5 rounded-md pointer-events-none">
            Ctrl K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Logo />
        <button
          type="button"
          aria-label="تبديل القائمة الجانبية"
          className="w-8 h-8 rounded-lg bg-transparent hover:bg-[#18191E] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <PanelRightClose className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
