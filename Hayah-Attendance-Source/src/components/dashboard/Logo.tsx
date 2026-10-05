import React from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="font-bold text-lg tracking-tight text-white select-none">
        Internal HD
      </span>
      <div className="relative w-7 h-7 flex items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M8 12C8 9.79086 9.79086 8 12 8H20C22.2091 8 24 9.79086 24 12V20C24 22.2091 22.2091 24 20 24H12C9.79086 24 8 22.2091 8 20V12Z"
            stroke="url(#gradient-hd)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 10V6C13 4.89543 13.8954 4 15 4H17C18.1046 4 19 4.89543 19 6V10"
            stroke="#EA580C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19 22V26C19 27.1046 18.1046 28 17 28H15C13.8954 28 13 27.1046 13 26V22"
            stroke="#F97316"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient-hd" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#FED7AA" />
              <stop offset="1" stopColor="#F97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
