"use client";

import React, { useState, useEffect } from "react";
import { X, Megaphone } from "lucide-react";
import { UpdateItem } from "@/lib/updatesService";

interface UpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  updates?: UpdateItem[];
}

export function UpdatesModal({
  isOpen,
  onClose,
  updates = [],
}: UpdatesModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  // Manage enter and exit animation states
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      setShouldRender(true);
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 20);
    } else {
      setIsVisible(false);
      timer = setTimeout(() => {
        setShouldRender(false);
      }, 260);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (shouldRender) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldRender, isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop covering the black main container with smooth fade transition */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-250 ease-out ${
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Side Drawer panel:
          - Height: matches the black background container (inset-y-0 h-full)
          - Width: covers the 'آخر التحديثات' field (calc(100%-459px), min 613px)
          - Position: Left side of the black container (left-0)
          - Simple enter/exit animation: smooth slide in/out from left without exaggeration
      */}
      <aside
        className={`absolute inset-y-0 left-0 w-full lg:w-[calc(100%-459px)] lg:min-w-[613px] h-full bg-[#1F1F1F] border-r border-[#262626] rounded-l-[34px] rounded-r-[34px] flex flex-col shadow-2xl z-40 select-none overflow-hidden transition-transform duration-250 ease-out ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="w-full h-[68px] px-6 py-4 flex items-center justify-between border-b border-[#262626]/50 shrink-0">
          {/* Title on Right in RTL */}
          <h2 className="text-[20px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-[22px]">
            اخر التحديثات
          </h2>

          {/* Close Button on Left in RTL */}
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="w-[34px] h-[34px] rounded-full bg-[#262626] hover:bg-[#333333] border border-[#333333] text-[#F5F3EF] flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Scrollable Updates List */}
        <div className="w-full flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-[14px] scrollbar-thin scrollbar-thumb-[#333333] scrollbar-track-transparent">
          {updates.length === 0 ? (
            /* Empty State */
            <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-[#262626] rounded-[26px]">
              <div className="w-12 h-12 rounded-full bg-[#262626] flex items-center justify-center mb-3">
                <Megaphone className="w-6 h-6 text-[#F39708]" />
              </div>
              <h3 className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
                لا توجد تحديثات حالياً
              </h3>
              <p className="text-[13px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-1 max-w-[280px]">
                أخبار الشركة وإنجازات الفريق ستظهر هنا أول بأول.
              </p>
            </div>
          ) : (
            updates.map((item) => (
              <article
                key={item.id}
                className="w-full bg-[#262626] hover:bg-[#2C2C2C] rounded-[26px] p-[14px] flex flex-col gap-[14px] transition-colors group cursor-pointer"
              >
                {/* Thumbnail if image_url exists */}
                {item.image_url ? (
                  <div className="w-full h-[239px] rounded-[22px] overflow-hidden bg-gradient-to-br from-[#3A280C] to-[#F39708] relative shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                ) : null}

                {/* Text Block */}
                <div className="w-full flex flex-col justify-center gap-3">
                  <div className="w-full flex flex-col gap-2">
                    {/* Title */}
                    <h3 className="text-[16px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] leading-snug text-right">
                      {item.title}
                    </h3>
                    {/* Description */}
                    <p className="text-[14px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] leading-relaxed text-right">
                      {item.description}
                    </p>
                  </div>

                  {/* Publish Time */}
                  <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] text-right">
                    {item.publish_time}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
