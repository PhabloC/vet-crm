"use client";

import { StatCardProps } from "./types";

export default function StatCard({
  title,
  value,
  icon,
  trend,
  description,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-zinc-600">{title}</h3>
        {icon && <div className="text-zinc-400">{icon}</div>}
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-zinc-900">{value}</p>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      {description && (
        <p className="text-xs text-zinc-500 mt-2">{description}</p>
      )}
    </div>
  );
}
