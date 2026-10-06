"use client";

import React, { useState } from "react";
import { User, Check } from "lucide-react";
import { DEFAULT_USER, UserData } from "@/lib/userService";

interface PersonalInfoCardProps {
  user?: UserData;
  onSave?: (updated: UserData) => void;
}

export function PersonalInfoCard({
  user = DEFAULT_USER,
  onSave,
}: PersonalInfoCardProps) {
  const [formData, setFormData] = useState<UserData>(user);
  const [isSaved, setIsSaved] = useState(false);

  React.useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div
      className="w-full lg:w-[712px] min-h-[478px] bg-[#131313] border border-[#262626] rounded-[34px] p-5 lg:p-6 flex flex-col justify-between gap-4 select-none shadow-sm"
      dir="rtl"
    >
      {/* 1. Card Head (Header) */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center text-[#F39708] shrink-0">
            <User className="w-5 h-5 text-[#F39708] stroke-[2.2]" />
          </div>
          <h2 className="text-[20px] font-extrabold text-[#F5F3EF] font-[family-name:var(--font-tajawal)] leading-tight">
            البيانات الشخصية
          </h2>
        </div>

        {isSaved && (
          <div className="flex items-center gap-1.5 text-[#8FCB4E] text-[13px] font-bold font-[family-name:var(--font-tajawal)] animate-in fade-in">
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>تم الحفظ</span>
          </div>
        )}
      </div>

      {/* 2. Grid of 5 Rows (ro-grid) */}
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: الاسم الأول & اسم العائلة */}
        <div className="flex flex-col sm:flex-row items-start gap-3.5 w-full">
          {/* ro: الاسم الأول */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              الاسم الأول
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>

          {/* ro: اسم العائلة */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              اسم العائلة
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Row 2: البريد الإلكتروني & رقم الهاتف */}
        <div className="flex flex-col sm:flex-row items-start gap-3.5 w-full">
          {/* ro: البريد الإلكتروني */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              البريد الإلكتروني
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none font-sans"
                dir="ltr"
              />
            </div>
          </div>

          {/* ro: رقم الهاتف */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              رقم الهاتف
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none font-sans"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Row 3: المسمى الوظيفي & القسم */}
        <div className="flex flex-col sm:flex-row items-start gap-3.5 w-full">
          {/* ro: المسمى الوظيفي */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              المسمى الوظيفي
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.job}
                onChange={(e) => handleChange("job", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>

          {/* ro: القسم */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              القسم
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.section}
                onChange={(e) => handleChange("section", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Row 4: المدينة & العمر */}
        <div className="flex flex-col sm:flex-row items-start gap-3.5 w-full">
          {/* ro: المدينة */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              المدينة
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>

          {/* ro: العمر */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              العمر
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Row 5: الحالة الاجتماعية & نظام العمل */}
        <div className="flex flex-col sm:flex-row items-start gap-3.5 w-full">
          {/* ro: الحالة الاجتماعية */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              الحالة الاجتماعية
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.maritalStatus}
                onChange={(e) => handleChange("maritalStatus", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>

          {/* ro: نظام العمل */}
          <div className="flex flex-col gap-1.5 flex-1 w-full items-center">
            <span className="text-[12px] font-normal text-[#A8A29E] font-[family-name:var(--font-tajawal)] text-center">
              نظام العمل
            </span>
            <div className="w-full h-[48px] px-4 py-3 bg-[#161616]/70 border border-[#262626] rounded-[22px] flex items-center justify-center text-[#F5F3EF] text-[14px] font-[family-name:var(--font-tajawal)] focus-within:border-[#F39708]/60 transition-colors">
              <input
                type="text"
                value={formData.workSystem}
                onChange={(e) => handleChange("workSystem", e.target.value)}
                className="w-full bg-transparent text-[#F5F3EF] text-center focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
