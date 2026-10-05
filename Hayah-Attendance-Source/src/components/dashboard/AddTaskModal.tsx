"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask?: (task: { title: string; category: string; priority: string }) => void;
}

export function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("عملي");
  const [priority, setPriority] = useState("متوسطة");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (onAddTask) {
      onAddTask({ title, category, priority });
    }
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#141519] border border-[#23252C] rounded-[28px] p-6 text-white shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#21232B]">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#89E043]" />
            إضافة مهمة جديدة
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="w-8 h-8 rounded-full bg-[#1F2128] text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1.5">
              عنوان المهمة
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: مراجعة تصاميم الواجهات وتحديث الملفات..."
              className="w-full bg-[#181A20] border border-[#2A2D37] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#89E043] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                القسم
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#181A20] border border-[#2A2D37] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#89E043] transition-all"
              >
                <option value="عملي">عملي</option>
                <option value="طلبات">طلبات</option>
                <option value="مراجعات">مراجعات</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                الأولوية
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-[#181A20] border border-[#2A2D37] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#89E043] transition-all"
              >
                <option value="عالية">عالية</option>
                <option value="متوسطة">متوسطة</option>
                <option value="منخفضة">منخفضة</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-medium text-neutral-400 hover:text-white bg-[#1C1E26] hover:bg-[#252833] transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#89E043] hover:bg-[#78CC38] text-neutral-950 font-bold text-xs px-5 py-2 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
            >
              حفظ المهمة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
