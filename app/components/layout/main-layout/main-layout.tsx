"use client";

import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import { MainLayoutProps } from "./types";

export default function MainLayout({
  children,
  sectionName = "Dashboard",
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header sectionName={sectionName} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
