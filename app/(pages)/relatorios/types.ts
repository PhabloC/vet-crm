export interface TipoRelatorio {
  id: string;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
  categoria: "clientes" | "pacientes" | "financeiro" | "operacional";
}
