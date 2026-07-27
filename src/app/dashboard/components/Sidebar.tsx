"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Users, Scissors, DollarSign, User, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Agenda do Dia", href: "/dashboard", icon: Calendar },
    { name: "Visão Geral (Mês)", href: "/dashboard/agenda-geral", icon: LayoutDashboard },
    { name: "Clientes", href: "/dashboard/clientes", icon: Users },
    { name: "Serviços", href: "/dashboard/servicos", icon: Scissors },
    { name: "Caixa & Financeiro", href: "/dashboard/financeiro", icon: DollarSign },
    { name: "Perfil & Horários", href: "/dashboard/perfil", icon: User },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <Scissors className="h-6 w-6 text-pink-600" />
          <span className="font-bold text-xl text-gray-800">AgendAí</span>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pink-50 text-pink-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-pink-600" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
