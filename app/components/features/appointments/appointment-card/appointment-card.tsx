"use client";

import { AppointmentCardProps } from "./types";

export default function AppointmentCard({
  petName,
  ownerName,
  time,
  type,
  status = "confirmed",
}: AppointmentCardProps) {
  const statusColors = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-zinc-100 text-zinc-700",
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-zinc-900">{petName}</h4>
          <p className="text-sm text-zinc-600">{ownerName}</p>
        </div>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[status]}`}
        >
          {status === "confirmed"
            ? "Confirmado"
            : status === "pending"
            ? "Pendente"
            : "Concluído"}
        </span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-xs text-zinc-500">{type}</p>
          <p className="text-sm font-medium text-zinc-900 mt-1">{time}</p>
        </div>
      </div>
    </div>
  );
}
