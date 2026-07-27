"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Calendar as CalendarIcon, Clock, CheckCircle2, MessageSquare, Plus } from "lucide-react";

export default function PainelAgenda() {
  const [dataInicio, setDataInicio] = useState("2026-07-27");
  const [dataFim, setDataFim] = useState("2026-07-28");

  const [agendamentos] = useState([
    { id: "1", data: "2026-07-27", cliente: "Amanda Silva", servico: "Design de Sobrancelha", horario: "09:00", valor: 40.0, telefone: "5511988888888" },
    { id: "2", data: "2026-07-27", cliente: "Carla Santos", servico: "Lash Lifting + Henna", horario: "10:30", valor: 180.0, telefone: "5511977777777" },
    { id: "3", data: "2026-07-28", cliente: "Juliana Mendes", servico: "Manicure Tradicional", horario: "14:00", valor: 35.0, telefone: "5511966666666" },
  ]);

  const agendamentosFiltrados = agendamentos.filter(
    (a) => a.data >= dataInicio && a.data <= dataFim
  );

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-4xl">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Agenda de Atendimentos 📅</h1>
            <p className="text-xs text-slate-500">Filtrar consultas por período</p>
          </div>
        </header>

        {/* Filtro por Intervalo: Data De - Até */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">De (Data Inicial)</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Até (Data Final)</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Lista de Atendimentos */}
        <div className="space-y-3">
          {agendamentosFiltrados.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border text-xs text-slate-400">
              Nenhum agendamento encontrado no período selecionado.
            </div>
          ) : (
            agendamentosFiltrados.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md inline-block mb-1">
                      {item.data} às {item.horario}
                    </span>
                    <h3 className="font-bold text-sm text-slate-800">{item.cliente}</h3>
                    <p className="text-xs text-slate-500">{item.servico}</p>
                  </div>
                  <span className="font-bold text-xs text-slate-700">R$ {item.valor.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
