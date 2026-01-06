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
import { Paciente } from "./types";

// Dados mockados de pacientes
const pacientesMock: Paciente[] = [
  {
    id: "1",
    nome: "Rex",
    especie: "cachorro",
    raca: "Golden Retriever",
    idade: "3 anos",
    sexo: "macho",
    donoNome: "Maria Silva",
    donoId: "1",
    peso: "25 kg",
    dataCadastro: "15/03/2024",
    observacoes: "Vacinação em dia",
  },
  {
    id: "2",
    nome: "Luna",
    especie: "gato",
    raca: "Persa",
    idade: "2 anos",
    sexo: "femea",
    donoNome: "João Santos",
    donoId: "2",
    peso: "4.5 kg",
    dataCadastro: "22/03/2024",
  },
  {
    id: "3",
    nome: "Thor",
    especie: "cachorro",
    raca: "Husky Siberiano",
    idade: "5 anos",
    sexo: "macho",
    donoNome: "Ana Costa",
    donoId: "3",
    peso: "28 kg",
    dataCadastro: "10/04/2024",
  },
  {
    id: "4",
    nome: "Bella",
    especie: "gato",
    raca: "Siamês",
    idade: "1 ano",
    sexo: "femea",
    donoNome: "Carlos Oliveira",
    donoId: "4",
    peso: "3.2 kg",
    dataCadastro: "05/05/2024",
  },
  {
    id: "5",
    nome: "Max",
    especie: "cachorro",
    raca: "Labrador",
    idade: "4 anos",
    sexo: "macho",
    donoNome: "Patricia Lima",
    donoId: "5",
    peso: "30 kg",
    dataCadastro: "18/05/2024",
  },
  {
    id: "6",
    nome: "Toby",
    especie: "cachorro",
    raca: "Bulldog",
    idade: "2 anos",
    sexo: "macho",
    donoNome: "Roberto Alves",
    donoId: "6",
    peso: "22 kg",
    dataCadastro: "20/05/2024",
  },
];

export default function Pacientes() {
  const [pacientes] = useState<Paciente[]>(pacientesMock);
  const [busca, setBusca] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const matchBusca =
      paciente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      paciente.raca.toLowerCase().includes(busca.toLowerCase()) ||
      paciente.donoNome.toLowerCase().includes(busca.toLowerCase());

    const matchEspecie =
      filtroEspecie === "all" || paciente.especie === filtroEspecie;

    return matchBusca && matchEspecie;
  });

  const handleAdicionarPaciente = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPaciente = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de adicionar paciente
    console.log("Adicionar novo paciente");
    setIsModalOpen(false);
  };

  const handleEditar = (id: string) => {
    // TODO: Implementar edição de paciente
    console.log("Editar paciente:", id);
  };

  const handleVisualizar = (id: string) => {
    // TODO: Implementar visualização detalhada do paciente
    console.log("Visualizar paciente:", id);
  };

  const handleExcluir = (id: string) => {
    // TODO: Implementar exclusão de paciente
    console.log("Excluir paciente:", id);
  };

  const getEspecieBadge = (especie: Paciente["especie"]) => {
    const especieConfig = {
      cachorro: { label: "Cachorro", class: "bg-blue-100 text-blue-700" },
      gato: { label: "Gato", class: "bg-purple-100 text-purple-700" },
      outro: { label: "Outro", class: "bg-zinc-100 text-zinc-700" },
    };

    const config = especieConfig[especie];
    return (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.class}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <MainLayout sectionName="Pacientes">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Pacientes</h1>
            <p className="text-zinc-600 text-sm">
              Gerencie todos os pacientes (animais) da clínica
            </p>
          </div>
          <Button
            onClick={handleAdicionarPaciente}
            variant="primary"
            size="md"
            icon={<PlusIcon />}
          >
            Novo Paciente
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
                placeholder="Buscar por nome, raça ou dono..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-zinc-700">
                Espécie:
              </label>
              <select
                value={filtroEspecie}
                onChange={(e) => setFiltroEspecie(e.target.value)}
                className="px-3 py-1.5 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
              >
                <option value="all">Todas</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Pacientes */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Espécie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Raça
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Idade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Sexo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Dono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Peso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Data de Cadastro
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                {pacientesFiltrados.length > 0 ? (
                  pacientesFiltrados.map((paciente) => (
                    <tr
                      key={paciente.id}
                      className="hover:bg-zinc-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <PetIcon className="w-5 h-5 text-zinc-400" />
                          <div className="text-sm font-medium text-zinc-900">
                            {paciente.nome}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getEspecieBadge(paciente.especie)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {paciente.raca}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {paciente.idade}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600 capitalize">
                          {paciente.sexo}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {paciente.donoNome}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {paciente.peso || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                        {paciente.dataCadastro}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleVisualizar(paciente.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EyeIcon />}
                            title="Visualizar paciente"
                          />
                          <Button
                            onClick={() => handleEditar(paciente.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EditIcon />}
                            title="Editar paciente"
                          />
                          <Button
                            onClick={() => handleExcluir(paciente.id)}
                            variant="ghost"
                            size="sm"
                            icon={<TrashIcon />}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Excluir paciente"
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
                      Nenhum paciente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 text-sm text-zinc-600">
          Total de pacientes:{" "}
          <span className="font-medium">{pacientesFiltrados.length}</span>
        </div>
      </div>

      {/* Modal de Novo Paciente */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Novo Paciente"
        size="md"
      >
        <form onSubmit={handleSubmitPaciente} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Nome do Animal
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Nome do paciente"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Espécie
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              >
                <option value="">Selecione</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Raça
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="Raça do animal"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Idade
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="Ex: 2 anos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Sexo
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              >
                <option value="">Selecione</option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
            </div>
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
              Peso (opcional)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Ex: 25 kg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Observações (opcional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 resize-none"
              placeholder="Observações sobre o paciente..."
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
              Salvar Paciente
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
