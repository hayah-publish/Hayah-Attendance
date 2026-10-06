"use client";

import React from "react";
import { Wallet } from "lucide-react";

interface WalletBalanceCardProps {
  balance?: number;
  currency?: string;
}

export function WalletBalanceCard({
  balance = 10450,
  currency = "ج.م",
}: WalletBalanceCardProps) {
  return (
    <div
      className="w-full lg:w-[494px] h-[141px] bg-[#F39708] border border-[#262626]/20 rounded-[34px] relative overflow-hidden select-none shadow-md flex items-center justify-between px-7 lg:px-8"
      dir="rtl"
    >
      {/* Decorative Background Elements (matching Ellipse 5 & 6 in Figma) */}
      <div className="absolute -top-10 -right-8 w-[120px] h-[120px] rounded-full bg-[#141414]/10 pointer-events-none" />
      <div className="absolute -bottom-10 left-12 w-[110px] h-[105px] rounded-full bg-[#141414]/10 pointer-events-none" />

      {/* Right Content in RTL: Text Block */}
      <div className="flex flex-col items-start gap-1 z-10 text-right">
        <span className="text-[13px] font-extrabold font-[family-name:var(--font-tajawal)] text-[#141414]">
          رصيد المحفظة
        </span>
        <div className="flex items-baseline gap-1 text-[#141414]">
          <span className="text-[34px] font-extrabold font-[family-name:var(--font-tajawal)] leading-tight tracking-tight">
            {balance.toLocaleString()}
          </span>
          <span className="text-[16px] font-bold font-[family-name:var(--font-tajawal)]">
            {currency}
          </span>
        </div>
        <span className="text-[12px] font-normal font-[family-name:var(--font-tajawal)] text-[#141414]/90">
          متاح للسحب والتحويل إلى حسابك البنكي
        </span>
      </div>

      {/* Left Content in RTL: Big Wallet Icon (62px) */}
      <div className="z-10 flex items-center justify-center shrink-0">
        <Wallet className="w-[58px] h-[58px] text-[#141414] stroke-[1.8]" />
      </div>
    </div>
  );
}
