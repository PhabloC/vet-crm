"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/main-layout/main-layout";
import StatCard from "../../components/ui/stat-card/stat-card";
import AppointmentsSection from "../../components/features/appointments/appointments-section/appointments-section";
import QuickActionsSection from "../../components/features/dashboard/quick-actions-section/quick-actions-section";
import { UsersIcon, PetIcon, CalendarIcon, ChartIcon } from "../../components/svg";

// Ícones adicionais para a dashboard
const TrendUpIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ClockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HospitalIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const AlertIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

// Dados mockados de pacientes internados
const patientsInternados = [
  { id: 1, nome: "Max", especie: "Cachorro", raca: "Golden Retriever", tutor: "Carlos Silva", dias: 2, status: "estável", motivo: "Cirurgia ortopédica" },
  { id: 2, nome: "Mimi", especie: "Gato", raca: "Siamês", tutor: "Ana Paula", dias: 1, status: "observação", motivo: "Intoxicação alimentar" },
  { id: 3, nome: "Thor", especie: "Cachorro", raca: "Pit Bull", tutor: "Roberto Lima", dias: 3, status: "recuperação", motivo: "Pós-operatório" },
];

// Dados mockados de atividades recentes
const atividadesRecentes = [
  { id: 1, tipo: "consulta", descricao: "Consulta realizada - Rex (Maria Silva)", hora: "09:45", cor: "blue" },
  { id: 2, tipo: "vacina", descricao: "Vacinação aplicada - Luna (João Santos)", hora: "10:30", cor: "green" },
  { id: 3, tipo: "cadastro", descricao: "Novo cliente cadastrado - Pedro Almeida", hora: "11:15", cor: "purple" },
  { id: 4, tipo: "pagamento", descricao: "Pagamento recebido - R$ 350,00", hora: "11:45", cor: "emerald" },
  { id: 5, tipo: "agendamento", descricao: "Novo agendamento - Bella (Carlos Oliveira)", hora: "12:00", cor: "orange" },
];

// Dados mockados de lembretes de vacinas
const lembretesVacinas = [
  { id: 1, pet: "Rex", tutor: "Maria Silva", vacina: "V10", vencimento: "Hoje", urgencia: "alta" },
  { id: 2, pet: "Luna", tutor: "João Santos", vacina: "Antirrábica", vencimento: "Amanhã", urgencia: "media" },
  { id: 3, pet: "Mel", tutor: "Carla Souza", vacina: "V8", vencimento: "Em 3 dias", urgencia: "baixa" },
  { id: 4, pet: "Bob", tutor: "Fernando Costa", vacina: "Gripe", vencimento: "Em 5 dias", urgencia: "baixa" },
];

