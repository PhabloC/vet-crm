"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DashboardIcon,
  ClientsIcon,
  PatientsIcon,
  AgendaIcon,
  HospitalizationIcon,
  ClinicIcon,
  ProductsServicesIcon,
  FinancialIcon,
  ReportsIcon,
  ManageUserIcon,
  MyDataIcon,
  SettingsIcon,
  CloseIcon,
  MenuIcon,
} from "../../svg";
import { MenuItem } from "./types";

// Context para compartilhar o estado do sidebar com o layout
interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

const menuItems: MenuItem[] = [
  {
    label: "Início",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Clientes",
    path: "/clientes",
    icon: <ClientsIcon />,
  },
  {
    label: "Pacientes",
    path: "/pacientes",
    icon: <PatientsIcon />,
  },
  {
    label: "Agenda",
    path: "/agenda",
    icon: <AgendaIcon />,
  },
  {
    label: "Internação",
    path: "/internacao",
    icon: <HospitalizationIcon />,
  },
  {
    label: "Clínica",
    path: "/clinica",
    icon: <ClinicIcon />,
  },
  {
    label: "Produtos/Serviços",
    path: "/produtos-servicos",
    icon: <ProductsServicesIcon />,
  },
  {
    label: "Financeiro",
    path: "/financeiro",
    icon: <FinancialIcon />,
  },
  {
    label: "Relatórios",
    path: "/relatorios",
    icon: <ReportsIcon />,
  },
  {
    label: "Gerenciar Usuário",
    path: "/gerenciar-usuario",
    icon: <ManageUserIcon />,
  },
  {
    label: "Meus Dados",
    path: "/meus-dados",
    icon: <MyDataIcon />,
  },
  {
    label: "Configurações",
    path: "/configuracao",
    icon: <SettingsIcon />,
  },
];

// Ícone de seta para o botão de colapsar
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Overlay para mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-zinc-200 z-50 transition-all duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isCollapsed ? "w-16" : "w-64"}`}
      >
        <div className="flex flex-col h-full relative">
          {/* Botão de colapsar - setinha no meio da borda direita */}
          <button
            onClick={onToggleCollapse}
            className="cursor-pointer hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-zinc-200 rounded-full items-center justify-center text-zinc-500 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm z-10"
            title={isCollapsed ? "Expandir menu" : "Recolher menu"}
          >
            <ChevronLeftIcon
              className={`transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Logo/Header da Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200">
            {isCollapsed ? (
              <img src="/logo-2.png" alt="VetCRM" className="w-10 h-10 object-contain mx-auto" />
            ) : (
              <img src="/logo.png" alt="VetCRM" width={100} height={100} />
            )}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="cursor-pointer lg:hidden text-zinc-600 hover:text-zinc-900"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={` flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-blue-600"
                      } ${isCollapsed ? "justify-center" : ""}`}
                      onClick={() => setIsMobileOpen(false)}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <span
                        className={`${isActive ? "text-blue-600" : "text-zinc-500"} ${
                          isCollapsed ? "w-5 h-5" : ""
                        }`}
                      >
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Botão para abrir sidebar no mobile */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed bottom-4 left-4 lg:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg z-30"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
