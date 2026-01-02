import StatCard from "./components/ui/stat-card/stat-card";
import MainLayout from "./components/layout/main-layout/main-layout";
import AppointmentsSection from "./components/features/appointments/appointments-section/appointments-section";
import QuickActionsSection from "./components/features/dashboard/quick-actions-section/quick-actions-section";
import { UsersIcon, PetIcon, CalendarIcon, ChartIcon } from "./components/svg";

export default function Home() {
  return (
    <MainLayout sectionName="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total de Clientes"
          value={124}
          icon={<UsersIcon />}
          trend={{ value: 12, isPositive: true }}
          description="vs. mês anterior"
        />
        <StatCard
          title="Pets Cadastrados"
          value={189}
          icon={<PetIcon />}
          trend={{ value: 8, isPositive: true }}
          description="vs. mês anterior"
        />
        <StatCard
          title="Agendamentos Hoje"
          value={12}
          icon={<CalendarIcon />}
          description="3 restantes"
        />
        <StatCard
          title="Receita do Mês"
          value="R$ 45.2k"
          icon={<ChartIcon />}
          trend={{ value: 15, isPositive: true }}
          description="vs. mês anterior"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Próximos Agendamentos */}
        <AppointmentsSection />

        {/* Ações Rápidas */}
        <QuickActionsSection />
      </div>
    </MainLayout>
  );
}
