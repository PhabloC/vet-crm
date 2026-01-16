"use client";

import { useState } from "react";
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

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-zinc-200 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header da Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200">
            <img src="/logo.png" alt="VetCRM" width={100} height={100} />
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-zinc-600 hover:text-zinc-900"
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
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-zinc-700 hover:bg-zinc-50 hover:text-blue-600"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span
                        className={isActive ? "text-blue-600" : "text-zinc-500"}
                      >
                        {item.icon}
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Botão para abrir sidebar no mobile */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 lg:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg z-30"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
