"use client";

import QuickAction from "../../../ui/quick-action/quick-action";
import { PlusIcon, ClockIcon, FileIcon, BellAlertIcon } from "../../../svg";

export default function QuickActionsSection() {
  return (
    <div>
      <div className="bg-white rounded-lg border border-zinc-200 p-6">
        <h2 className="text-xl font-semibold text-zinc-900 mb-6">
          Ações Rápidas
        </h2>
        <div className="space-y-3">
          <QuickAction
            title="Novo Cliente"
            description="Cadastrar novo cliente no sistema"
            icon={<PlusIcon />}
            onClick={() => console.log("Novo cliente")}
            color="blue"
          />
          <QuickAction
            title="Novo Agendamento"
            description="Agendar consulta ou procedimento"
            icon={<ClockIcon />}
            onClick={() => console.log("Novo agendamento")}
            color="green"
          />
          <QuickAction
            title="Novo Prontuário"
            description="Criar registro médico do pet"
            icon={<FileIcon />}
            onClick={() => console.log("Novo prontuário")}
            color="purple"
          />
          <QuickAction
            title="Lembretes"
            description="Enviar lembretes de vacinas"
            icon={<BellAlertIcon />}
            onClick={() => console.log("Lembretes")}
            color="orange"
          />
        </div>
      </div>
    </div>
  );
}
