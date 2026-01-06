export type TipoUsuario = "admin" | "veterinario" | "secretaria";

export interface Permissoes {
  clientes: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  pacientes: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  agenda: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  internacao: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  financeiro: {
    visualizar: boolean;
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  relatorios: {
    visualizar: boolean;
    gerar: boolean;
    exportar: boolean;
  };
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  ativo: boolean;
  dataCadastro: string;
  permissoes: Permissoes;
}
