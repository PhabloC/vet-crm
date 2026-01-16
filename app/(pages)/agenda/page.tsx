"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainLayout from "../../components/layout/main-layout/main-layout";
import Button from "../../components/ui/button/button";
import Modal from "../../components/ui/modal/modal";
import Calendar from "../../components/ui/calendar/calendar";
import {
  PlusIcon,
  SearchIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  CalendarIcon,
} from "../../components/svg";
import { Agendamento } from "./types";

// Dados mockados de agendamentos
const agendamentosMock: Agendamento[] = [
  {
    id: "1",
    petName: "Rex",
    ownerName: "Maria Silva",
    data: "15/01/2025",
    hora: "09:00",
    tipo: "Consulta de rotina",
    status: "confirmed",
    telefone: "(11) 98765-4321",
    observacoes: "Retorno após vacinação",
  },
  {
    id: "2",
    petName: "Luna",
    ownerName: "João Santos",
    data: "15/01/2025",
    hora: "10:30",
    tipo: "Vacinação",
    status: "confirmed",
    telefone: "(11) 97654-3210",
  },
  {
    id: "3",
    petName: "Thor",
    ownerName: "Ana Costa",
    data: "15/01/2025",
    hora: "14:00",
    tipo: "Exame de sangue",
    status: "pending",
    telefone: "(11) 96543-2109",
  },
  {
    id: "4",
    petName: "Bella",
    ownerName: "Carlos Oliveira",
    data: "15/01/2025",
    hora: "15:30",
    tipo: "Consulta de rotina",
    status: "confirmed",
    telefone: "(11) 95432-1098",
  },
  {
    id: "5",
    petName: "Max",
    ownerName: "Patricia Lima",
    data: "16/01/2025",
    hora: "08:00",
    tipo: "Cirurgia",
    status: "pending",
    telefone: "(11) 94321-0987",
  },
  {
    id: "6",
    petName: "Toby",
    ownerName: "Roberto Alves",
    data: "16/01/2025",
    hora: "11:00",
    tipo: "Consulta de rotina",
    status: "confirmed",
    telefone: "(11) 93210-9876",
  },
];

