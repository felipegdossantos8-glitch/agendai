"use client";

import { useState } from "react";
import { Sparkles, Clock, Calendar, Check } from "lucide-react";

export default function PaginaAgendamentoCliente() {
  const [servicoSelecionado, setServicoSelecionado] = useState<string | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const servicos = [
    { id: "1", nome: "Design de Sobrancelha com Henna", duracao: "45 min", preco: 50.0 },
    { id: "2", nome: "Manicure + Pedicure Completa", duracao: "90 min", preco: 70.0 },
    { id: "3", nome: "Lash Lifting Cílios", duracao: "60 min", preco: 120.0 },
  ];

  const horariosDisponiveis = ["09:00", "10:30", "14:00", "15:30", "17:00"];

  const confirmarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    setSucesso(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 flex flex-col items-center">
      <header className="max-w-md w-full py-4 text-center border-b border-slate-800 mb-6">
        <div className="flex justify-center items-center gap-2">
          <Sparkles className="text-pink-500" size={24} />
          <h1 className="text-xl font-extrabold text-white">Studio Beleza</h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">Escolha o serviço e agende seu horário online</p>
      </header>

      <main className="max-w-md w-full space-y-6 pb-8">
        {sucesso ? (
          <div className="bg-slate-800 p-6 rounded-2xl border border-emerald-500/40 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <Check size={28} />
            </div>
            <h2 className="text-lg font-bold text-white">Agendamento Solicitado!</h2>
            <p className="text-xs text-slate-300">
              Obrigada! Enviamos a confirmação do seu horário para o WhatsApp do Studio Beleza.
            </p>
            <button
              onClick={() => { setSucesso(false); setServicoSelecionado(null); setHorarioSelecionado(null); }}
              className="text-xs text-pink-400 underline font-bold"
            >
              Fazer outro agendamento
            </button>
          </div>
        ) : (
          <>
            {/* 1. Escolha do Serviço */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">1. Selecione o Serviço</h2>
              <div className="space-y-2">
                {servicos.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setServicoSelecionado(s.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      servicoSelecionado === s.id
                        ? "bg-pink-500/10 border-pink-500 ring-1 ring-pink-500"
                        : "bg-slate-800/80 border-slate-700/80 hover:border-slate-600"
                    }`}
                  >
                    <div>
                      <h3 className="font-bold text-sm text-white">{s.nome}</h3>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock size={12} /> {s.duracao}
                      </span>
                    </div>
                    <span className="font-extrabold text-sm text-pink-400">R$ {s.preco.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Horários */}
            {servicoSelecionado && (
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">2. Horários Disponíveis Hoje</h2>
                <div className="grid grid-cols-3 gap-2">
                  {horariosDisponiveis.map((hora) => (
                    <button
                      key={hora}
                      onClick={() => setHorarioSelecionado(hora)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        horarioSelecionado === hora
                          ? "bg-pink-500 border-pink-500 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Confirmação */}
            {servicoSelecionado && horarioSelecionado && (
              <form onSubmit={confirmarAgendamento} className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 space-y-3">
                <h2 className="text-xs font-bold text-slate-300">Seus Dados para Contato</h2>
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Seu Nome Completo"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Seu WhatsApp (Ex: 11 99999-9999)"
                    className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex justify-center items-center gap-2"
                >
                  <Calendar size={16} /> Confirmar Agendamento
                </button>
              </form>
            )}
          </>
        )}
      </main>
    </div>
  );
}
