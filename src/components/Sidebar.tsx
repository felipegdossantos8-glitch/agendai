"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Users, Scissors, DollarSign, User, LayoutDashboard, LogOut } from "lucide-react";

interface SidebarProps {
  slug?: string;
}

export default function Sidebar({ slug }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Agenda do Dia", href: "/dashboard", icon: Calendar },
    { name: "Visão Geral (Mês)", href: "/dashboard/agenda-geral", icon: LayoutDashboard },
    { name: "Clientes", href: "/dashboard/clientes", icon: Users },
    { name: "Serviços", href: "/dashboard/servicos", icon: Scissors },
    { name: "Caixa & Financeiro", href: "/dashboard/caixa", icon: DollarSign },
    { name: "Perfil & Horários", href: "/dashboard/perfil", icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-4 flex flex-col justify-between shrink-0 text-white">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <Scissors className="h-6 w-6 text-pink-500" />
          <span className="font-bold text-xl text-white">AgendAí</span>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <LogOut size={16} />
          Sair da Conta
        </Link>
      </div>
    </aside>
  );
}
