"use client";

import React, { useState } from "react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { RequestFormCard, RequestFormData } from "./RequestFormCard";
import { RequestsListCard, RequestItem } from "./RequestsListCard";
import { DEFAULT_USER } from "@/lib/userService";

interface RequestsViewProps {
  userName?: string;
}

export function RequestsView({
  userName = DEFAULT_USER.firstName,
}: RequestsViewProps) {
  // Empty status by default as requested by user
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [availableBalance, setAvailableBalance] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRequestSubmit = (data: RequestFormData) => {
    const newRequest: RequestItem = {
      ...data,
      id: Date.now().toString(),
      submittedAt: "اليوم، 09:30 ص",
      status: "pending",
      statusLabel: "قيد المراجعة",
    };

    setRequests((prev) => [newRequest, ...prev]);
    setAvailableBalance((prev) => Math.max(0, prev - data.days));
    showToast(`تم إرسال طلب "${data.type}" بنجاح وجارٍ مراجعته`);
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

      {/* Frame 2147228935: 1376px container with 24px gap */}
      <div
        className="w-full max-w-[1376px] flex flex-col lg:flex-row items-start justify-start gap-6"
        dir="rtl"
      >
        {/* 1. Right Side in RTL: Sidebar (264px width) with activeTab="requests" */}
        <Sidebar activeTab="requests" userName={userName} />

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
                الطلبات
              </h1>
              <p className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-1">
                تقديم ومتابعة الإجازات والطلبات
              </p>
            </div>

            {/* Row: Content row (1040px width x 660px height, gap 18px) */}
            <div className="flex flex-col lg:flex-row items-start gap-[18px] w-full" dir="rtl">
              {/* Right Column in RTL: Request Submission Form Card (507px width) */}
              <RequestFormCard
                onSubmitRequest={handleRequestSubmit}
                availableBalance={availableBalance}
              />

              {/* Left Column in RTL: My Requests List Card (515px width) */}
              <RequestsListCard requests={requests} />
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
