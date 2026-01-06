export interface Internacao {
  id: string;
  pacienteNome: string;
  pacienteId: string;
  donoNome: string;
  motivo: string;
  dataEntrada: string;
  dataSaida?: string;
  status: "ativa" | "alta" | "obito";
  veterinario: string;
  observacoes?: string;
  quarto?: string;
}
