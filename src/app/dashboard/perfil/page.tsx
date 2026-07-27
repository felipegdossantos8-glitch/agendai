"use client";

import Sidebar from "@/components/Sidebar";
import { User, Clock, Save, Building } from "lucide-react";

export default function PerfilPage() {
  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Perfil & Horários ⚙️</h1>
          <p className="text-xs text-slate-500">Informações públicas do seu estúdio e horários de atendimento</p>
        </header>

        <form className="max-w-2xl space-y-6 pb-12">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 border-b pb-3">
              <Building size={16} className="text-pink-500" /> Dados do Estúdio
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nome do Estabelecimento</label>
              <input
                type="text"
                defaultValue="Studio Beleza da Mulher"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Link de Agendamento do Cliente</label>
              <input
                type="text"
                disabled
                defaultValue="agendai.com/studio-beleza"
                className="w-full p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs text-slate-400 font-mono"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2 border-b pb-3">
              <Clock size={16} className="text-pink-500" /> Horários de Atendimento
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Horário de Abertura</label>
                <input
                  type="time"
                  defaultValue="08:00"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Horário de Fechamento</label>
                <input
                  type="time"
                  defaultValue="19:00"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-95 transition-all"
          >
            <Save size={16} /> Salvar Alterações
          </button>
        </form>
      </main>
    </div>
  );
}
