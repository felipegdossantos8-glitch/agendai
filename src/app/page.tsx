"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Sparkles, UserCheck, ArrowRight, Shield } from "lucide-react";

export default function HomePage() {
  const [passo, setPasso] = useState<"inicio" | "servicos">("inicio");

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4">
      {/* Cabeçalho Público com Link Discreto do Profissional */}
      <header className="flex justify-between items-center max-w-md mx-auto w-full pt-2 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="text-pink-500" size={20} />
          <span className="font-extrabold text-lg text-white">Studio Beleza</span>
        </div>
        <Link
          href="/login"
          className="text-xs text-slate-400 hover:text-pink-400 font-medium flex items-center gap-1 bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
        >
          <Shield size={12} />
          Área da Profissional
        </Link>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-md mx-auto w-full my-auto py-6 space-y-6">
        {passo === "inicio" ? (
          <div className="space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">
                Agendamento Online 👋
              </h1>
              <p className="text-slate-400 text-xs">
                Escolha o melhor horário para o seu atendimento no Studio Beleza
              </p>
            </div>

            {/* Botão Principal de Agendar */}
            <button
              onClick={() => setPasso("servicos")}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 text-base active:scale-95"
            >
              <Calendar size={20} />
              Agendar Horário
              <ArrowRight size={18} />
            </button>

            {/* Prévia dos Próximos Horários Vagos */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 text-left space-y-3">
              <span className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                <Clock size={14} className="text-pink-400" /> Próximos Horários Disponíveis
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-800 p-2 rounded-xl text-center border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Hoje</span>
                  <span className="text-xs font-bold text-pink-400">15:00</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-xl text-center border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Amanhã</span>
                  <span className="text-xs font-bold text-pink-400">10:00</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-xl text-center border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Amanhã</span>
                  <span className="text-xs font-bold text-pink-400">14:30</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Redirecionamento Direto para o Agendamento do Studio Beleza */
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-white">Carregando Serviços...</h2>
            <p className="text-xs text-slate-400">Direcionando você para o catálogo do Studio Beleza</p>
            <Link
              href="/studio-beleza"
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl text-sm block"
            >
              Clique para Continuar
            </Link>
          </div>
        )}
      </main>

      <footer className="text-center py-2 text-[11px] text-slate-500">
        AgendAí SaaS • Studio Beleza
      </footer>
    </div>
  );
}
