"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CheckSquare,
  CheckCircle2,
  Calendar,
  Inbox,
  CreditCard,
  Wallet,
  User,
  PanelRightClose,
} from "lucide-react";
import { Logo } from "./Logo";
import { DailyProgressCard } from "./DailyProgressCard";

export function SortTimeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3 horizontal sorting lines on the left */}
      <path
        d="M2.5 6.5H8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M2.5 10H7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M2.5 13.5H6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Clock on the right */}
      <circle
        cx="14"
        cy="10"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M14 7.8V10L15.5 10.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SidebarProps {
  activeTab?: string;
  userName?: string;
  lastUpdated?: string;
}

export function Sidebar({
  activeTab,
  userName = "سلمى",
  lastUpdated = "27 سبتمبر",
}: SidebarProps) {
  const pathname = usePathname();

  // Determine current active item based on pathname or activeTab prop
  const isHomeActive = activeTab ? activeTab === "home" : pathname === "/";
  const isTasksActive = activeTab ? activeTab === "tasks" : pathname.startsWith("/tasks");
  const isSummaryActive = activeTab ? activeTab === "summary" : pathname.startsWith("/summary");
  const isAttendanceActive = activeTab ? activeTab === "attendance" : pathname.startsWith("/attendance");
  const isRequestsActive = activeTab ? activeTab === "requests" : pathname.startsWith("/requests");
  const isBalancesActive = activeTab ? activeTab === "balances" : pathname.startsWith("/balances");
  const isPayrollActive = activeTab ? activeTab === "payroll" : pathname.startsWith("/payroll");
  const isProfileActive = activeTab ? activeTab === "profile" : pathname.startsWith("/profile");

  return (
    <aside className="w-[264px] shrink-0 flex flex-col gap-6 bg-[#141414] select-none" dir="rtl">
      {/* 1. Brand Row: Logo + Brand Name on right, Collapse Button on left */}
      <div className="w-[264px] h-[44px] flex items-center justify-between">
        <Logo />
        <button
          type="button"
          aria-label="تبديل القائمة الجانبية"
          className="w-[32px] h-[32px] rounded-[10px] border border-[#262626] bg-transparent hover:bg-[#1F1F1F] text-[#9A968E] hover:text-[#F5F3EF] flex items-center justify-center transition-colors cursor-pointer"
        >
          <PanelRightClose className="w-[18px] h-[18px]" />
        </button>
      </div>

      {/* 2. Welcome Block */}
      <div className="px-1 text-right">
        <h2 className="text-[24px] font-extrabold text-[#F5F3EF] leading-[29px]">
          أهلاً بعودتك،
          <br />
          {userName}
        </h2>
        <span className="text-[12px] text-[#9A968E] mt-1 block font-normal">
          آخر تحديث: {lastUpdated}
        </span>
      </div>

      {/* 3. Navigation Groups Container (Frame 2147228965) */}
      <div className="w-[264px] bg-[#000000] rounded-[26px] p-2.5 flex flex-col gap-2 border border-[#262626]/40">
        
        {/* Group 1: عملي */}
        <div className="flex flex-col gap-1">
          <div className="px-3 pt-1 text-[12px] text-[#9A968E] text-right">
            عملي
          </div>
          
          <nav className="flex flex-col gap-1">
            {/* الرئيسية */}
            <Link
              href="/"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all ${
                isHomeActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className={`w-5 h-5 ${isHomeActive ? "text-[#141414]" : "text-[#9A968E]"}`} />
                <span className={`text-[14px] ${isHomeActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  الرئيسية
                </span>
              </div>
            </Link>

            {/* المهام */}
            <Link
              href="/tasks"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all group ${
                isTasksActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckSquare className={`w-5 h-5 ${isTasksActive ? "text-[#141414]" : "text-[#9A968E] group-hover:text-[#F5F3EF]"}`} />
                <span className={`text-[14px] ${isTasksActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  المهام
                </span>
              </div>
              <span className="w-[22px] h-[22px] rounded-full bg-[#F39708] text-[#F5F3EF] font-semibold text-[11px] font-[family-name:var(--font-poppins)] flex items-center justify-center">
                6
              </span>
            </Link>

            {/* ملخص العمل */}
            <Link
              href="/summary"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all group ${
                isSummaryActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 ${isSummaryActive ? "text-[#141414]" : "text-[#9A968E] group-hover:text-[#F5F3EF]"}`} />
                <span className={`text-[14px] ${isSummaryActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  ملخص العمل
                </span>
              </div>
            </Link>

            {/* الحضور */}
            <Link
              href="/attendance"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all group ${
                isAttendanceActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className={`w-5 h-5 ${isAttendanceActive ? "text-[#141414]" : "text-[#9A968E] group-hover:text-[#F5F3EF]"}`} />
                <span className={`text-[14px] ${isAttendanceActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  الحضور
                </span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Group 2: حسابي */}
        <div className="flex flex-col gap-1 pt-2 border-t border-[#262626]">
          <div className="px-3 text-[12px] text-[#9A968E] text-right">
            حسابي
          </div>
          
          <nav className="flex flex-col gap-1">
            {/* الطلبات */}
            <Link
              href="/requests"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all group ${
                isRequestsActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className={`w-5 h-5 ${isRequestsActive ? "text-[#141414]" : "text-[#9A968E] group-hover:text-[#F5F3EF]"}`} />
                <span className={`text-[14px] ${isRequestsActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  الطلبات
                </span>
              </div>
            </Link>

            {/* الارصده */}
            <Link
              href="/balances"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all group ${
                isBalancesActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <SortTimeIcon className={`w-5 h-5 ${isBalancesActive ? "text-[#141414]" : "text-[#9A968E] group-hover:text-[#F5F3EF]"}`} />
                <span className={`text-[14px] ${isBalancesActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  الارصده
                </span>
              </div>
            </Link>

            {/* المحفظه والراتب */}
            <Link
              href="/payroll"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all group ${
                isPayrollActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet className={`w-5 h-5 ${isPayrollActive ? "text-[#141414]" : "text-[#9A968E] group-hover:text-[#F5F3EF]"}`} />
                <span className={`text-[14px] ${isPayrollActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  المحفظه والراتب
                </span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Group 3: عام */}
        <div className="flex flex-col gap-1 pt-2 border-t border-[#262626]">
          <div className="px-3 text-[12px] text-[#9A968E] text-right">
            عام
          </div>
          
          <nav className="flex flex-col gap-1">
            <Link
              href="/profile"
              className={`flex items-center justify-between px-3 h-[44px] rounded-[16px] transition-all group ${
                isProfileActive
                  ? "bg-[#F5F3EF] text-[#141414] font-bold shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF] hover:bg-[#1A1A1A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <User className={`w-5 h-5 ${isProfileActive ? "text-[#141414]" : "text-[#9A968E] group-hover:text-[#F5F3EF]"}`} />
                <span className={`text-[14px] ${isProfileActive ? "font-bold text-[#141414]" : "font-medium"}`}>
                  البروفايل
                </span>
              </div>
            </Link>
          </nav>
        </div>

      </div>

      {/* 4. Bottom Promo Card (sbPromo) */}
      <DailyProgressCard completedCount={0} totalCount={0} percentage={0} />
    </aside>
  );
}
