"use "use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Calendar, Wrench, DollarSign, User, LogOut, ExternalLink } from "lucide-react";

export default function Sidebar({ slug = "studio-espaco-beleza" }: { slug?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botão de Abrir o Menu no Topo */}
      <button
        onClick={toggleMenu}
        className="p-2 text-white hover:bg-slate-800 rounded-xl transition-all"
        aria-label="Abrir Menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay Escuro quando o menu tá aberto */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Gaveta do Menu Lateral */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out p-5 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Cabeçalho do Menu */}
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
            <div>
              <h2 className="font-extrabold text-lg text-pink-500">Agendai ✨</h2>
              <p className="text-xs text-slate-400">Painel Profissional</p>
            </div>
            <button
              onClick={toggleMenu}
              className="p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <Calendar size={18} className="text-pink-500" />
              Minha Agenda
            </Link>

            <Link
              href="/dashboard/servicos"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <Wrench size={18} className="text-pink-500" />
              Gerenciar Serviços
            </Link>

            <Link
              href="/dashboard/financeiro"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <DollarSign size={18} className="text-emerald-400" />
              Caixa & Financeiro
            </Link>

            <Link
              href="/dashboard/perfil"
              onClick={toggleMenu}
              className="flex items-center gap-3 p-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <User size={18} className="text-amber-400" />
              Perfil & Endereço
            </Link>
          </nav>
        </div>

        {/* Rodapé do Menu com Link do Cliente e Sair */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-pink-500/10 text-pink-400 text-xs font-bold hover:bg-pink-500/20 transition-all"
          >
            <span>Ver Minha Pagina Pública</span>
            <ExternalLink size={14} />
          </a>

          <Link
            href="/login"
            className="flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={16} />
            Sair da Conta
          </Link>
        </div>
      </aside>
    </>
  );
}
