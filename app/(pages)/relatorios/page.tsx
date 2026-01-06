"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/main-layout/main-layout";
import Button from "../../components/ui/button/button";
import {
  FileIcon,
  CalendarIcon,
  ChartIcon,
  UsersIcon,
  PetIcon,
} from "../../components/svg";
import { TipoRelatorio } from "./types";

const tiposRelatorios: TipoRelatorio[] = [
  {
    id: "1",
    titulo: "Relatório de Clientes",
    descricao:
      "Lista completa de clientes cadastrados com informações detalhadas",
    icon: <UsersIcon />,
    categoria: "clientes",
  },
  {
    id: "2",
    titulo: "Relatório de Pacientes",
    descricao: "Relatório completo de todos os pacientes (animais) cadastrados",
    icon: <PetIcon />,
    categoria: "pacientes",
  },
  {
    id: "3",
    titulo: "Relatório de Agendamentos",
    descricao: "Histórico de agendamentos por período, status e tipo",
    icon: <CalendarIcon />,
    categoria: "operacional",
  },
  {
    id: "4",
    titulo: "Relatório Financeiro",
    descricao: "Relatório de receitas, despesas e faturamento por período",
    icon: <ChartIcon />,
    categoria: "financeiro",
  },
  {
    id: "5",
    titulo: "Relatório de Internações",
    descricao: "Histórico de internações com detalhes de entrada e saída",
    icon: <FileIcon />,
    categoria: "operacional",
  },
  {
    id: "6",
    titulo: "Relatório de Atendimentos",
    descricao: "Estatísticas de atendimentos realizados por período",
    icon: <CalendarIcon />,
    categoria: "operacional",
  },
];

export default function Relatórios() {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("all");

  const relatoriosFiltrados =
    categoriaFiltro === "all"
      ? tiposRelatorios
      : tiposRelatorios.filter((r) => r.categoria === categoriaFiltro);

  const handleGerarRelatorio = (id: string) => {
    // TODO: Implementar lógica de geração de relatório
    console.log("Gerar relatório:", id);
  };

  const handleExportarRelatorio = (id: string, formato: "pdf" | "excel") => {
    // TODO: Implementar lógica de exportação
    console.log("Exportar relatório:", id, formato);
  };

  const categorias = [
    { value: "all", label: "Todos" },
    { value: "clientes", label: "Clientes" },
    { value: "pacientes", label: "Pacientes" },
    { value: "financeiro", label: "Financeiro" },
    { value: "operacional", label: "Operacional" },
  ];

  return (
    <MainLayout sectionName="Relatórios">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Relatórios</h1>
          <p className="text-zinc-600 text-sm">
            Gere e visualize relatórios da clínica
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-zinc-700">
              Categoria:
            </label>
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="px-3 py-1.5 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
            >
              {categorias.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid de Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatoriosFiltrados.map((relatorio) => (
            <div
              key={relatorio.id}
              className="bg-white rounded-lg border border-zinc-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  {relatorio.icon}
                </div>
                <span className="px-2 py-1 text-xs font-medium text-zinc-600 bg-zinc-100 rounded-full capitalize">
                  {relatorio.categoria}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                {relatorio.titulo}
              </h3>
              <p className="text-sm text-zinc-600 mb-4">
                {relatorio.descricao}
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleGerarRelatorio(relatorio.id)}
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  Gerar
                </Button>
                <Button
                  onClick={() => handleExportarRelatorio(relatorio.id, "pdf")}
                  variant="secondary"
                  size="sm"
                  title="Exportar PDF"
                >
                  PDF
                </Button>
                <Button
                  onClick={() => handleExportarRelatorio(relatorio.id, "excel")}
                  variant="secondary"
                  size="sm"
                  title="Exportar Excel"
                >
                  Excel
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Informações adicionais */}
        {relatoriosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-zinc-500">
              Nenhum relatório encontrado para esta categoria
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-zinc-600">
          Total de relatórios disponíveis:{" "}
          <span className="font-medium">{relatoriosFiltrados.length}</span>
        </div>
      </div>
    </MainLayout>
  );
}
