"use client";

import AppointmentCard from "../appointment-card/appointment-card";

export default function AppointmentsSection() {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg border border-zinc-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-zinc-900">
            Próximos Agendamentos
          </h2>
          <button
            onClick={() => console.log("Ver todos")}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Ver todos
          </button>
        </div>
        <div className="space-y-4">
          <AppointmentCard
            petName="Rex"
            ownerName="Maria Silva"
            time="09:00"
            type="Consulta de rotina"
            status="confirmed"
          />
          <AppointmentCard
            petName="Luna"
            ownerName="João Santos"
            time="10:30"
            type="Vacinação"
            status="confirmed"
          />
          <AppointmentCard
            petName="Thor"
            ownerName="Ana Costa"
            time="14:00"
            type="Exame de sangue"
            status="pending"
          />
          <AppointmentCard
            petName="Bella"
            ownerName="Carlos Oliveira"
            time="15:30"
            type="Consulta de rotina"
            status="confirmed"
          />
        </div>
      </div>
    </div>
  );
}
