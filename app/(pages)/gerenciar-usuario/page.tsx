"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/main-layout/main-layout";
import Button from "../../components/ui/button/button";
import Modal from "../../components/ui/modal/modal";
import {
  SearchIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  UsersIcon,
} from "../../components/svg";
import { Usuario, Permissoes, TipoUsuario } from "./types";

// Dados mockados de usuários
const usuariosMock: Usuario[] = [
  {
    id: "1",
    nome: "Dr. Carlos Silva",
    email: "carlos.silva@vetcrm.com",
    tipo: "admin",
    ativo: true,
    dataCadastro: "01/01/2024",
    permissoes: {
      clientes: { visualizar: true, criar: true, editar: true, excluir: true },
      pacientes: {
        visualizar: true,
        criar: true,
        editar: true,
        excluir: true,
      },
      agenda: { visualizar: true, criar: true, editar: true, excluir: true },
      internacao: {
        visualizar: true,
        criar: true,
        editar: true,
        excluir: true,
      },
      financeiro: {
        visualizar: true,
        criar: true,
        editar: true,
        excluir: true,
      },
      relatorios: { visualizar: true, gerar: true, exportar: true },
    },
  },
  {
    id: "2",
    nome: "Dra. Ana Paula",
    email: "ana.paula@vetcrm.com",
    tipo: "veterinario",
    ativo: true,
    dataCadastro: "15/02/2024",
    permissoes: {
      clientes: { visualizar: true, criar: true, editar: true, excluir: false },
      pacientes: {
        visualizar: true,
        criar: true,
        editar: true,
        excluir: false,
      },
      agenda: { visualizar: true, criar: true, editar: true, excluir: false },
      internacao: {
        visualizar: true,
        criar: true,
        editar: true,
        excluir: false,
      },
      financeiro: {
        visualizar: true,
        criar: false,
        editar: false,
        excluir: false,
      },
      relatorios: { visualizar: true, gerar: true, exportar: false },
    },
  },
  {
    id: "3",
    nome: "Maria Santos",
    email: "maria.santos@vetcrm.com",
    tipo: "secretaria",
    ativo: true,
    dataCadastro: "20/03/2024",
    permissoes: {
      clientes: { visualizar: true, criar: true, editar: true, excluir: false },
      pacientes: {
        visualizar: true,
        criar: true,
        editar: true,
        excluir: false,
      },
      agenda: { visualizar: true, criar: true, editar: true, excluir: false },
      internacao: {
        visualizar: true,
        criar: false,
        editar: false,
        excluir: false,
      },
      financeiro: {
        visualizar: true,
        criar: true,
        editar: false,
        excluir: false,
      },
      relatorios: { visualizar: true, gerar: false, exportar: false },
    },
  },
];

