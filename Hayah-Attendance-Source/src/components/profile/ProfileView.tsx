"use client";

import React, { useState, useEffect } from "react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { PersonalInfoCard } from "./PersonalInfoCard";
import { ProfileSettingsCard } from "./ProfileSettingsCard";
import { DEFAULT_USER, UserData } from "@/lib/userService";

interface ProfileViewProps {
  userName?: string;
  user?: UserData;
}

export function ProfileView({
  userName = DEFAULT_USER.firstName,
  user = DEFAULT_USER,
}: ProfileViewProps) {
  const [currentUser, setCurrentUser] = useState<UserData>(user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    async function loadLiveUserData() {
      try {
        const res = await fetch("/api/user?id=mo991999");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch (err) {
        console.warn("Could not load /api/user:", err);
      }
    }
    loadLiveUserData();
  }, []);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleItemClick = (id: string) => {
    if (id === "personal-info") {
      showToast("عرض البيانات الشخصية");
    } else if (id === "security") {
      showToast("قسم الأمان وكلمة المرور");
    } else if (id === "notifications") {
      showToast("إعدادات الإشعارات");
    } else if (id === "appearance") {
      showToast("إعدادات المظهر والعرض");
    } else if (id === "help") {
      showToast("مركز المساعدة والدعم");
    } else if (id === "logout") {
      showToast("تم تسجيل الخروج بنجاح");
    }
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
        {/* 1. Right Side in RTL: Sidebar (264px width) with activeTab="profile" */}
        <Sidebar activeTab="profile" userName={currentUser.firstName} />

        {/* 2. Left Side in RTL: Main Content Column (1088px width) */}
        <div className="w-[1088px] max-w-full flex flex-col gap-6" dir="rtl">
          {/* Top Header */}
          <TopNavbar
            userName={currentUser.greetingName}
            userEmail={currentUser.email}
            avatarLetter={currentUser.avatarLetter}
            onNewClick={() => setIsModalOpen(true)}
          />

          {/* Main Black Rounded Frame (Frame 2147228955: bg #000000, border-radius 34px, p-32px 24px) */}
          <main className="w-full bg-[#000000] rounded-[34px] p-6 lg:p-8 flex flex-col gap-6 border border-[#262626]/30">
            {/* Header: greet (Frame 2147228955 header: Title & Subtitle) */}
            <div className="text-right w-full">
              <h1 className="text-[24px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-tight">
                البروفايل
              </h1>
              <p className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-1">
                بياناتك الشخصية وإعدادات حسابك
              </p>
            </div>

            {/* Frame 2147228950: Content Row (Personal Info Card on Right + Settings Card on Left) */}
            <div className="w-full flex flex-col lg:flex-row items-start gap-6" dir="rtl">
              {/* Card 1: Personal Info Card (712px width) */}
              <PersonalInfoCard
                user={currentUser}
                onSave={() => showToast("تم حفظ التعديلات بنجاح")}
              />

              {/* Card 2: Settings Card (304px width) */}
              <ProfileSettingsCard
                user={currentUser}
                onItemClick={handleItemClick}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Add Task Modal */}
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
