"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/main-layout/main-layout";
import Button from "../../components/ui/button/button";
import Modal from "../../components/ui/modal/modal";
import StatCard from "../../components/ui/stat-card/stat-card";
import {
  PlusIcon,
  SearchIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  ChartIcon,
  FinancialIcon,
} from "../../components/svg";

// Tipos de transação financeira
type TipoTransacao = "receita" | "despesa";
type StatusTransacao = "pago" | "pendente" | "vencido";

interface TransacaoFinanceira {
  id: string;
  tipo: TipoTransacao;
  descricao: string;
  categoria: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  status: StatusTransacao;
  cliente?: string;
  metodoPagamento?: string;
  observacoes?: string;
}

// Dados mockados de transações
const transacoesMock: TransacaoFinanceira[] = [
  {
    id: "1",
    tipo: "receita",
    descricao: "Consulta - Rex",
    categoria: "Consulta",
    valor: 150.0,
    dataVencimento: "15/01/2025",
    dataPagamento: "15/01/2025",
    status: "pago",
    cliente: "Maria Silva",
    metodoPagamento: "Cartão de Crédito",
  },
  {
    id: "2",
    tipo: "receita",
    descricao: "Vacinação - Luna",
    categoria: "Vacinação",
    valor: 120.0,
    dataVencimento: "15/01/2025",
    dataPagamento: "15/01/2025",
    status: "pago",
    cliente: "João Santos",
    metodoPagamento: "Dinheiro",
  },
  {
    id: "3",
    tipo: "despesa",
    descricao: "Compra de Medicamentos",
    categoria: "Medicamentos",
    valor: 450.0,
    dataVencimento: "20/01/2025",
    status: "pendente",
    observacoes: "Pedido de reposição de estoque",
  },
  {
    id: "4",
    tipo: "receita",
    descricao: "Exame de Sangue - Thor",
    categoria: "Exames",
    valor: 250.0,
    dataVencimento: "16/01/2025",
    status: "pendente",
    cliente: "Ana Costa",
  },
  {
    id: "5",
    tipo: "receita",
    descricao: "Cirurgia - Max",
    categoria: "Cirurgia",
    valor: 1500.0,
    dataVencimento: "18/01/2025",
    status: "pendente",
    cliente: "Patricia Lima",
  },
  {
    id: "6",
    tipo: "despesa",
    descricao: "Aluguel do Consultório",
    categoria: "Infraestrutura",
    valor: 2000.0,
    dataVencimento: "05/01/2025",
    status: "vencido",
  },
  {
    id: "7",
    tipo: "receita",
    descricao: "Consulta - Bella",
    categoria: "Consulta",
    valor: 150.0,
    dataVencimento: "10/01/2025",
    dataPagamento: "10/01/2025",
    status: "pago",
    cliente: "Carlos Oliveira",
    metodoPagamento: "PIX",
  },
];

