"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { TasksListContainer } from "./TasksListContainer";
import { TaskDetailsPlaceholder } from "./TaskDetailsPlaceholder";

interface TasksViewProps {
  currentDate?: string;
  userName?: string;
}

export function TasksView({
  currentDate = "الأحد، 27 سبتمبر",
  userName = "سلمى",
}: TasksViewProps) {
  const [activeTab, setActiveTab] = useState<"today" | "sent">("today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div
      className="min-h-screen bg-[#141414] text-[#F5F3EF] flex justify-center py-8 px-6 antialiased selection:bg-[#8FCB4E] selection:text-[#141414]"
      dir="rtl"
    >
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#1F1F1F] border border-[#8FCB4E]/60 text-[#F5F3EF] text-[13px] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#8FCB4E]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Frame 2147228932: 1376px container with 24px gap */}
      <div
        className="w-full max-w-[1376px] flex flex-col lg:flex-row items-start justify-start gap-6"
        dir="rtl"
      >
        {/* 1. Right Side in RTL: Sidebar (264px width) with activeTab="tasks" */}
        <Sidebar activeTab="tasks" userName={userName} />

        {/* 2. Left Side in RTL: Main Content Column (1088px width) */}
        <div className="w-[1088px] max-w-full flex flex-col gap-6" dir="rtl">
          
          {/* Top Header */}
          <TopNavbar
            userName="أهلاً، سلمى"
            userEmail="salmaghd-studio.c"
            onNewClick={() => setIsModalOpen(true)}
          />

          {/* Main Black Rounded Frame (Frame 2147228918: bg #000000, border-radius 34px, p-32px 24px) */}
          <main
            className="w-full bg-[#000000] rounded-[34px] p-6 lg:p-8 flex flex-col gap-6 shadow-2xl border border-[#262626]/40"
            dir="rtl"
          >
            {/* Header Row (Frame 2147228884: 55px height) */}
            <div className="flex items-center justify-between w-full">
              {/* Right Side in RTL: Page Title & Subtitle */}
              <div className="text-right">
                <h1 className="text-[26px] font-extrabold text-[#F5F3EF] leading-tight">
                  مهامي اليوم
                </h1>
                <p className="text-[13px] text-[#9A968E] mt-1 font-normal">
                  مهامك لليوم قيد التنفيذ والإنجاز
                </p>
              </div>

              {/* Left Side in RTL: Date Picker Pill Button (152px x 40px) */}
              <button
                type="button"
                className="h-[40px] px-4 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-full flex items-center gap-2 text-[14px] font-medium text-[#F5F3EF] transition-all cursor-pointer select-none"
              >
                <Calendar className="w-5 h-5 text-[#F5F3EF]" />
                <span>{currentDate}</span>
              </button>
            </div>

            {/* Frame 2147228917: Tasks Body Row (gap 20px) */}
            <div className="flex flex-col lg:flex-row items-start gap-5 w-full" dir="rtl">
              
              {/* 1. Right in RTL: Tasks List Container (700px width) */}
              <TasksListContainer
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onAddTask={() => setIsModalOpen(true)}
              />

              {/* 2. Left in RTL: Task Details Placeholder (320px width) */}
              <TaskDetailsPlaceholder />

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
