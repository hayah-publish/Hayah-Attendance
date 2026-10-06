"use client";

import React, { useState } from "react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { MonthsSelector } from "./MonthsSelector";
import { SalaryBreakdownCard } from "./SalaryBreakdownCard";
import { WalletBalanceCard } from "./WalletBalanceCard";
import { BankDetailsCard } from "./BankDetailsCard";
import { DEFAULT_USER } from "@/lib/userService";

interface PayrollViewProps {
  userName?: string;
}

export function PayrollView({ userName = DEFAULT_USER.firstName }: PayrollViewProps) {
  const [selectedMonth, setSelectedMonth] = useState(9); // Default to September (سبتمبر) matching design
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRequestLoan = () => {
    showToast("تم إرسال طلب السلفة إلى الإدارة المالية بنجاح");
  };

  return (
    <div
      className="min-h-screen bg-[#141414] text-[#F5F3EF] flex justify-center py-8 px-6 antialiased selection:bg-[#8FCB4E] selection:text-[#141414]"
      dir="rtl"
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1F1F1F] border border-[#F39708]/60 text-[#F5F3EF] text-[13px] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#F39708]" />
          <span className="font-[family-name:var(--font-tajawal)]">{notification}</span>
        </div>
      )}

      {/* Frame 2147228935: 1376px container with 24px gap between Sidebar and Content */}
      <div
        className="w-full max-w-[1376px] flex flex-col lg:flex-row items-start justify-start gap-6"
        dir="rtl"
      >
        {/* 1. Right Side in RTL: Sidebar (264px width) with activeTab="payroll" */}
        <Sidebar activeTab="payroll" userName={userName} />

        {/* 2. Left Side in RTL: Main Content Column (1088px width) */}
        <div className="w-[1088px] max-w-full flex flex-col gap-6" dir="rtl">
          
          {/* Top Header */}
          <TopNavbar
            userName={userName === DEFAULT_USER.firstName ? DEFAULT_USER.greetingName : `أهلاً، ${userName}`}
            userEmail={DEFAULT_USER.email}
            avatarLetter={DEFAULT_USER.avatarLetter}
            onNewClick={() => setIsModalOpen(true)}
          />

          {/* Main Black Rounded Frame (Frame 2147228918: bg #000000, border-radius 34px, p-32px 24px) */}
          <main className="w-full bg-[#000000] rounded-[34px] p-6 lg:p-8 flex flex-col gap-6 border border-[#262626]/30">
            
            {/* Header: greet (Frame 2147228918 header: Title & Subtitle) */}
            <div className="text-right w-full">
              <h1 className="text-[26px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-tight">
                المحفظة والراتب
              </h1>
              <p className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-1">
                كل ما يخصك
              </p>
            </div>

            {/* Months Selector Row (Frame 2147228918 Order 1: 12 months + 2026 pill) */}
            <MonthsSelector
              selectedMonth={selectedMonth}
              onSelectMonth={(m) => {
                setSelectedMonth(m);
                showToast(`تم عرض مستحقات شهر ${m}`);
              }}
              year="2026"
            />

            {/* Main Cards Row (Frame 2147228950: 1040px width x 454px height, gap 24px) */}
            <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full" dir="rtl">
              
              {/* Right Column in RTL: Salary Breakdown Card (522px x 454px) */}
              <div className="w-full lg:w-[522px] flex flex-col">
                <SalaryBreakdownCard />
              </div>

              {/* Left Column in RTL: Frame 2147228949 (Wallet Card + Bank Info + Loan Button) */}
              <div className="w-full lg:w-[494px] flex flex-col justify-between gap-4">
                {/* 1. Wallet Card (141px height) */}
                <WalletBalanceCard />

                {/* 2. Bank Details Card (232px height) + Loan Button (46px height) */}
                <BankDetailsCard onRequestLoan={handleRequestLoan} />
              </div>

            </div>

          </main>

        </div>

      </div>

      {/* Task Creation Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={(task) => {
          showToast(`تمت إضافة المهمة: "${task.title}" بنجاح`);
        }}
      />
    </div>
  );
}
