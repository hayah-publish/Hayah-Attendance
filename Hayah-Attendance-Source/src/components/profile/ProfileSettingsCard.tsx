"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronDown, Sparkles } from "lucide-react";
import { DEFAULT_USER, UserData } from "@/lib/userService";

interface ProfileSettingsCardProps {
  user?: UserData;
  activeItem?: string;
  onItemClick?: (id: string) => void;
}

export function ProfileSettingsCard({
  user = DEFAULT_USER,
  activeItem = "personal-info",
  onItemClick,
}: ProfileSettingsCardProps) {
  const [currentActive, setCurrentActive] = useState(activeItem);

  const handleSelect = (id: string) => {
    setCurrentActive(id);
    if (onItemClick) {
      onItemClick(id);
    }
  };

  return (
    <div
      className="w-full lg:w-[304px] min-h-[588px] bg-[#131313] border border-[#262626] rounded-[34px] p-4 flex flex-col gap-3.5 select-none shrink-0 shadow-sm"
      dir="rtl"
    >
      {/* 1. Who Cell: Avatar + User Info */}
      <div className="flex items-center justify-between p-2 pb-3 border-b border-[#262626]/40">
        <div className="flex items-center gap-3">
          {/* Avatar with Sparkle / Edit Badge */}
          <div className="relative">
            <div className="w-[52px] h-[52px] rounded-full bg-[#2D2922] text-[#F39708] font-bold text-[20px] font-[family-name:var(--font-poppins)] flex items-center justify-center shrink-0 shadow-inner">
              {user.avatarLetter || "M"}
            </div>
            {/* Sparkle badge */}
            <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-[#F5F3EF] flex items-center justify-center shadow-md">
              <Sparkles className="w-3 h-3 text-[#141414] stroke-[2.5]" />
            </div>
          </div>

          {/* Texts */}
          <div className="flex flex-col text-right">
            <span className="text-[17px] font-bold text-[#F5F3EF] font-[family-name:var(--font-tajawal)] leading-tight">
              {user.fullName || "Mohamed Amin"}
            </span>
            <span className="text-[11px] font-normal text-[#9A968E] font-[family-name:var(--font-tajawal)] mt-0.5">
              {user.job || "Dev/Backend"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Group 1: الحساب */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-normal text-[#9A968E] font-[family-name:var(--font-tajawal)] px-2 text-right">
          الحساب
        </span>
        <div className="bg-[#1F1F1F] rounded-[22px] p-2 flex flex-col gap-1.5 border border-[#262626]/30">
          {/* Item 1: البيانات الشخصية (Active by default) */}
          <button
            type="button"
            onClick={() => handleSelect("personal-info")}
            className={`w-full h-[42px] px-3 rounded-[12px] flex items-center justify-between transition-all cursor-pointer ${
              currentActive === "personal-info"
                ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                : "text-[#F5F3EF] hover:bg-[#2A2A2A]"
            }`}
          >
            <span className="text-[14px] font-[family-name:var(--font-tajawal)]">
              البيانات الشخصية
            </span>
            <ChevronLeft
              className={`w-4 h-4 stroke-[2.5] ${
                currentActive === "personal-info" ? "text-[#141414]" : "text-[#9A968E]"
              }`}
            />
          </button>

          {/* Item 2: الأمان وكلمة المرور */}
          <button
            type="button"
            onClick={() => handleSelect("security")}
            className={`w-full h-[42px] px-3 rounded-[12px] flex items-center justify-between transition-all cursor-pointer ${
              currentActive === "security"
                ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                : "text-[#F5F3EF] hover:bg-[#2A2A2A]"
            }`}
          >
            <span className="text-[14px] font-[family-name:var(--font-tajawal)]">
              الأمان وكلمة المرور
            </span>
            <ChevronLeft
              className={`w-4 h-4 stroke-[2.5] ${
                currentActive === "security" ? "text-[#141414]" : "text-[#9A968E]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3. Group 2: التفضيلات */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-normal text-[#9A968E] font-[family-name:var(--font-tajawal)] px-2 text-right">
          التفضيلات
        </span>
        <div className="bg-[#1F1F1F] rounded-[22px] p-2 flex flex-col gap-1.5 border border-[#262626]/30">
          {/* Item 1: الإشعارات */}
          <button
            type="button"
            onClick={() => handleSelect("notifications")}
            className={`w-full h-[42px] px-3 rounded-[12px] flex items-center justify-between transition-all cursor-pointer ${
              currentActive === "notifications"
                ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                : "text-[#F5F3EF] hover:bg-[#2A2A2A]"
            }`}
          >
            <span className="text-[14px] font-[family-name:var(--font-tajawal)]">
              الإشعارات
            </span>
            <ChevronLeft
              className={`w-4 h-4 stroke-[2.5] ${
                currentActive === "notifications" ? "text-[#141414]" : "text-[#9A968E]"
              }`}
            />
          </button>

          {/* Item 2: المظهر والعرض */}
          <button
            type="button"
            onClick={() => handleSelect("appearance")}
            className={`w-full h-[42px] px-3 rounded-[12px] flex items-center justify-between transition-all cursor-pointer ${
              currentActive === "appearance"
                ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                : "text-[#F5F3EF] hover:bg-[#2A2A2A]"
            }`}
          >
            <span className="text-[14px] font-[family-name:var(--font-tajawal)]">
              المظهر والعرض
            </span>
            <ChevronLeft
              className={`w-4 h-4 stroke-[2.5] ${
                currentActive === "appearance" ? "text-[#141414]" : "text-[#9A968E]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 4. Group 3: النظام */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-normal text-[#9A968E] font-[family-name:var(--font-tajawal)] px-2 text-right">
          النظام
        </span>
        <div className="bg-[#1F1F1F] rounded-[22px] p-2 flex flex-col gap-1.5 border border-[#262626]/30">
          {/* Item 1: اللغة */}
          <div className="w-full h-[42px] px-3 rounded-[12px] flex items-center justify-between text-[#F5F3EF]">
            <span className="text-[14px] font-[family-name:var(--font-tajawal)]">
              اللغة
            </span>
            {/* Pill: العربية */}
            <div className="bg-[#262626] rounded-full px-2.5 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-[#333333] transition-colors">
              <span className="text-[12px] font-medium font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
                العربية
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9A968E]" />
            </div>
          </div>

          {/* Item 2: المساعدة والدعم */}
          <button
            type="button"
            onClick={() => handleSelect("help")}
            className={`w-full h-[42px] px-3 rounded-[12px] flex items-center justify-between transition-all cursor-pointer ${
              currentActive === "help"
                ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                : "text-[#F5F3EF] hover:bg-[#2A2A2A]"
            }`}
          >
            <span className="text-[14px] font-[family-name:var(--font-tajawal)]">
              المساعدة والدعم
            </span>
            <ChevronLeft
              className={`w-4 h-4 stroke-[2.5] ${
                currentActive === "help" ? "text-[#141414]" : "text-[#9A968E]"
              }`}
            />
          </button>

          {/* Item 3: تسجيل الخروج */}
          <button
            type="button"
            onClick={() => handleSelect("logout")}
            className={`w-full h-[42px] px-3 rounded-[12px] flex items-center justify-between transition-all cursor-pointer ${
              currentActive === "logout"
                ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                : "text-[#F5F3EF] hover:bg-[#2A2A2A] hover:text-[#EF4444]"
            }`}
          >
            <span className="text-[14px] font-[family-name:var(--font-tajawal)]">
              تسجيل الخروج
            </span>
            <ChevronLeft className="w-4 h-4 stroke-[2.5] text-[#9A968E]" />
          </button>
        </div>
      </div>
    </div>
  );
}
