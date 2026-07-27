"use client";

import { TrendingUp, Calendar, AlertCircle, Star, DollarSign, ArrowUpRight } from "lucide-react";

export default function ModuloFinanceiro() {
  const dadosFinanceiros = {
    faturadoMes: 3450.0,
    previsaoMes: 5200.0, // Agendamentos futuros confirmados
    totalAtendimentos: 68,
    taxaFaltas: "4.2%", // Faltas/No-show
    atrasos: 3,
  };

  const clientesQualificados = [
    { nome: "Juliana Mendes", nota: 5, status: "Excelente", pontual: "100%", faltas: 0 },
    { nome: "Carla Souza", nota: 2, status: "Atenção (Atrasos)", pontual: "40%", faltas: 2 },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 pb-20 text-slate-800">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Financeiro & Métricas 💰</h1>
        <p className="text-xs text-slate-500">Visão do seu caixa e comportamento das clientes</p>
      </header>

      {/* Cards de Desempenho */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-400 block mb-1">Faturado no Mês</span>
          <span className="text-xl font-extrabold text-emerald-600 block">
            R$ {dadosFinanceiros.faturadoMes.toFixed(2)}
          </span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold mt-2 inline-flex items-center gap-0.5">
            <ArrowUpRight size={10} /> +18% vs mês passado
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-400 block mb-1">Previsão Total</span>
          <span className="text-xl font-extrabold text-slate-800 block">
            R$ {dadosFinanceiros.previsaoMes.toFixed(2)}
          </span>
          <span className="text-[10px] text-slate-500 mt-2 block">
            Considerando confirmados
          </span>
        </div>
      </div>

      {/* Alertas de Faltas e Pontualidade */}
      <section className="bg-slate-900 text-white p-4 rounded-2xl mb-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1">
          <AlertCircle size={14} className="text-amber-400" /> Qualidade dos Atendimentos
        </h2>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-xl font-bold text-amber-400 block">{dadosFinanceiros.taxaFaltas}</span>
            <span className="text-[11px] text-slate-400">Taxa de Faltas (No-Show)</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <span className="text-xl font-bold text-rose-400 block">{dadosFinanceiros.atrasos}</span>
            <span className="text-[11px] text-slate-400">Clientes com Atraso</span>
          </div>
        </div>
      </section>

      {/* Avaliação das Clientes */}
      <section>
        <h2 className="font-bold text-slate-800 mb-3 text-sm">Qualificação de Clientes (Ficha)</h2>
        <div className="space-y-2">
          {clientesQualificados.map((cli, idx) => (
            <div key={idx} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{cli.nome}</h3>
                <span className="text-xs text-slate-400">Pontualidade: {cli.pontual} • Faltas: {cli.faltas}</span>
              </div>
              <div className="text-right">
                <span className="flex items-center gap-0.5 text-amber-500 font-bold text-sm">
                  <Star size={14} className="fill-amber-400" /> {cli.nota}.0
                </span>
                <span className={`text-[10px] font-bold block ${cli.nota < 3 ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {cli.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