export default function Financeiro() {
  const [transacoes] = useState<TransacaoFinanceira[]>(transacoesMock);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("all");
  const [filtroStatus, setFiltroStatus] = useState<string>("all");
  const [filtroPeriodo, setFiltroPeriodo] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calcular estatísticas
  const receitasPagas = transacoes
    .filter((t) => t.tipo === "receita" && t.status === "pago")
    .reduce((sum, t) => sum + t.valor, 0);

  const receitasPendentes = transacoes
    .filter((t) => t.tipo === "receita" && t.status === "pendente")
    .reduce((sum, t) => sum + t.valor, 0);

  const despesasPagas = transacoes
    .filter((t) => t.tipo === "despesa" && t.status === "pago")
    .reduce((sum, t) => sum + t.valor, 0);

  const despesasPendentes = transacoes
    .filter((t) => t.tipo === "despesa" && t.status === "pendente")
    .reduce((sum, t) => sum + t.valor, 0);

  const saldo = receitasPagas - despesasPagas;
  const receitasTotal = receitasPagas + receitasPendentes;
  const despesasTotal = despesasPagas + despesasPendentes;

  const transacoesFiltradas = transacoes.filter((transacao) => {
    const matchBusca =
      transacao.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      transacao.categoria.toLowerCase().includes(busca.toLowerCase()) ||
      transacao.cliente?.toLowerCase().includes(busca.toLowerCase()) ||
      transacao.id.includes(busca);

    const matchTipo = filtroTipo === "all" || transacao.tipo === filtroTipo;
    const matchStatus =
      filtroStatus === "all" || transacao.status === filtroStatus;

    return matchBusca && matchTipo && matchStatus;
  });

  const handleAdicionarTransacao = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitTransacao = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de adicionar transação
    console.log("Adicionar nova transação");
    setIsModalOpen(false);
  };

  const handleEditar = (id: string) => {
    // TODO: Implementar edição de transação
    console.log("Editar transação:", id);
  };

  const handleVisualizar = (id: string) => {
    // TODO: Implementar visualização detalhada da transação
    console.log("Visualizar transação:", id);
  };

  const handleExcluir = (id: string) => {
    // TODO: Implementar exclusão de transação
    console.log("Excluir transação:", id);
  };

  const getStatusBadge = (status: StatusTransacao) => {
    const statusConfig = {
      pago: { label: "Pago", class: "bg-green-100 text-green-700" },
      pendente: { label: "Pendente", class: "bg-yellow-100 text-yellow-700" },
      vencido: { label: "Vencido", class: "bg-red-100 text-red-700" },
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <MainLayout sectionName="Financeiro">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 mb-2">
              Financeiro
            </h1>
            <p className="text-zinc-600 text-sm">
              Gerencie receitas, despesas e transações financeiras
            </p>
          </div>
          <Button
            onClick={handleAdicionarTransacao}
            variant="primary"
            size="md"
            icon={<PlusIcon />}
          >
            Nova Transação
          </Button>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Saldo Disponível"
            value={formatCurrency(saldo)}
            icon={<FinancialIcon />}
            description="Receitas - Despesas pagas"
          />
          <StatCard
            title="Receitas (Total)"
            value={formatCurrency(receitasTotal)}
            icon={<ChartIcon />}
            description={`${formatCurrency(receitasPagas)} pagas`}
          />
          <StatCard
            title="Despesas (Total)"
            value={formatCurrency(despesasTotal)}
            icon={<ChartIcon />}
            description={`${formatCurrency(despesasPagas)} pagas`}
          />
          <StatCard
            title="A Receber"
            value={formatCurrency(receitasPendentes)}
            icon={<ChartIcon />}
            description="Receitas pendentes"
          />
        </div>

        {/* Filtros */}
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
                placeholder="Buscar por descrição, categoria ou cliente..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-zinc-700">Tipo:</label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="px-3 py-1.5 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
              >
                <option value="all">Todos</option>
                <option value="receita">Receitas</option>
                <option value="despesa">Despesas</option>
              </select>
            </div>

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
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
                <option value="vencido">Vencido</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-zinc-700">
                Período:
              </label>
              <select
                value={filtroPeriodo}
                onChange={(e) => setFiltroPeriodo(e.target.value)}
                className="px-3 py-1.5 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
              >
                <option value="all">Todos</option>
                <option value="hoje">Hoje</option>
                <option value="semana">Esta Semana</option>
                <option value="mes">Este Mês</option>
                <option value="ano">Este Ano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Transações */}
        <div className="bg-white rounded-lg border border-zinc-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Vencimento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-zinc-200">
                {transacoesFiltradas.length > 0 ? (
                  transacoesFiltradas.map((transacao) => (
                    <tr
                      key={transacao.id}
                      className="hover:bg-zinc-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transacao.tipo === "receita"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {transacao.tipo === "receita" ? "Receita" : "Despesa"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-zinc-900">
                          {transacao.descricao}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {transacao.categoria}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${
                            transacao.tipo === "receita"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transacao.tipo === "receita" ? "+" : "-"}
                          {formatCurrency(transacao.valor)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {transacao.dataVencimento}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {transacao.cliente || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(transacao.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleVisualizar(transacao.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EyeIcon />}
                            title="Visualizar transação"
                          />
                          <Button
                            onClick={() => handleEditar(transacao.id)}
                            variant="ghost"
                            size="sm"
                            icon={<EditIcon />}
                            title="Editar transação"
                          />
                          <Button
                            onClick={() => handleExcluir(transacao.id)}
                            variant="ghost"
                            size="sm"
                            icon={<TrashIcon />}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Excluir transação"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-sm text-zinc-500"
                    >
                      Nenhuma transação encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 text-sm text-zinc-600">
          Total de transações:{" "}
          <span className="font-medium">{transacoesFiltradas.length}</span>
        </div>
      </div>

      {/* Modal de Nova Transação */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Transação"
        size="md"
      >
        <form onSubmit={handleSubmitTransacao} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Tipo
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
            >
              <option value="">Selecione o tipo</option>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Descrição
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Ex: Consulta - Rex"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Categoria
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              >
                <option value="">Selecione</option>
                <option value="Consulta">Consulta</option>
                <option value="Vacinação">Vacinação</option>
                <option value="Exames">Exames</option>
                <option value="Cirurgia">Cirurgia</option>
                <option value="Medicamentos">Medicamentos</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Valor (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Data de Vencimento
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
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
                <option value="vencido">Vencido</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Cliente (opcional)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Nome do cliente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Método de Pagamento (opcional)
            </label>
            <select className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900">
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
              <option value="Cartão de Débito">Cartão de Débito</option>
              <option value="PIX">PIX</option>
              <option value="Transferência">Transferência Bancária</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Observações (opcional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 resize-none"
              placeholder="Observações sobre a transação..."
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
              Salvar Transação
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
