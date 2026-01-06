"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/main-layout/main-layout";
import Button from "../../components/ui/button/button";
import Modal from "../../components/ui/modal/modal";
import {
  PlusIcon,
  SearchIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  PetIcon,
} from "../../components/svg";
import { Internacao } from "./types";

// Dados mockados de internações
const internacoesMock: Internacao[] = [
  {
    id: "1",
    pacienteNome: "Rex",
    pacienteId: "1",
    donoNome: "Maria Silva",
    motivo: "Cirurgia de castração",
    dataEntrada: "10/01/2025",
    dataSaida: "12/01/2025",
    status: "alta",
    veterinario: "Dr. Carlos Silva",
    quarto: "Quarto 1",
    observacoes: "Recuperação normal",
  },
  {
    id: "2",
    pacienteNome: "Luna",
    pacienteId: "2",
    donoNome: "João Santos",
    motivo: "Tratamento pós-operatório",
    dataEntrada: "14/01/2025",
    status: "ativa",
    veterinario: "Dr. Carlos Silva",
    quarto: "Quarto 2",
    observacoes: "Monitoramento constante",
  },
  {
    id: "3",
    pacienteNome: "Thor",
    pacienteId: "3",
    donoNome: "Ana Costa",
    motivo: "Internação para observação",
    dataEntrada: "15/01/2025",
    status: "ativa",
    veterinario: "Dra. Ana Paula",
    quarto: "Quarto 3",
  },
  {
    id: "4",
    pacienteNome: "Max",
    pacienteId: "5",
    donoNome: "Patricia Lima",
    motivo: "Tratamento de infecção",
    dataEntrada: "08/01/2025",
    dataSaida: "11/01/2025",
    status: "alta",
    veterinario: "Dr. Carlos Silva",
    quarto: "Quarto 1",
  },
];

export default function Internação() {
  const [internacoes] = useState<Internacao[]>(internacoesMock);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const internacoesFiltradas = internacoes.filter((internacao) => {
    const matchBusca =
      internacao.pacienteNome.toLowerCase().includes(busca.toLowerCase()) ||
      internacao.donoNome.toLowerCase().includes(busca.toLowerCase()) ||
      internacao.motivo.toLowerCase().includes(busca.toLowerCase()) ||
      internacao.veterinario.toLowerCase().includes(busca.toLowerCase());

    const matchStatus =
      filtroStatus === "all" || internacao.status === filtroStatus;

    return matchBusca && matchStatus;
  });

  const handleAdicionarInternacao = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitInternacao = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de adicionar internação
    console.log("Adicionar nova internação");
    setIsModalOpen(false);
  };

  const handleEditar = (id: string) => {
    // TODO: Implementar edição de internação
    console.log("Editar internação:", id);
  };

  const handleVisualizar = (id: string) => {
    // TODO: Implementar visualização detalhada da internação
    console.log("Visualizar internação:", id);
  };

  const handleExcluir = (id: string) => {
    // TODO: Implementar exclusão de internação
    console.log("Excluir internação:", id);
  };

  const getStatusBadge = (status: Internacao["status"]) => {
    const statusConfig = {
      ativa: { label: "Ativa", class: "bg-blue-100 text-blue-700" },
      alta: { label: "Alta", class: "bg-green-100 text-green-700" },
      obito: { label: "Óbito", class: "bg-red-100 text-red-700" },
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

  return (
    <MainLayout sectionName="Internação">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">
              Internação
            </h1>
            <p className="text-zinc-600 text-sm">
              Gerencie todas as internações da clínica
            </p>
          </div>
          <Button
            onClick={handleAdicionarInternacao}
            variant="primary"
            size="md"
            icon={<PlusIcon />}
          >
            Nova Internação
          </Button>
        </div>

        {/* Filtros e Busca */}
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
                placeholder="Buscar por paciente, dono, motivo ou veterinário..."
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
                <option value="ativa">Ativa</option>
                <option value="alta">Alta</option>
                <option value="obito">Óbito</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Internações */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Dono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Data Entrada
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Data Saída
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Veterinário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Quarto
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                {internacoesFiltradas.length > 0 ? (
                  internacoesFiltradas.map((internacao) => (
                    <tr
                      key={internacao.id}
                      className="hover:bg-zinc-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <PetIcon className="w-5 h-5 text-zinc-400" />
                          <div className="text-sm font-medium text-zinc-900">
                            {internacao.pacienteNome}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {internacao.donoNome}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {internacao.motivo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                        {internacao.dataEntrada}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                        {internacao.dataSaida || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(internacao.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {internacao.veterinario}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {internacao.quarto || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleVisualizar(internacao.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EyeIcon />}
                            title="Visualizar internação"
                          />
                          <Button
                            onClick={() => handleEditar(internacao.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EditIcon />}
                            title="Editar internação"
                          />
                          <Button
                            onClick={() => handleExcluir(internacao.id)}
                            variant="ghost"
                            size="sm"
                            icon={<TrashIcon />}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Excluir internação"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-12 text-center text-sm text-zinc-500"
                    >
                      Nenhuma internação encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 text-sm text-zinc-600">
          Total de internações:{" "}
          <span className="font-medium">{internacoesFiltradas.length}</span>
        </div>
      </div>

      {/* Modal de Nova Internação */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Internação"
        size="lg"
      >
        <form onSubmit={handleSubmitInternacao} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Paciente
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Nome do paciente"
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

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Motivo da Internação
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Motivo da internação"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Data de Entrada
              </label>
              <input
                type="date"
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Status
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              >
                <option value="ativa">Ativa</option>
                <option value="alta">Alta</option>
                <option value="obito">Óbito</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Veterinário Responsável
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="Nome do veterinário"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Quarto (opcional)
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="Ex: Quarto 1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Observações (opcional)
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 resize-none"
              placeholder="Observações sobre a internação..."
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
              Salvar Internação
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
