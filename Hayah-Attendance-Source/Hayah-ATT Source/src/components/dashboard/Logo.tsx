import React from "react";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon using provided logo.png */}
      <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
        <Image
          src="/logo.png"
          alt="Hayah-Attendance Logo"
          width={28}
          height={28}
          priority
          className="w-full h-full object-contain"
        />
      </div>

      {/* Brand Title */}
      <span className="font-bold text-base tracking-tight text-white select-none whitespace-nowrap">
        Hayah-Attendance
      </span>
    </div>
  );
}
