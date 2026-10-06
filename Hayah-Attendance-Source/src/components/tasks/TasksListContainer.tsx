"use client";

import React from "react";
import { Plus, ArrowUpDown, LayoutGrid, List, Search, Sparkles, Send, Clock, User } from "lucide-react";
import { getTodayDateString } from "@/lib/dateUtils";
import { RequestTask } from "@/lib/tasksService";

export type TasksTab = "today" | "review" | "sent";

interface TasksListContainerProps {
  activeTab: TasksTab;
  onTabChange: (tab: TasksTab) => void;
  onAddTask: () => void;
  tasks?: RequestTask[];
  selectedTaskCode?: string;
  onSelectTask?: (task: RequestTask) => void;
  isLoading?: boolean;
  todayCount?: number;
  reviewCount?: number;
}

export function TasksListContainer({
  activeTab,
  onTabChange,
  onAddTask,
  tasks = [],
  selectedTaskCode,
  onSelectTask,
  isLoading = false,
  todayCount,
  reviewCount,
}: TasksListContainerProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list");

  const filteredTasks = React.useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const q = searchQuery.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title?.toLowerCase().includes(q) ||
        t.info?.toLowerCase().includes(q) ||
        t.code?.toLowerCase().includes(q) ||
        t.sent_from?.toLowerCase().includes(q)
    );
  }, [tasks, searchQuery]);

  const completedCount = React.useMemo(() => {
    return tasks.filter(
      (t) => t.status === "completed" || t.status === "مكتملة"
    ).length;
  }, [tasks]);

  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="w-full lg:w-[700px] h-full min-h-[477px] bg-[#131313] rounded-[34px] p-5 flex flex-col gap-5 border border-[#262626]/40 select-none" dir="rtl">
      
      {/* Row 1: Header with Tabs (مهامي اليوم & تحتاج مراجعة & مهام أرسلتها) and + اضافه مهمه */}
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Right in RTL: Tabs (مهامي اليوم & تحتاج مراجعة & مهام أرسلتها) */}
        <div className="flex items-center gap-1 bg-[#1F1F1F] rounded-[21px] p-1 h-[42px] border border-[#262626]/30">
          {/* Tab 1: مهامي اليوم */}
          <button
            type="button"
            onClick={() => onTabChange("today")}
            className={`flex items-center gap-1.5 px-3.5 h-[34px] rounded-[17px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "today"
                ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                : "text-[#9A968E] hover:text-[#F5F3EF]"
            }`}
          >
            <span>مهامي اليوم</span>
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-semibold font-[family-name:var(--font-poppins)] flex items-center justify-center transition-colors ${
                activeTab === "today"
                  ? "bg-[#141414] text-[#F5F3EF]"
                  : "bg-[#141414] text-[#9A968E]"
              }`}
            >
              {todayCount !== undefined ? todayCount : (activeTab === "today" ? tasks.length : 0)}
            </span>
          </button>

          {/* Tab 2: تحتاج مراجعة */}
          <button
            type="button"
            onClick={() => onTabChange("review")}
            className={`flex items-center gap-1.5 px-3.5 h-[34px] rounded-[17px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "review"
                ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                : "text-[#9A968E] hover:text-[#F5F3EF]"
            }`}
          >
            <span>تحتاج مراجعة</span>
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-semibold font-[family-name:var(--font-poppins)] flex items-center justify-center transition-colors ${
                activeTab === "review"
                  ? "bg-[#141414] text-[#F5F3EF]"
                  : "bg-[#141414] text-[#9A968E]"
              }`}
            >
              {reviewCount !== undefined ? reviewCount : (activeTab === "review" ? tasks.length : 0)}
            </span>
          </button>

          {/* Tab 3: مهام أرسلتها */}
          <button
            type="button"
            onClick={() => onTabChange("sent")}
            className={`flex items-center gap-1.5 px-3.5 h-[34px] rounded-[17px] text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "sent"
                ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                : "text-[#9A968E] hover:text-[#F5F3EF]"
            }`}
          >
            <span>مهام أرسلتها</span>
            <span
              className={`w-5 h-5 rounded-full text-[11px] font-semibold font-[family-name:var(--font-poppins)] flex items-center justify-center transition-colors ${
                activeTab === "sent"
                  ? "bg-[#141414] text-[#F5F3EF]"
                  : "bg-[#141414] text-[#9A968E]"
              }`}
            >
              0
            </span>
          </button>
        </div>

        {/* Left in RTL: Button depending on activeTab */}
        {activeTab === "sent" ? (
          <button
            type="button"
            onClick={onAddTask}
            className="min-w-[132px] h-[37px] bg-[#F5F3EF] hover:bg-white active:scale-95 text-[#141414] font-extrabold text-[14px] rounded-[100px] flex items-center justify-center gap-[6px] px-4 transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span className="font-[family-name:var(--font-tajawal)] font-extrabold text-[14px] leading-[17px] text-[#141414]">
              ارسال مهمة
            </span>
            <Send className="w-[14px] h-[14px] text-[#141414] stroke-[1.5] -scale-x-100" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onAddTask}
            className="bg-[#8FCB4E] hover:bg-[#81BC43] active:scale-95 text-[#122006] font-extrabold text-[14px] h-[37px] px-4 rounded-full flex items-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>اضافه مهمه</span>
          </button>
        )}
      </div>

      {/* Row 2: Search and View/Sort Controls */}
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Search Input */}
        <div className="flex-1 max-w-[455px] h-[42px] bg-[#1F1F1F] rounded-[21px] px-4 flex items-center gap-2 border border-[#262626]/30">
          <Search className="w-4 h-4 text-[#9A968E] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في المهام..."
            className="w-full bg-transparent text-[#F5F3EF] placeholder:text-[#9A968E] text-[14px] font-[family-name:var(--font-tajawal)] focus:outline-none"
          />
        </div>

        {/* Sort Button & View Mode Seg */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="h-[40px] px-3.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded-full flex items-center gap-1.5 text-[14px] font-medium text-[#F5F3EF] transition-all cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4 text-[#F5F3EF]" />
            <span>ترتيب</span>
          </button>

          <div className="flex items-center gap-0.5 bg-[#1F1F1F] rounded-[21px] p-1 h-[42px] border border-[#262626]/30">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`w-[36px] h-[34px] rounded-[17px] flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF]"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`w-[36px] h-[34px] rounded-[17px] flex items-center justify-center transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#F2F2F2] text-[#141414] shadow-sm"
                  : "text-[#9A968E] hover:text-[#F5F3EF]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Summary Banner */}
      <div className="w-full h-[94px] bg-[#F2F2F2] rounded-[26px] p-4 flex items-center justify-between text-[#171717] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-[18px] bg-[#F39708] flex items-center justify-center text-[#141414] shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 stroke-[2]" />
          </div>
          <div className="text-right">
            <div className="text-[16px] font-bold text-[#171717] leading-tight font-[family-name:var(--font-tajawal)]">
              {activeTab === "today"
                ? "مهام اليوم"
                : activeTab === "review"
                ? "مهام تحتاج مراجعة"
                : "مهام أرسلتها"}
            </div>
            <div className="text-[12px] font-normal text-[#9A968E] mt-0.5 leading-tight font-[family-name:var(--font-tajawal)]">
              {activeTab === "today"
                ? `${tasks.length} مهام`
                : activeTab === "review"
                ? `${tasks.length} مهام تحتاج مراجعة`
                : "0 مهام مرسلة"}
            </div>
          </div>
        </div>

        <div className="w-[62px] h-[62px] rounded-full border-[7px] border-[#E6E6E6] flex items-center justify-center shrink-0">
          <span className="text-[14px] font-extrabold text-[#171717] font-mono">
            {progressPercent}٪
          </span>
        </div>
      </div>

      {/* Row 4: Board content */}
      <div className="flex flex-col gap-3.5 w-full flex-1">
        <div className="flex justify-start pr-1">
          <span className="text-[12px] font-normal text-[#A8A29E] leading-[14px] select-none font-[family-name:var(--font-tajawal)]">
            {activeTab === "today"
              ? `${getTodayDateString()} - ${tasks.length} مهام`
              : activeTab === "review"
              ? `${getTodayDateString()} - ${tasks.length} مهام تحتاج مراجعة`
              : `${getTodayDateString()} - 0 مهام مرسلة`}
          </span>
        </div>

        {(activeTab === "today" || activeTab === "review") && filteredTasks.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pl-1 scrollbar-thin"
                : "flex flex-col gap-3 max-h-[380px] overflow-y-auto pl-1 scrollbar-thin"
            }
          >
            {filteredTasks.map((task) => {
              const isSelected = selectedTaskCode === task.code;
              const isHigh = task.priority === "high" || task.priority === "عالية";
              const isLow = task.priority === "low" || task.priority === "منخفضة";
              const isInProgress =
                task.status === "In progress" || task.status === "قيد التنفيذ";

              return (
                <div
                  key={task.code}
                  onClick={() => onSelectTask?.(task)}
                  className={`bg-[#1A1A1A] rounded-[20px] p-4 flex flex-col gap-2.5 transition-all cursor-pointer text-right border ${
                    isSelected
                      ? "border-[#8FCB4E] shadow-sm bg-[#222222]"
                      : "border-[#2A2A2A] hover:border-[#3D3D3D] hover:bg-[#1E1E1E]"
                  }`}
                >
                  {/* Top Bar: Code, Priority, Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#262626] text-[#F5F3EF] text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                        {task.code}
                      </span>
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full font-[family-name:var(--font-tajawal)] ${
                          isHigh
                            ? "bg-[#DC2626]/20 text-[#EF4444]"
                            : isLow
                            ? "bg-[#16A34A]/20 text-[#8FCB4E]"
                            : "bg-[#D97706]/20 text-[#F59E0B]"
                        }`}
                      >
                        {isHigh ? "أولوية عالية" : isLow ? "أولوية منخفضة" : "أولوية متوسطة"}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full font-[family-name:var(--font-tajawal)] ${
                        isInProgress
                          ? "bg-[#F39708]/20 text-[#F39708]"
                          : "bg-[#262626] text-[#9A968E]"
                      }`}
                    >
                      {isInProgress ? "قيد التنفيذ" : "لم تبدأ"}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-[14.5px] font-extrabold text-[#F5F3EF] font-[family-name:var(--font-tajawal)] leading-snug line-clamp-1">
                    {task.title}
                  </h4>

                  {/* Info / Description */}
                  <p className="text-[12px] text-[#A8A29E] font-[family-name:var(--font-tajawal)] leading-relaxed line-clamp-2">
                    {task.info}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#262626] text-[11.5px] text-[#737373] font-[family-name:var(--font-tajawal)]">
                    <span className="flex items-center gap-1 text-[#9A968E]">
                      <User className="w-3 h-3" />
                      <span>
                        من: <span className="text-[#F5F3EF] font-medium font-sans">
                          {task.sender_name || task.sent_from}
                          {task.sender_job ? ` (${task.sender_job})` : ""}
                        </span>
                      </span>
                    </span>
                    <span className="flex items-center gap-1 text-[#9A968E]">
                      <Clock className="w-3 h-3" />
                      <span dir="ltr">{task.publish_time}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full h-[171px] border border-dashed border-[#262626] rounded-[22px] py-7 px-4.5 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-[56px] h-[56px] rounded-full bg-[#1F1F1F] flex items-center justify-center text-[#F5F3EF] mb-0.5 shrink-0">
              <Sparkles className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h4 className="text-[15px] font-extrabold text-[#F5F3EF] font-[family-name:var(--font-tajawal)]">
              {isLoading
                ? "جارٍ تحميل المهام..."
                : activeTab === "today"
                ? "لا توجد مهام اليوم"
                : activeTab === "review"
                ? "لا توجد مهام تحتاج مراجعة"
                : "لا توجد مهام مرسلة"}
            </h4>
            <p className="text-[12.5px] text-[#9A968E] leading-tight max-w-[280px] font-[family-name:var(--font-tajawal)]">
              {isLoading
                ? "يتم جلب المهام المرتبطة بحسابك الآن..."
                : activeTab === "today"
                ? "أضف مهامك الجديدة لتظهر في قائمتك اليومية ومتابعة إنجازها."
                : activeTab === "review"
                ? "المهام التي تحتاج إلى مراجعتك واعتمادها ستظهر هنا."
                : "لم تقم بإرسال أي مهام حتى الآن. يمكنك إنشاء مهمة جديدة وإرسالها لفريقك."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
