export interface Agendamento {
  id: string;
  petName: string;
  ownerName: string;
  data: string;
  hora: string;
  tipo: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  observacoes?: string;
  telefone: string;
}
