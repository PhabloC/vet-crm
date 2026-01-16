"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MainLayout from "../../components/layout/main-layout/main-layout";
import Button from "../../components/ui/button/button";
import Modal from "../../components/ui/modal/modal";
import {
  PlusIcon,
  SearchIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
} from "../../components/svg";
import { Cliente } from "./types";

// Dados mockados de clientes
const clientesMock: Cliente[] = [
  {
    id: "1",
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 98765-4321",
    numeroPets: 2,
    dataCadastro: "15/03/2024",
  },
  {
    id: "2",
    nome: "João Santos",
    email: "joao.santos@email.com",
    telefone: "(11) 97654-3210",
    numeroPets: 1,
    dataCadastro: "22/03/2024",
  },
  {
    id: "3",
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    telefone: "(11) 96543-2109",
    numeroPets: 3,
    dataCadastro: "10/04/2024",
  },
  {
    id: "4",
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@email.com",
    telefone: "(11) 95432-1098",
    numeroPets: 1,
    dataCadastro: "05/05/2024",
  },
  {
    id: "5",
    nome: "Patricia Lima",
    email: "patricia.lima@email.com",
    telefone: "(11) 94321-0987",
    numeroPets: 2,
    dataCadastro: "18/05/2024",
  },
];

export default function Clientes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clientes] = useState<Cliente[]>(clientesMock);
  const [busca, setBusca] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "new") {
      setIsModalOpen(true);
      // Remove o parâmetro da URL sem recarregar a página
      router.replace("/clientes");
    }
  }, [searchParams, router]);

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.telefone.includes(busca)
  );

  const handleAdicionarCliente = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCliente = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de adicionar cliente
    console.log("Adicionar novo cliente");
    setIsModalOpen(false);
  };

  const handleEditar = (id: string) => {
    // TODO: Implementar edição de cliente
    console.log("Editar cliente:", id);
  };

  const handleVisualizar = (id: string) => {
    // TODO: Implementar visualização detalhada do cliente
    console.log("Visualizar cliente:", id);
  };

  const handleExcluir = (id: string) => {
    // TODO: Implementar exclusão de cliente
    console.log("Excluir cliente:", id);
  };

  return (
    <MainLayout sectionName="Clientes">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">Clientes</h1>
            <p className="text-zinc-600 text-sm">
              Gerencie todos os clientes da clínica
            </p>
          </div>
          <Button
            onClick={handleAdicionarCliente}
            variant="primary"
            size="md"
            icon={<PlusIcon />}
          >
            Adicionar Cliente
          </Button>
        </div>

        {/* Barra de Busca */}
        <div className="mb-6">
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-zinc-400" />
              </div>
              <input
                type="text"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome, email ou telefone..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 placeholder-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* Tabela de Clientes */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Pets
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
                {clientesFiltrados.length > 0 ? (
                  clientesFiltrados.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="hover:bg-zinc-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-zinc-900">
                          {cliente.nome}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {cliente.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {cliente.telefone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {cliente.numeroPets}{" "}
                          {cliente.numeroPets === 1 ? "pet" : "pets"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                        {cliente.dataCadastro}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleVisualizar(cliente.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EyeIcon />}
                            title="Visualizar cliente"
                          />
                          <Button
                            onClick={() => handleEditar(cliente.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EditIcon />}
                            title="Editar cliente"
                          />
                          <Button
                            onClick={() => handleExcluir(cliente.id)}
                            variant="ghost"
                            size="sm"
                            icon={<TrashIcon />}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Excluir cliente"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-zinc-500"
                    >
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 text-sm text-zinc-600">
          Total de clientes:{" "}
          <span className="font-medium">{clientesFiltrados.length}</span>
        </div>
      </div>

      {/* Modal de Novo Cliente */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Novo Cliente"
        size="md"
      >
        <form onSubmit={handleSubmitCliente} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Nome completo do cliente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="cliente@email.com"
            />
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

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Salvar Cliente
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
