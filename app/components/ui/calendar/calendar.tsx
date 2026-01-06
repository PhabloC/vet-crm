"use client";

import { useState } from "react";
import { CalendarIcon } from "../../svg";

// Interface para agendamento (duplicada para evitar dependência circular)
interface Agendamento {
  id: string;
  petName: string;
  ownerName: string;
  data: string;
  hora: string;
  tipo: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  observacoes?: string;
  telefone: string;
}

interface CalendarProps {
  agendamentos: Agendamento[];
  onDateClick?: (date: string) => void;
  selectedDate?: string;
}

export default function Calendar({
  agendamentos,
  onDateClick,
  selectedDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Primeiro dia do mês
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Nomes dos dias da semana
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Navegar para mês anterior
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  // Navegar para próximo mês
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Converter data DD/MM/YYYY para objeto Date
  const parseDate = (dateStr: string): Date | null => {
    const [day, month, year] = dateStr.split("/");
    if (day && month && year) {
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return null;
  };

  // Verificar se uma data tem agendamentos
  const getAgendamentosForDate = (day: number): Agendamento[] => {
    const dateStr = `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}`;
    return agendamentos.filter((ag) => ag.data === dateStr);
  };

  // Verificar se é hoje
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Verificar se é a data selecionada
  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const dateStr = `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}`;
    return dateStr === selectedDate;
  };

  // Gerar array de dias do mês
  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          aria-label="Mês anterior"
        >
          <svg
            className="w-5 h-5 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-zinc-900">
            {monthNames[month]} {year}
          </h2>
        </div>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
          aria-label="Próximo mês"
        >
          <svg
            className="w-5 h-5 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Grid do Calendário */}
      <div className="grid grid-cols-7 gap-1">
        {/* Cabeçalho dos dias da semana */}
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="p-2 text-center text-xs font-medium text-zinc-600"
          >
            {day}
          </div>
        ))}

        {/* Dias do mês */}
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="p-2" />;
          }

          const agendamentosDoDia = getAgendamentosForDate(day);
          const hoje = isToday(day);
          const selecionado = isSelected(day);

          return (
            <div
              key={day}
              onClick={() => {
                const dateStr = `${String(day).padStart(2, "0")}/${String(month + 1).padStart(2, "0")}/${year}`;
                onDateClick?.(dateStr);
              }}
              className={`
                p-2 min-h-[80px] border rounded-lg cursor-pointer transition-all
                ${hoje ? "border-blue-500 bg-blue-50" : "border-zinc-200"}
                ${selecionado ? "ring-2 ring-blue-500" : ""}
                ${agendamentosDoDia.length > 0 ? "hover:bg-zinc-50" : "hover:bg-zinc-50"}
              `}
            >
              <div
                className={`text-sm font-medium mb-1 ${
                  hoje ? "text-blue-600" : "text-zinc-900"
                }`}
              >
                {day}
              </div>
              <div className="space-y-1">
                {agendamentosDoDia.slice(0, 2).map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className={`
                      text-xs px-1.5 py-0.5 rounded truncate
                      ${
                        agendamento.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : agendamento.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : agendamento.status === "completed"
                          ? "bg-zinc-100 text-zinc-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                    title={`${agendamento.hora} - ${agendamento.petName} (${agendamento.ownerName})`}
                  >
                    {agendamento.hora} - {agendamento.petName}
                  </div>
                ))}
                {agendamentosDoDia.length > 2 && (
                  <div className="text-xs text-zinc-500 font-medium">
                    +{agendamentosDoDia.length - 2}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
