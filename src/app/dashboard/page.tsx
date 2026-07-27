"use client";

import { useState } from "react";
import { CheckCircle2, MessageSquare, Clock, Plus } from "lucide-react";

const AGENDAMENTOS_HOJE_MOCK = [
  { id: "1", nomeCliente: "Amanda Silva", servico: "Design de Sobrancelha", horario: "09:00 - 09:30", preco: 40.0, status: "CONFIRMADO", telefone: "5511988888888" },
  { id: "2", nomeCliente: "Carla Santos", servico: "Lash Lifting + Henna", horario: "10:00 - 11:15", preco: 180.0, status: "AGENDADO", telefone: "5511977777777" },
  { id: "3", nomeCliente: "Beatriz Lima", servico: "Manicure Tradicional", horario: "14:00 - 14:40", preco: 35.0, status: "CONCLUIDO", telefone: "5511966666666" },
];

export default function PainelProfissional() {
  const [agendamentos, setAgendamentos] = useState(AGENDAMENTOS_HOJE_MOCK);

  const enviarLembreteWhatsApp = (telefone: string, nomeCliente: string, horario: string) => {
    const texto = `Olá ${nomeCliente}! Passando para lembrar do seu atendimento hoje às ${horario}. Confirmado?`;
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`, "_blank");
  };

  const marcarComoConcluido = (id: string) => {
    setAgendamentos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "CONCLUIDO" } : item))
    );
  };

  const faturadoHoje = agendamentos
    .filter((a) => a.status === "CONCLUIDO")
    .reduce((acc, curr) => acc + curr.preco, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 pb-20 text-slate-800">
      <div className="bg-slate-900 text-white p-5 rounded-b-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-lg font-bold">Agendai 👋</h1>
            <p className="text-xs text-slate-400">Sua agenda de hoje</p>
          </div>
          <button className="bg-pink-500 text-white p-2 rounded-full shadow">
            <Plus size={20} />
          </button>
        </div>

        <div className="bg-slate-800/80 rounded-xl p-3 flex justify-between items-center border border-slate-700">
          <div>
            <span className="text-xs text-slate-400 block">Concluído Hoje</span>
            <span className="text-xl font-bold text-emerald-400">R$ {faturadoHoje.toFixed(2)}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Atendimentos</span>
            <span className="text-sm font-semibold text-slate-200">
              {agendamentos.filter((a) => a.status === "CONCLUIDO").length} de {agendamentos.length}
            </span>
          </div>
        </div>
      </div>

      <main className="p-4 space-y-3">
        {agendamentos.map((item) => {
          const estaConcluido = item.status === "CONCLUIDO";
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border bg-white shadow-sm flex flex-col gap-3 ${
                estaConcluido ? "opacity-75 border-slate-200" : "border-slate-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md mb-1">
                    <Clock size={12} /> {item.horario}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base">{item.nomeCliente}</h3>
                  <p className="text-xs text-slate-600">{item.servico}</p>
                </div>
                <span className="font-bold text-slate-700">R$ {item.preco.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                {!estaConcluido ? (
                  <>
                    <button
                      onClick={() => enviarLembreteWhatsApp(item.telefone, item.nomeCliente, item.horario.split(" - ")[0])}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1 hover:bg-emerald-100"
                    >
                      <MessageSquare size={14} /> Lembrete Whats
                    </button>
                    <button
                      onClick={() => marcarComoConcluido(item.id)}
                      className="flex-1 py-2 px-3 rounded-lg bg-pink-500 text-white font-semibold text-xs flex items-center justify-center gap-1 hover:bg-pink-600 shadow-sm"
                    >
                      <CheckCircle2 size={14} /> Finalizar
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Atendimento Concluído
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
