export interface AppointmentCardProps {
  petName: string;
  ownerName: string;
  time: string;
  type: string;
  status?: "confirmed" | "pending" | "completed";
}
