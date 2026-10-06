"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpLeft, Megaphone } from "lucide-react";
import { UpdateItem, FALLBACK_UPDATES } from "@/lib/updatesService";

interface UpdatesCardProps {
  onDetailsClick?: () => void;
  updates?: UpdateItem[];
}

export function UpdatesCard({ onDetailsClick, updates: propUpdates }: UpdatesCardProps) {
  const [items, setItems] = useState<UpdateItem[]>((propUpdates || []).slice(0, 7));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(!propUpdates);

  // Fetch live decrypted updates from API if not passed via props
  useEffect(() => {
    if (propUpdates && propUpdates.length > 0) {
      setItems(propUpdates.slice(0, 7));
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    async function loadUpdates() {
      try {
        const res = await fetch("/api/updates");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.updates) && data.updates.length > 0) {
            setItems(data.updates.slice(0, 7));
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not load from /api/updates, using fallback", err);
      }
      if (isMounted) {
        setItems([...FALLBACK_UPDATES].reverse().slice(0, 7));
        setIsLoading(false);
      }
    }

    loadUpdates();
    return () => {
      isMounted = false;
    };
  }, [propUpdates]);

  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance carousel slide every 6 seconds if multiple items (paused on hover)
  useEffect(() => {
    if (items.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [items.length, isHovered]);

  const hasUpdates = items.length > 0;
  const currentItem = hasUpdates ? items[currentIndex] : null;

  return (
    <div
      className="bg-[#131313] border border-[#262626] rounded-[26px] p-5 flex flex-col justify-between h-[204px] shadow-sm select-none relative"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full h-[32px]">
        {/* Title on Right in RTL */}
        <h3 className="text-[16px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] tracking-tight">
          آخر التحديثات
        </h3>

        {/* Arrow Button on Left in RTL (32px x 32px rounded-full) */}
        <button
          type="button"
          onClick={onDetailsClick}
          aria-label="عرض التحديثات"
          className="w-8 h-8 rounded-full bg-[#F5F3EF] hover:bg-white text-[#141414] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm active:scale-95 hover:scale-105 group"
        >
          <ArrowUpLeft className="w-4 h-4 stroke-[2.5] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Content Area */}
      {!hasUpdates || isLoading ? (
        /* Empty / Loading State (matching Image 1) */
        <div className="border border-dashed border-[#262626] rounded-[22px] py-4 px-4 text-center flex flex-col items-center justify-center gap-1.5 flex-1 mt-3">
          <div className="w-11 h-11 rounded-full bg-[#1F1F1F] text-[#00B1FF] flex items-center justify-center shrink-0">
            <Megaphone className="w-5 h-5 text-[#00B1FF]" />
          </div>
          <h4 className="text-[15px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#F5F3EF]">
            لا توجد تحديثات بعد
          </h4>
          <p className="text-[12.5px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] leading-tight">
            أخبار الشركة وإنجازات الفريق ستظهر هنا أول بأول.
          </p>
        </div>
      ) : (
        /* Carousel Slide Card with subtle slide-fade animation */
        <div className="flex flex-col justify-between flex-1 mt-2.5">
          {/* Inner Card: bg #262626, rounded 22px */}
          <div
            key={currentIndex}
            onClick={onDetailsClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-[#262626] hover:bg-[#2C2C2C] active:scale-[0.99] rounded-[22px] p-3 flex items-center justify-between gap-3 cursor-pointer transition-all duration-200 group animate-update-fade"
          >
            {/* Right side in RTL: Image Thumbnail (if present) */}
            {currentItem?.image_url ? (
              <div className="w-[100px] h-[66px] rounded-[14px] overflow-hidden bg-gradient-to-br from-[#3A280C] to-[#F39708] shrink-0 relative order-1">
                <img
                  src={currentItem.image_url}
                  alt={currentItem.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            ) : null}

            {/* Left side in RTL: Text Block */}
            <div className="flex-1 flex flex-col justify-between h-full min-h-[66px] text-right order-2">
              <div className="flex flex-col gap-1">
                <h4 className="text-[14px] font-bold font-[family-name:var(--font-tajawal)] text-[#F5F3EF] line-clamp-1 leading-snug">
                  {currentItem?.title}
                </h4>
                <p className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] line-clamp-2 leading-relaxed">
                  {currentItem?.description}
                </p>
              </div>

              <span className="text-[11px] font-normal font-[family-name:var(--font-tajawal)] text-[#9A968E] mt-0.5">
                {currentItem?.publish_time}
              </span>
            </div>
          </div>

          {/* Dots Pagination Indicator with smooth width morphing */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`الشريحة ${idx + 1}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                    idx === currentIndex
                      ? "w-4 bg-[#F5F3EF]"
                      : "w-1.5 bg-[#3E3E3E] hover:bg-[#666666]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
