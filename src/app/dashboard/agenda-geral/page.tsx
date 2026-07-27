"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Calendar as CalendarIcon, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

export default function AgendaGeralPage() {
  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(27);

  // Exemplo de agendamentos mapeados por dia do mês atual (Julho)
  const dadosAgendamentos: Record<number, Array<{ cliente: string; servico: string; hora: string; valor: number }>> = {
    27: [
      { cliente: "Amanda Silva", servico: "Design de Sobrancelha", hora: "09:00", valor: 40.0 },
      { cliente: "Carla Santos", servico: "Lash Lifting", hora: "10:30", valor: 180.0 },
    ],
    28: [
      { cliente: "Juliana Mendes", servico: "Manicure Tradicional", hora: "14:00", valor: 35.0 },
    ],
    30: [
      { cliente: "Patricia Lima", servico: "Limpeza de Pele", hora: "16:00", valor: 120.0 },
    ],
  };

  const diasDoMes = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Visão Geral do Mês 🗓️</h1>
            <p className="text-xs text-slate-500">Clique em qualquer dia para visualizar os detalhes dos horários</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
          {/* Calendário Mensal */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-extrabold text-sm text-slate-800">Julho 2026</span>
              <div className="flex gap-1">
                <button className="p-1 rounded-lg border hover:bg-slate-50 text-slate-500"><ChevronLeft size={16} /></button>
                <button className="p-1 rounded-lg border hover:bg-slate-50 text-slate-500"><ChevronRight size={16} /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400 mb-2">
              <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {diasDoMes.map((dia) => {
                const temAtendimentos = dadosAgendamentos[dia] && dadosAgendamentos[dia].length > 0;
                const qtd = temAtendimentos ? dadosAgendamentos[dia].length : 0;
                const estaSelecionado = diaSelecionado === dia;

                return (
                  <button
                    key={dia}
                    onClick={() => setDiaSelecionado(dia)}
                    className={`h-16 p-1.5 rounded-xl border flex flex-col justify-between items-start transition-all relative ${
                      estaSelecionado
                        ? "border-pink-500 bg-pink-50/50 ring-2 ring-pink-500/20"
                        : "border-slate-100 hover:border-slate-300 bg-slate-50/50"
                    }`}
                  >
                    <span className={`text-xs font-bold ${estaSelecionado ? "text-pink-600" : "text-slate-700"}`}>
                      {dia}
                    </span>

                    {temAtendimentos && (
                      <span className="w-full bg-pink-500 text-white text-[9px] font-bold rounded-md py-0.5 px-1 truncate text-center">
                        {qtd} {qtd === 1 ? "agend." : "agend."}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Painel Lateral de Detalhes do Dia */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-fit">
            <h3 className="font-extrabold text-sm text-slate-800 border-b pb-3 mb-4 flex items-center gap-2">
              <CalendarIcon size={16} className="text-pink-500" />
              Atendimentos do dia {diaSelecionado ? `${diaSelecionado} de Julho` : "Selecionado"}
            </h3>

            {diaSelecionado && dadosAgendamentos[diaSelecionado] ? (
              <div className="space-y-3">
                {dadosAgendamentos[diaSelecionado].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold bg-pink-100 text-pink-700 px-2 py-0.5 rounded-md">
                        {item.hora}
                      </span>
                      <span className="text-xs font-bold text-slate-700">R$ {item.valor.toFixed(2)}</span>
                    </div>
                    <p className="font-bold text-xs text-slate-800 flex items-center gap-1 mt-1">
                      <User size={12} className="text-slate-400" /> {item.cliente}
                    </p>
                    <p className="text-[11px] text-slate-500 pl-4">{item.servico}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-400">
                Nenhum atendimento agendado para esta data.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
