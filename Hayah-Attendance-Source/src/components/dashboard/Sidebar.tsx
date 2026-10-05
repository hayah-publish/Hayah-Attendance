"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  CheckSquare,
  CheckCircle2,
  Calendar,
  Inbox,
  CreditCard,
  Wallet,
  User,
} from "lucide-react";
import { DailyProgressCard } from "./DailyProgressCard";

interface SidebarProps {
  activeTab?: string;
  userName?: string;
  lastUpdated?: string;
}

export function Sidebar({
  activeTab = "home",
  userName = "سلمى",
  lastUpdated = "27 سبتمبر",
}: SidebarProps) {
  return (
    <aside className="w-72 shrink-0 flex flex-col justify-between py-6 px-4 bg-[#0B0C0E] border-l border-[#1A1C22] min-h-[calc(100vh-65px)]">
      <div>
        <div className="px-3 mb-6">
          <h1 className="text-2xl font-bold text-white leading-tight">
            أهلاً بعودتك،
          </h1>
          <h2 className="text-2xl font-bold text-white leading-tight mt-0.5">
            {userName}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            آخر تحديث: {lastUpdated}
          </p>
        </div>

        <div className="mb-4">
          <div className="px-3 text-[11px] font-semibold text-neutral-500 mb-2">
            عملي
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              className={`flex items-center justify-between px-4 py-2.5 rounded-full transition-all ${
                activeTab === "home"
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-neutral-400 hover:text-white hover:bg-[#15161A]"
              }`}
            >
              <span className="text-xs">الرئيسية</span>
              <Home className="w-4 h-4" />
            </Link>

            <Link
              href="/tasks"
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-[#15161A] transition-all group"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#EA580C] text-black font-bold text-[11px] flex items-center justify-center font-sans">
                  6
                </span>
                <span className="text-xs">المهام</span>
              </div>
              <CheckSquare className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </Link>

            <Link
              href="/summary"
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-[#15161A] transition-all group"
            >
              <span className="text-xs">ملخص العمل</span>
              <CheckCircle2 className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </Link>

            <Link
              href="/attendance"
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-[#15161A] transition-all group"
            >
              <span className="text-xs">الحضور</span>
              <Calendar className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </Link>
          </nav>
        </div>

        <div className="mb-4">
          <div className="px-3 text-[11px] font-semibold text-neutral-500 mb-2">
            حسابي
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/requests"
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-[#15161A] transition-all group"
            >
              <span className="text-xs">الطلبات</span>
              <Inbox className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </Link>

            <Link
              href="/balances"
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-[#15161A] transition-all group"
            >
              <span className="text-xs">الأرصدة</span>
              <CreditCard className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </Link>

            <Link
              href="/payroll"
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-[#15161A] transition-all group"
            >
              <span className="text-xs">المحفظه والراتب</span>
              <Wallet className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </Link>
          </nav>
        </div>

        <div className="mb-6">
          <div className="px-3 text-[11px] font-semibold text-neutral-500 mb-2">
            عام
          </div>
          <nav className="flex flex-col gap-1">
            <Link
              href="/profile"
              className="flex items-center justify-between px-4 py-2.5 rounded-full text-neutral-400 hover:text-white hover:bg-[#15161A] transition-all group"
            >
              <span className="text-xs">البروفايل</span>
              <User className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </Link>
          </nav>
        </div>
      </div>

      <DailyProgressCard completedCount={0} totalCount={0} percentage={0} />
    </aside>
  );
}
