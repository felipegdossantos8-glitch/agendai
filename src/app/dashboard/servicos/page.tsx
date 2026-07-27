"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Scissors, Plus, Clock, DollarSign, Edit2, Trash2 } from "lucide-react";

export default function ServicosPage() {
  const [servicos, setServicos] = useState([
    { id: "1", nome: "Design de Sobrancelha com Henna", duracao: "45 min", preco: 50.0 },
    { id: "2", nome: "Manicure + Pedicure Completa", duracao: "90 min", preco: 70.0 },
    { id: "3", nome: "Lash Lifting Lash Cílios", duracao: "60 min", preco: 120.0 },
  ]);

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Catálogo de Serviços ✂️</h1>
            <p className="text-xs text-slate-500">Configure preços e durações dos seus tratamentos</p>
          </div>
          <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-95 transition-all">
            <Plus size={16} /> Adicionar Serviço
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
          {servicos.map((s) => (
            <div key={s.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <h3 className="font-bold text-sm text-slate-800">{s.nome}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={14} className="text-pink-500" /> {s.duracao}</span>
                  <span className="flex items-center gap-1 font-bold text-slate-800"><DollarSign size={14} className="text-emerald-500" /> R$ {s.preco.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t pt-3 border-slate-100">
                <button className="p-2 text-slate-400 hover:text-pink-500 rounded-lg"><Edit2 size={16} /></button>
                <button className="p-2 text-slate-400 hover:text-rose-500 rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