export default function Agenda() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [agendamentos] = useState<Agendamento[]>(agendamentosMock);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("all");
  const [filtroData, setFiltroData] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [viewMode, setViewMode] = useState<"calendar" | "table">("calendar");

  useEffect(() => {
    const action = searchParams.get("action");
    const view = searchParams.get("view");

    if (action === "new") {
      setIsModalOpen(true);
      // Remove o parâmetro da URL sem recarregar a página
      router.replace("/agenda");
    }

    if (view === "reminders") {
      // Por enquanto, apenas muda para o modo de lista
      setViewMode("table");
      router.replace("/agenda");
    }
  }, [searchParams, router]);

  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    const matchBusca =
      agendamento.petName.toLowerCase().includes(busca.toLowerCase()) ||
      agendamento.ownerName.toLowerCase().includes(busca.toLowerCase()) ||
      agendamento.tipo.toLowerCase().includes(busca.toLowerCase()) ||
      agendamento.telefone.includes(busca);

    const matchStatus =
      filtroStatus === "all" || agendamento.status === filtroStatus;
    const matchData = !filtroData || agendamento.data === filtroData;

    return matchBusca && matchStatus && matchData;
  });

  const handleAdicionarAgendamento = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitAgendamento = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de adicionar agendamento
    console.log("Adicionar novo agendamento");
    setIsModalOpen(false);
  };

  const handleEditar = (id: string) => {
    // TODO: Implementar edição de agendamento
    console.log("Editar agendamento:", id);
  };

  const handleVisualizar = (id: string) => {
    // TODO: Implementar visualização detalhada do agendamento
    console.log("Visualizar agendamento:", id);
  };

  const handleExcluir = (id: string) => {
    // TODO: Implementar exclusão de agendamento
    console.log("Excluir agendamento:", id);
  };

  const getStatusBadge = (status: Agendamento["status"]) => {
    const statusConfig = {
      confirmed: { label: "Confirmado", class: "bg-green-100 text-green-700" },
      pending: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
      completed: { label: "Concluído", class: "bg-zinc-100 text-zinc-700" },
      cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700" },
    };

    const config = statusConfig[status];
    return (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.class}`}
      >
        {config.label}
      </span>
    );
  };

  // Obter datas únicas para o filtro
  const datasUnicas = Array.from(
    new Set(agendamentos.map((a) => a.data))
  ).sort();

  const handleDateClick = (date: string) => {
    setDataSelecionada(date);
    setFiltroData(date);
    setViewMode("table");
  };

  return (
    <MainLayout sectionName="Agenda">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Agenda</h1>
            <p className="text-zinc-600 text-sm">
              Gerencie todos os agendamentos da clínica
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1 bg-zinc-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  viewMode === "calendar"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Calendário
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  viewMode === "table"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Lista
              </button>
            </div>
            <Button
              onClick={handleAdicionarAgendamento}
              variant="primary"
              size="md"
              icon={<PlusIcon />}
            >
              Novo Agendamento
            </Button>
          </div>
        </div>

        {/* Calendário ou Filtros */}
        {viewMode === "calendar" ? (
          <div className="mb-6">
            <Calendar
              agendamentos={agendamentos}
              onDateClick={handleDateClick}
              selectedDate={dataSelecionada}
            />
          </div>
        ) : (
          <div className="mb-6 space-y-4">
            {/* Barra de Busca */}
            <div className="w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por pet, dono, tipo ou telefone..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-zinc-700">
                  Status:
                </label>
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
                >
                  <option value="all">Todos</option>
                  <option value="confirmed">Confirmado</option>
                  <option value="pending">Pendente</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-zinc-700">
                  Data:
                </label>
                <select
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
                >
                  <option value="">Todas as datas</option>
                  {datasUnicas.map((data) => (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de Agendamentos - Mostrar apenas no modo lista */}
        {viewMode === "table" && (
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Data/Hora
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Pet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Dono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {agendamentosFiltrados.length > 0 ? (
                    agendamentosFiltrados.map((agendamento) => (
                      <tr
                        key={agendamento.id}
                        className="hover:bg-zinc-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-zinc-400" />
                            <div>
                              <div className="text-sm font-medium text-zinc-900">
                                {agendamento.data}
                              </div>
                              <div className="text-sm text-zinc-600">
                                {agendamento.hora}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-zinc-900">
                            {agendamento.petName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-600">
                            {agendamento.ownerName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-600">
                            {agendamento.tipo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(agendamento.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-600">
                            {agendamento.telefone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => handleVisualizar(agendamento.id)}
                              variant="ghost"
                              size="sm"
                              icon={<EyeIcon />}
                              title="Visualizar agendamento"
                            />
                            <Button
                              onClick={() => handleEditar(agendamento.id)}
                              variant="ghost"
                              size="sm"
                              icon={<EditIcon />}
                              title="Editar agendamento"
                            />
                            <Button
                              onClick={() => handleExcluir(agendamento.id)}
                              variant="ghost"
                              size="sm"
                              icon={<TrashIcon />}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Excluir agendamento"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-sm text-zinc-500"
                      >
                        Nenhum agendamento encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Informações adicionais */}
        {viewMode === "table" && (
          <div className="mt-4 text-sm text-zinc-600">
            Total de agendamentos:{" "}
            <span className="font-medium">{agendamentosFiltrados.length}</span>
          </div>
        )}
      </div>

      {/* Modal de Novo Agendamento */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Novo Agendamento"
        size="md"
      >
        <form onSubmit={handleSubmitAgendamento} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Pet
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Nome do pet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Dono
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Nome do dono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Data
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Hora
              </label>
              <input
                type="time"
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Tipo
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
            >
              <option value="">Selecione o tipo</option>
              <option value="consulta-rotina">Consulta de rotina</option>
              <option value="vacinacao">Vacinação</option>
              <option value="exame-sangue">Exame de sangue</option>
              <option value="cirurgia">Cirurgia</option>
              <option value="emergencia">Emergência</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="(11) 98765-4321"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Observações (opcional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 resize-none"
              placeholder="Observações sobre o agendamento..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Salvar Agendamento
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
