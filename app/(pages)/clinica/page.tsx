"use client";

import { useState } from "react";
import MainLayout from "../../components/layout/main-layout/main-layout";
import Button from "../../components/ui/button/button";
import Modal from "../../components/ui/modal/modal";
import {
  EditIcon,
  PlusIcon,
  TrashIcon,
  SearchIcon,
} from "../../components/svg";

// Tipos
interface Veterinario {
  id: string;
  nome: string;
  crmv: string;
  especialidade: string;
  telefone: string;
  email: string;
  ativo: boolean;
}

interface HorarioFuncionamento {
  dia: string;
  aberto: boolean;
  inicio: string;
  fim: string;
}

interface Especialidade {
  id: string;
  nome: string;
  descricao: string;
}

// Dados mockados
const veterinariosMock: Veterinario[] = [
  {
    id: "1",
    nome: "Dr. Carlos Silva",
    crmv: "CRMV-SP 12345",
    especialidade: "Clínica Geral",
    telefone: "(11) 98765-4321",
    email: "carlos.silva@vetcrm.com",
    ativo: true,
  },
  {
    id: "2",
    nome: "Dra. Ana Costa",
    crmv: "CRMV-SP 12346",
    especialidade: "Cirurgia",
    telefone: "(11) 97654-3210",
    email: "ana.costa@vetcrm.com",
    ativo: true,
  },
  {
    id: "3",
    nome: "Dr. João Santos",
    crmv: "CRMV-SP 12347",
    especialidade: "Dermatologia",
    telefone: "(11) 96543-2109",
    email: "joao.santos@vetcrm.com",
    ativo: false,
  },
];

const especialidadesMock: Especialidade[] = [
  {
    id: "1",
    nome: "Clínica Geral",
    descricao: "Consultas de rotina e exames gerais",
  },
  {
    id: "2",
    nome: "Cirurgia",
    descricao: "Procedimentos cirúrgicos diversos",
  },
  {
    id: "3",
    nome: "Dermatologia",
    descricao: "Tratamento de doenças de pele",
  },
  {
    id: "4",
    nome: "Ortopedia",
    descricao: "Tratamento de problemas ósseos e articulares",
  },
];

const diasSemana = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

