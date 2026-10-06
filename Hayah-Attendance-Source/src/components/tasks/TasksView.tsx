"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";
import { TopNavbar } from "../dashboard/TopNavbar";
import { Sidebar } from "../dashboard/Sidebar";
import { AddTaskModal } from "../dashboard/AddTaskModal";
import { TasksListContainer, TasksTab } from "./TasksListContainer";
import { TaskDetailsPlaceholder } from "./TaskDetailsPlaceholder";
import { DEFAULT_USER } from "@/lib/userService";
import { getTodayDateString } from "@/lib/dateUtils";
import { RequestTask, FALLBACK_TASKS } from "@/lib/tasksService";

interface TasksViewProps {
  currentDate?: string;
  userName?: string;
  initialTab?: TasksTab;
}

export function TasksView({
  currentDate = getTodayDateString(),
  userName = DEFAULT_USER.firstName,
  initialTab,
}: TasksViewProps) {
  const searchParams = useSearchParams();
  const queryTab = searchParams ? searchParams.get("tab") : null;

  const [activeTab, setActiveTab] = useState<TasksTab>(() => {
    if (queryTab === "review") return "review";
    if (queryTab === "sent") return "sent";
    if (queryTab === "today") return "today";
    return initialTab || "today";
  });

  const [todayTasks, setTodayTasks] = useState<RequestTask[]>([]);
  const [reviewTasks, setReviewTasks] = useState<RequestTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<RequestTask | null>(null);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        setIsLoadingTasks(true);
        const [tasksRes, reviewsRes] = await Promise.all([
          fetch(`/api/tasks?send_to=${DEFAULT_USER.id}`),
          fetch(`/api/reviews?send_to=${DEFAULT_USER.id}`),
        ]);

        let loadedToday: RequestTask[] = [];
        let loadedReview: RequestTask[] = [];

        if (tasksRes.ok) {
          const data = await tasksRes.json();
          if (data.success && Array.isArray(data.tasks)) {
            loadedToday = [...data.tasks].reverse();
            setTodayTasks(loadedToday);
          }
        }

        if (reviewsRes.ok) {
          const data = await reviewsRes.json();
          if (data.success && Array.isArray(data.reviews)) {
            loadedReview = [...data.reviews].reverse();
            setReviewTasks(loadedReview);
          }
        }

        const initialList = activeTab === "review" ? loadedReview : loadedToday;
        if (initialList.length > 0) {
          setSelectedTask(initialList[0]);
        }
      } catch (err) {
        console.warn("Could not load tasks/reviews:", err);
      } finally {
        setIsLoadingTasks(false);
      }
    }

    loadAll();
  }, []);

  const currentTasks = activeTab === "review" ? reviewTasks : todayTasks;

  useEffect(() => {
    if (currentTasks.length > 0) {
      setSelectedTask(currentTasks[0]);
    } else {
      setSelectedTask(null);
    }
  }, [activeTab]);

  useEffect(() => {
    if (queryTab === "review") {
      setActiveTab("review");
    } else if (queryTab === "sent") {
      setActiveTab("sent");
    } else if (queryTab === "today") {
      setActiveTab("today");
    }
  }, [queryTab]);

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
        <Sidebar
          activeTab="tasks"
          userName={userName}
          totalTasksCount={isLoadingTasks ? undefined : todayTasks.length + reviewTasks.length}
        />

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
                tasks={currentTasks}
                todayCount={todayTasks.length}
                reviewCount={reviewTasks.length}
                selectedTaskCode={selectedTask?.code}
                onSelectTask={setSelectedTask}
                isLoading={isLoadingTasks}
              />

              {/* 2. Left in RTL: Task Details Placeholder (320px width) */}
              <TaskDetailsPlaceholder selectedTask={selectedTask} />

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
