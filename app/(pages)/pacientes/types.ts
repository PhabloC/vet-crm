export interface Paciente {
  id: string;
  nome: string;
  especie: "cachorro" | "gato" | "outro";
  raca: string;
  idade: string;
  sexo: "macho" | "femea";
  donoNome: string;
  donoId: string;
  peso?: string;
  dataCadastro: string;
  observacoes?: string;
}
