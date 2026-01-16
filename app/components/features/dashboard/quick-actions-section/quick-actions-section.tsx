"use client";

import { useRouter } from "next/navigation";
import QuickAction from "../../../ui/quick-action/quick-action";
import { PlusIcon, ClockIcon, FileIcon, BellAlertIcon } from "../../../svg";

export default function QuickActionsSection() {
  const router = useRouter();

  const handleNovoCliente = () => {
    router.push("/clientes?action=new");
  };

  const handleNovoAgendamento = () => {
    router.push("/agenda?action=new");
  };

  const handleNovoProntuario = () => {
    router.push("/pacientes?action=new");
  };

  const handleLembretes = () => {
    router.push("/agenda?view=reminders");
  };

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
            onClick={handleNovoCliente}
            color="blue"
          />
          <QuickAction
            title="Novo Agendamento"
            description="Agendar consulta ou procedimento"
            icon={<ClockIcon />}
            onClick={handleNovoAgendamento}
            color="green"
          />
          <QuickAction
            title="Novo Prontuário"
            description="Criar registro médico do pet"
            icon={<FileIcon />}
            onClick={handleNovoProntuario}
            color="purple"
          />
          <QuickAction
            title="Lembretes"
            description="Enviar lembretes de vacinas"
            icon={<BellAlertIcon />}
            onClick={handleLembretes}
            color="orange"
          />
        </div>
      </div>
    </div>
  );
}
