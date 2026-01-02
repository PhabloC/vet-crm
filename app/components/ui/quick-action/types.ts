export interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: "blue" | "green" | "purple" | "orange";
}
