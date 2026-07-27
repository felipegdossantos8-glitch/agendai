"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Plus, Minus } from "lucide-react";

export default function CaixaPage() {
  const [movimentos, setMovimentos] = useState([
    { id: 1, tipo: "entrada", descricao: "Design de Sobrancelha - Cliente Amanda", valor: 40.0, hora: "09:30" },
    { id: 2, tipo: "saida", descricao: "Compra de Algodão e Henna", valor: 25.0, hora: "11:00" },
  ]);

  const totalEntradas = movimentos.filter((m) => m.tipo === "entrada").reduce((acc, m) => acc + m.valor, 0);
  const totalSaidas = movimentos.filter((m) => m.tipo === "saida").reduce((acc, m) => acc + m.valor, 0);
  const saldoTotal = totalEntradas - totalSaidas;

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-4xl">
        <header className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">Fluxo de Caixa 💰</h1>
          <p className="text-xs text-slate-500">Resumo simplificado de entradas e saídas do dia</p>
        </header>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl shadow-sm">
            <span className="text-[11px] font-bold text-emerald-700 block mb-1">Entradas</span>
            <span className="text-lg font-extrabold text-emerald-800">R$ {totalEntradas.toFixed(2)}</span>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl shadow-sm">
            <span className="text-[11px] font-bold text-rose-700 block mb-1">Saídas</span>
            <span className="text-lg font-extrabold text-rose-800">R$ {totalSaidas.toFixed(2)}</span>
          </div>

          <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 block mb-1">Saldo Final</span>
            <span className="text-lg font-extrabold text-pink-400">R$ {saldoTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Histórico das Movimentações */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-700">
            Movimentações de Hoje
          </div>
          <div className="divide-y divide-slate-100">
            {movimentos.map((item) => (
              <div key={item.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {item.tipo === "entrada" ? (
                    <ArrowUpCircle className="text-emerald-500 shrink-0" size={20} />
                  ) : (
                    <ArrowDownCircle className="text-rose-500 shrink-0" size={20} />
                  )}
                  <div>
                    <p className="font-bold text-xs text-slate-800">{item.descricao}</p>
                    <span className="text-[10px] text-slate-400">{item.hora}</span>
                  </div>
                </div>
                <span className={`font-bold text-xs ${item.tipo === "entrada" ? "text-emerald-600" : "text-rose-600"}`}>
                  {item.tipo === "entrada" ? "+" : "-"} R$ {item.valor.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
