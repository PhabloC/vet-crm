"use client";

import SearchField from "../../ui/search-field/search-field";
import { HeaderProps } from "./types";

// Dados mockados do usuário
const mockUser = {
  name: "Dr. Carlos Silva",
  role: "Veterinário",
  avatar:
    "https://ui-avatars.com/api/?name=Carlos+Silva&background=ffffff&color=2563eb&size=128",
};

export default function Header({ sectionName = "Dashboard" }: HeaderProps) {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
    // Aqui você pode implementar a lógica de busca
  };

  return (
    <header className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Lado esquerdo - Nome da seção */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-white">{sectionName}</h1>
          </div>

          {/* Centro - Campo de busca */}
          <div className="flex-1 flex justify-center">
            <SearchField
              placeholder="Buscar clientes, pets, agendamentos..."
              onSearch={handleSearch}
            />
          </div>

          {/* Lado direito - Informações do usuário */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{mockUser.name}</p>
              <p className="text-xs text-blue-100">{mockUser.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-blue-400">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