export default function Usuário() {
  const [usuarios] = useState<Usuario[]>(usuariosMock);
  const [busca, setBusca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<string>("all");
  const [filtroStatus, setFiltroStatus] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [permissoesEditando, setPermissoesEditando] =
    useState<Permissoes | null>(null);

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const matchBusca =
      usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busca.toLowerCase());

    const matchTipo = filtroTipo === "all" || usuario.tipo === filtroTipo;
    const matchStatus =
      filtroStatus === "all" ||
      (filtroStatus === "ativo" && usuario.ativo) ||
      (filtroStatus === "inativo" && !usuario.ativo);

    return matchBusca && matchTipo && matchStatus;
  });

  const handleEditarPermissoes = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setPermissoesEditando({ ...usuario.permissoes });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsuarioEditando(null);
    setPermissoesEditando(null);
  };

  const handleSalvarPermissoes = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usuarioEditando && permissoesEditando) {
      // TODO: Implementar lógica de salvar permissões
      console.log("Salvar permissões:", usuarioEditando.id, permissoesEditando);
      setIsModalOpen(false);
    }
  };

  const handleTogglePermissao = (
    modulo: keyof Permissoes,
    acao: string,
    value: boolean
  ) => {
    if (!permissoesEditando) return;

    setPermissoesEditando({
      ...permissoesEditando,
      [modulo]: {
        ...permissoesEditando[modulo],
        [acao]: value,
      } as any,
    });
  };

  const getTipoBadge = (tipo: TipoUsuario) => {
    const tipoConfig = {
      admin: { label: "Admin", class: "bg-red-100 text-red-700" },
      veterinario: { label: "Veterinário", class: "bg-blue-100 text-blue-700" },
      secretaria: {
        label: "Secretária",
        class: "bg-green-100 text-green-700",
      },
    };

    const config = tipoConfig[tipo];
    return (
      <span
        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.class}`}
      >
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (ativo: boolean) => {
    return ativo ? (
      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-700">
        Ativo
      </span>
    ) : (
      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-100 text-zinc-700">
        Inativo
      </span>
    );
  };

  return (
    <MainLayout sectionName="Gerenciar Usuário">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Gerenciar Usuários
          </h1>
          <p className="text-zinc-600 text-sm">
            Gerencie usuários e permissões do sistema (Acesso apenas para Admin)
          </p>
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
                placeholder="Buscar por nome ou email..."
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
                <option value="admin">Admin</option>
                <option value="veterinario">Veterinário</option>
                <option value="secretaria">Secretária</option>
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
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabela de Usuários */}
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
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                    Status
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
                {usuariosFiltrados.length > 0 ? (
                  usuariosFiltrados.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="hover:bg-zinc-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-5 h-5 text-zinc-400" />
                          <div className="text-sm font-medium text-zinc-900">
                            {usuario.nome}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {usuario.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTipoBadge(usuario.tipo)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(usuario.ativo)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                        {usuario.dataCadastro}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEditarPermissoes(usuario)}
                            variant="ghost"
                            size="sm"
                            icon={<EditIcon />}
                            title="Editar permissões"
                          >
                            Permissões
                          </Button>
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
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-4 text-sm text-zinc-600">
          Total de usuários:{" "}
          <span className="font-medium">{usuariosFiltrados.length}</span>
        </div>
      </div>

      {/* Modal de Editar Permissões */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Permissões - ${usuarioEditando?.nome || ""}`}
        size="lg"
      >
        {permissoesEditando && (
          <form onSubmit={handleSalvarPermissoes} className="space-y-6">
            {/* Clientes */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Clientes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.clientes.visualizar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "clientes",
                        "visualizar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Visualizar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.clientes.criar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "clientes",
                        "criar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Criar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.clientes.editar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "clientes",
                        "editar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Editar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.clientes.excluir}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "clientes",
                        "excluir",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Excluir</span>
                </label>
              </div>
            </div>

            {/* Pacientes */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Pacientes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.pacientes.visualizar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "pacientes",
                        "visualizar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Visualizar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.pacientes.criar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "pacientes",
                        "criar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Criar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.pacientes.editar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "pacientes",
                        "editar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Editar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.pacientes.excluir}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "pacientes",
                        "excluir",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Excluir</span>
                </label>
              </div>
            </div>

            {/* Agenda */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Agenda
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.agenda.visualizar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "agenda",
                        "visualizar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Visualizar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.agenda.criar}
                    onChange={(e) =>
                      handleTogglePermissao("agenda", "criar", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Criar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.agenda.editar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "agenda",
                        "editar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Editar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.agenda.excluir}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "agenda",
                        "excluir",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Excluir</span>
                </label>
              </div>
            </div>

            {/* Internação */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Internação
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.internacao.visualizar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "internacao",
                        "visualizar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Visualizar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.internacao.criar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "internacao",
                        "criar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Criar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.internacao.editar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "internacao",
                        "editar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Editar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.internacao.excluir}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "internacao",
                        "excluir",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Excluir</span>
                </label>
              </div>
            </div>

            {/* Financeiro */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Financeiro
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.financeiro.visualizar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "financeiro",
                        "visualizar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Visualizar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.financeiro.criar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "financeiro",
                        "criar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Criar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.financeiro.editar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "financeiro",
                        "editar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Editar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.financeiro.excluir}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "financeiro",
                        "excluir",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Excluir</span>
                </label>
              </div>
            </div>

            {/* Relatórios */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-3">
                Relatórios
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.relatorios.visualizar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "relatorios",
                        "visualizar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Visualizar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.relatorios.gerar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "relatorios",
                        "gerar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Gerar</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={permissoesEditando.relatorios.exportar}
                    onChange={(e) =>
                      handleTogglePermissao(
                        "relatorios",
                        "exportar",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-zinc-700">Exportar</span>
                </label>
              </div>
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
                Salvar Permissões
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </MainLayout>
  );
}