export default function Clinica() {
  // Estados da clínica
  const [nomeClinica, setNomeClinica] = useState("VetCRM Clínica Veterinária");
  const [cnpj, setCnpj] = useState("12.345.678/0001-90");
  const [telefone, setTelefone] = useState("(11) 3456-7890");
  const [email, setEmail] = useState("contato@vetcrm.com");
  const [endereco, setEndereco] = useState("Rua das Flores, 123");
  const [cidade, setCidade] = useState("São Paulo");
  const [estado, setEstado] = useState("SP");
  const [cep, setCep] = useState("01234-567");

  // Estados de veterinários
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>(veterinariosMock);
  const [buscaVeterinario, setBuscaVeterinario] = useState("");
  const [isModalVeterinarioOpen, setIsModalVeterinarioOpen] = useState(false);
  const [veterinarioEditando, setVeterinarioEditando] = useState<Veterinario | null>(null);

  // Estados de horários
  const [horarios, setHorarios] = useState<HorarioFuncionamento[]>([
    { dia: "Segunda-feira", aberto: true, inicio: "08:00", fim: "18:00" },
    { dia: "Terça-feira", aberto: true, inicio: "08:00", fim: "18:00" },
    { dia: "Quarta-feira", aberto: true, inicio: "08:00", fim: "18:00" },
    { dia: "Quinta-feira", aberto: true, inicio: "08:00", fim: "18:00" },
    { dia: "Sexta-feira", aberto: true, inicio: "08:00", fim: "18:00" },
    { dia: "Sábado", aberto: true, inicio: "08:00", fim: "13:00" },
    { dia: "Domingo", aberto: false, inicio: "08:00", fim: "18:00" },
  ]);

  // Estados de especialidades
  const [especialidades, setEspecialidades] = useState<Especialidade[]>(especialidadesMock);
  const [isModalEspecialidadeOpen, setIsModalEspecialidadeOpen] = useState(false);
  const [especialidadeEditando, setEspecialidadeEditando] = useState<Especialidade | null>(null);

  // Filtros
  const veterinariosFiltrados = veterinarios.filter(
    (vet) =>
      vet.nome.toLowerCase().includes(buscaVeterinario.toLowerCase()) ||
      vet.crmv.toLowerCase().includes(buscaVeterinario.toLowerCase()) ||
      vet.especialidade.toLowerCase().includes(buscaVeterinario.toLowerCase())
  );

  // Handlers de informações da clínica
  const handleSalvarInformacoes = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de salvar informações
    console.log("Salvar informações da clínica");
    alert("Informações salvas com sucesso!");
  };

  // Handlers de veterinários
  const handleAdicionarVeterinario = () => {
    setVeterinarioEditando(null);
    setIsModalVeterinarioOpen(true);
  };

  const handleEditarVeterinario = (id: string) => {
    const vet = veterinarios.find((v) => v.id === id);
    if (vet) {
      setVeterinarioEditando(vet);
      setIsModalVeterinarioOpen(true);
    }
  };

  const handleExcluirVeterinario = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este veterinário?")) {
      setVeterinarios(veterinarios.filter((v) => v.id !== id));
    }
  };

  const handleSalvarVeterinario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novoVeterinario: Veterinario = {
      id: veterinarioEditando?.id || Date.now().toString(),
      nome: formData.get("nome") as string,
      crmv: formData.get("crmv") as string,
      especialidade: formData.get("especialidade") as string,
      telefone: formData.get("telefone") as string,
      email: formData.get("email") as string,
      ativo: formData.get("ativo") === "on",
    };

    if (veterinarioEditando) {
      setVeterinarios(
        veterinarios.map((v) => (v.id === veterinarioEditando.id ? novoVeterinario : v))
      );
    } else {
      setVeterinarios([...veterinarios, novoVeterinario]);
    }

    setIsModalVeterinarioOpen(false);
    setVeterinarioEditando(null);
  };

  // Handlers de horários
  const handleToggleHorario = (dia: string) => {
    setHorarios(
      horarios.map((h) => (h.dia === dia ? { ...h, aberto: !h.aberto } : h))
    );
  };

  const handleAtualizarHorario = (dia: string, campo: "inicio" | "fim", valor: string) => {
    setHorarios(
      horarios.map((h) => (h.dia === dia ? { ...h, [campo]: valor } : h))
    );
  };

  const handleSalvarHorarios = () => {
    // TODO: Implementar lógica de salvar horários
    console.log("Salvar horários", horarios);
    alert("Horários salvos com sucesso!");
  };

  // Handlers de especialidades
  const handleAdicionarEspecialidade = () => {
    setEspecialidadeEditando(null);
    setIsModalEspecialidadeOpen(true);
  };

  const handleEditarEspecialidade = (id: string) => {
    const esp = especialidades.find((e) => e.id === id);
    if (esp) {
      setEspecialidadeEditando(esp);
      setIsModalEspecialidadeOpen(true);
    }
  };

  const handleExcluirEspecialidade = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta especialidade?")) {
      setEspecialidades(especialidades.filter((e) => e.id !== id));
    }
  };

  const handleSalvarEspecialidade = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novaEspecialidade: Especialidade = {
      id: especialidadeEditando?.id || Date.now().toString(),
      nome: formData.get("nome") as string,
      descricao: formData.get("descricao") as string,
    };

    if (especialidadeEditando) {
      setEspecialidades(
        especialidades.map((e) =>
          e.id === especialidadeEditando.id ? novaEspecialidade : e
        )
      );
    } else {
      setEspecialidades([...especialidades, novaEspecialidade]);
    }

    setIsModalEspecialidadeOpen(false);
    setEspecialidadeEditando(null);
  };

  return (
    <MainLayout sectionName="Clínica">
      <div className="min-h-screen p-6">
        {/* Header da Página */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Clínica</h1>
          <p className="text-zinc-600 text-sm">
            Gerencie as informações da clínica, equipe e horários de funcionamento
          </p>
        </div>

        <div className="space-y-6">
          {/* Informações Básicas da Clínica */}
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-zinc-900 mb-4">
              Informações Básicas
            </h2>
            <form onSubmit={handleSalvarInformacoes} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Nome da Clínica
                </label>
                <input
                  type="text"
                  value={nomeClinica}
                  onChange={(e) => setNomeClinica(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    CNPJ
                  </label>
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                    placeholder="12.345.678/0001-90"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                    placeholder="(11) 3456-7890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                  placeholder="contato@vetcrm.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                  placeholder="Rua, número"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                    maxLength={2}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                    placeholder="01234-567"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-zinc-200">
                <Button type="submit" variant="primary">
                  Salvar Informações
                </Button>
              </div>
            </form>
          </div>

          {/* Horários de Funcionamento */}
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">
                Horários de Funcionamento
              </h2>
              <Button onClick={handleSalvarHorarios} variant="primary" size="sm">
                Salvar Horários
              </Button>
            </div>
            <div className="space-y-3">
              {horarios.map((horario) => (
                <div
                  key={horario.dia}
                  className="flex items-center gap-4 p-3 bg-zinc-50 rounded-lg"
                >
                  <div className="flex items-center gap-2 min-w-[180px]">
                    <input
                      type="checkbox"
                      checked={horario.aberto}
                      onChange={() => handleToggleHorario(horario.dia)}
                      className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm font-medium text-zinc-700">
                      {horario.dia}
                    </label>
                  </div>
                  {horario.aberto ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={horario.inicio}
                        onChange={(e) =>
                          handleAtualizarHorario(horario.dia, "inicio", e.target.value)
                        }
                        className="px-3 py-1.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
                      />
                      <span className="text-zinc-500">até</span>
                      <input
                        type="time"
                        value={horario.fim}
                        onChange={(e) =>
                          handleAtualizarHorario(horario.dia, "fim", e.target.value)
                        }
                        className="px-3 py-1.5 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-zinc-900"
                      />
                    </div>
                  ) : (
                    <span className="text-sm text-zinc-500">Fechado</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Veterinários */}
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">Equipe</h2>
              <Button
                onClick={handleAdicionarVeterinario}
                variant="primary"
                size="md"
                icon={<PlusIcon />}
              >
                Adicionar Veterinário
              </Button>
            </div>

            {/* Busca de Veterinários */}
            <div className="mb-4">
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-zinc-400" />
                </div>
                <input
                  type="text"
                  value={buscaVeterinario}
                  onChange={(e) => setBuscaVeterinario(e.target.value)}
                  placeholder="Buscar por nome, CRMV ou especialidade..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 placeholder-zinc-400"
                />
              </div>
            </div>

            {/* Tabela de Veterinários */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      CRMV
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Especialidade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-700 uppercase tracking-wider">
                      Contato
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
                  {veterinariosFiltrados.length > 0 ? (
                    veterinariosFiltrados.map((vet) => (
                      <tr
                        key={vet.id}
                        className="hover:bg-zinc-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-zinc-900">
                            {vet.nome}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-600">{vet.crmv}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-600">
                            {vet.especialidade}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-600">
                            <div>{vet.telefone}</div>
                            <div className="text-zinc-400">{vet.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              vet.ativo
                                ? "bg-green-100 text-green-700"
                                : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {vet.ativo ? "Ativo" : "Inativo"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => handleEditarVeterinario(vet.id)}
                              variant="ghost"
                              size="sm"
                              icon={<EditIcon />}
                              title="Editar veterinário"
                            />
                            <Button
                              onClick={() => handleExcluirVeterinario(vet.id)}
                              variant="ghost"
                              size="sm"
                              icon={<TrashIcon />}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              title="Excluir veterinário"
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
                        Nenhum veterinário encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Especialidades */}
          <div className="bg-white rounded-lg border border-zinc-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">
                Especialidades
              </h2>
              <Button
                onClick={handleAdicionarEspecialidade}
                variant="primary"
                size="md"
                icon={<PlusIcon />}
              >
                Adicionar Especialidade
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {especialidades.map((esp) => (
                <div
                  key={esp.id}
                  className="p-4 border border-zinc-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-zinc-900">{esp.nome}</h3>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleEditarEspecialidade(esp.id)}
                        variant="ghost"
                        size="sm"
                        icon={<EditIcon />}
                        title="Editar especialidade"
                      />
                      <Button
                        onClick={() => handleExcluirEspecialidade(esp.id)}
                        variant="ghost"
                        size="sm"
                        icon={<TrashIcon />}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Excluir especialidade"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600">{esp.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Veterinário */}
      <Modal
        isOpen={isModalVeterinarioOpen}
        onClose={() => {
          setIsModalVeterinarioOpen(false);
          setVeterinarioEditando(null);
        }}
        title={veterinarioEditando ? "Editar Veterinário" : "Novo Veterinário"}
        size="md"
      >
        <form onSubmit={handleSalvarVeterinario} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              defaultValue={veterinarioEditando?.nome || ""}
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Dr. Nome Completo"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                CRMV
              </label>
              <input
                type="text"
                name="crmv"
                defaultValue={veterinarioEditando?.crmv || ""}
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="CRMV-SP 12345"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Especialidade
              </label>
              <input
                type="text"
                name="especialidade"
                defaultValue={veterinarioEditando?.especialidade || ""}
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="Clínica Geral"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Telefone
              </label>
              <input
                type="tel"
                name="telefone"
                defaultValue={veterinarioEditando?.telefone || ""}
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="(11) 98765-4321"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={veterinarioEditando?.email || ""}
                required
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
                placeholder="email@vetcrm.com"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="ativo"
                defaultChecked={veterinarioEditando?.ativo ?? true}
                className="w-4 h-4 text-blue-600 border-zinc-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-zinc-700">
                Veterinário ativo
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalVeterinarioOpen(false);
                setVeterinarioEditando(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {veterinarioEditando ? "Atualizar" : "Salvar"} Veterinário
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Especialidade */}
      <Modal
        isOpen={isModalEspecialidadeOpen}
        onClose={() => {
          setIsModalEspecialidadeOpen(false);
          setEspecialidadeEditando(null);
        }}
        title={
          especialidadeEditando
            ? "Editar Especialidade"
            : "Nova Especialidade"
        }
        size="md"
      >
        <form onSubmit={handleSalvarEspecialidade} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Nome da Especialidade
            </label>
            <input
              type="text"
              name="nome"
              defaultValue={especialidadeEditando?.nome || ""}
              required
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900"
              placeholder="Ex: Clínica Geral"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              defaultValue={especialidadeEditando?.descricao || ""}
              required
              rows={3}
              className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-zinc-900 resize-none"
              placeholder="Descrição da especialidade..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsModalEspecialidadeOpen(false);
                setEspecialidadeEditando(null);
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {especialidadeEditando ? "Atualizar" : "Salvar"} Especialidade
            </Button>
          </div>
        </form>
      </Modal>
    </MainLayout>
  );
}