export default function Dashboard() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("hoje");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "estável": return "bg-green-100 text-green-700";
      case "observação": return "bg-yellow-100 text-yellow-700";
      case "recuperação": return "bg-blue-100 text-blue-700";
      case "crítico": return "bg-red-100 text-red-700";
      default: return "bg-zinc-100 text-zinc-700";
    }
  };

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case "alta": return "bg-red-100 text-red-700 border-red-200";
      case "media": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "baixa": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  const getAtividadeCor = (cor: string) => {
    const cores: Record<string, string> = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      emerald: "bg-emerald-500",
      orange: "bg-orange-500",
    };
    return cores[cor] || "bg-zinc-500";
  };

  return (
    <MainLayout sectionName="Dashboard">
      {/* Header com saudação e seletor de período */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">
            Bom dia, Dr. João! 👋
          </h1>
          <p className="text-zinc-500 mt-1">
            Aqui está o resumo da sua clínica hoje
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-zinc-100 rounded-lg p-1">
          {["hoje", "semana", "mês"].map((periodo) => (
            <button
              key={periodo}
              onClick={() => setPeriodoSelecionado(periodo)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                periodoSelecionado === periodo
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total de Clientes"
          value={124}
          icon={<UsersIcon className="w-6 h-6" />}
          trend={{ value: 12, isPositive: true }}
          description="vs. mês anterior"
        />
        <StatCard
          title="Pets Cadastrados"
          value={189}
          icon={<PetIcon className="w-6 h-6" />}
          trend={{ value: 8, isPositive: true }}
          description="vs. mês anterior"
        />
        <StatCard
          title="Agendamentos Hoje"
          value={12}
          icon={<CalendarIcon className="w-6 h-6" />}
          description="3 restantes"
        />
        <StatCard
          title="Receita do Mês"
          value="R$ 45.2k"
          icon={<ChartIcon className="w-6 h-6" />}
          trend={{ value: 15, isPositive: true }}
          description="vs. mês anterior"
        />
      </div>

      {/* Alertas importantes */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <AlertIcon className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800">Atenção</h3>
            <p className="text-amber-700 text-sm mt-1">
              Você tem <span className="font-semibold">3 pacientes internados</span> e <span className="font-semibold">4 lembretes de vacinas</span> pendentes para hoje.
            </p>
          </div>
          <button className="text-amber-600 hover:text-amber-800 text-sm font-medium cursor-pointer">
            Ver detalhes
          </button>
        </div>
      </div>

      {/* Grid principal - 3 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Próximos Agendamentos - ocupa 2 colunas */}
        <AppointmentsSection />

        {/* Ações Rápidas */}
        <QuickActionsSection />
      </div>

      {/* Segunda linha - 2 colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pacientes Internados */}
        <div className="bg-white rounded-lg border border-zinc-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <HospitalIcon className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Pacientes Internados
              </h2>
            </div>
            <span className="bg-red-100 text-red-700 text-sm font-medium px-2.5 py-1 rounded-full">
              {patientsInternados.length} ativos
            </span>
          </div>
          <div className="space-y-4">
            {patientsInternados.map((paciente) => (
              <div
                key={paciente.id}
                className="flex items-center justify-between p-4 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {paciente.nome.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900">{paciente.nome}</p>
                    <p className="text-sm text-zinc-500">
                      {paciente.especie} • {paciente.raca}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Tutor: {paciente.tutor}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(paciente.status)}`}>
                    {paciente.status}
                  </span>
                  <p className="text-xs text-zinc-500 mt-1">
                    {paciente.dias} {paciente.dias === 1 ? "dia" : "dias"} internado
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
            Ver todos os internados
          </button>
        </div>

        {/* Lembretes de Vacinas */}
        <div className="bg-white rounded-lg border border-zinc-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ClockIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-zinc-900">
                Lembretes de Vacinas
              </h2>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:underline cursor-pointer">
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {lembretesVacinas.map((lembrete) => (
              <div
                key={lembrete.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${getUrgenciaColor(lembrete.urgencia)}`}
              >
                <div>
                  <p className="font-medium text-zinc-900">{lembrete.pet}</p>
                  <p className="text-sm text-zinc-600">{lembrete.tutor}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-zinc-900">{lembrete.vacina}</p>
                  <p className="text-sm text-zinc-500">{lembrete.vencimento}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-sm text-white font-medium bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer">
            Enviar lembretes
          </button>
        </div>
      </div>

      {/* Atividades Recentes */}
      <div className="bg-white rounded-lg border border-zinc-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Atividades Recentes
          </h2>
          <button className="text-sm text-blue-600 font-medium hover:underline cursor-pointer">
            Ver histórico completo
          </button>
        </div>
        <div className="relative">
          {/* Linha vertical de timeline */}
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-zinc-200" />
          
          <div className="space-y-4">
            {atividadesRecentes.map((atividade, index) => (
              <div key={atividade.id} className="flex items-start gap-4 relative">
                <div className={`w-4 h-4 rounded-full ${getAtividadeCor(atividade.cor)} ring-4 ring-white z-10`} />
                <div className="flex-1 flex items-center justify-between pb-4">
                  <p className="text-zinc-700">{atividade.descricao}</p>
                  <span className="text-sm text-zinc-400">{atividade.hora}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
