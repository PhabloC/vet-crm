"use client";

import { QuickActionProps } from "./types";

export default function QuickAction({
  title,
  description,
  icon,
  onClick,
  color = "blue",
}: QuickActionProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    green: "bg-green-50 border-green-200 text-green-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
    orange: "bg-orange-50 border-orange-200 text-orange-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} cursor-pointer border rounded-lg p-4 text-left hover:shadow-md transition-all hover:scale-[1.02] w-full`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          <p className="text-xs opacity-80">{description}</p>
        </div>
      </div>
    </button>
  );
}
