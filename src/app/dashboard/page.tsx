"use client";

import { useState } from "react";
import { CheckCircle2, MessageSquare, Clock, Plus, Star, AlertTriangle, UserX } from "lucide-react";
import Link from "next/link";
import Sidebar from "./components/Sidebar";

const AGENDAMENTOS_HOJE_MOCK = [
  { id: "1", nomeCliente: "Amanda Silva", servico: "Design de Sobrancelha", horario: "09:00 - 09:30", preco: 40.0, status: "CONFIRMADO", telefone: "5511988888888" },
  { id: "2", nomeCliente: "Carla Santos", servico: "Lash Lifting + Henna", horario: "10:00 - 11:15", preco: 180.0, status: "AGENDADO", telefone: "5511977777777" },
];

export default function PainelProfissional() {
  const [agendamentos, setAgendamentos] = useState(AGENDAMENTOS_HOJE_MOCK);
  const [modalAtendimento, setModalAtendimento] = useState<any>(null);
  
  // Estado do Pós-Atendimento
  const [teveAtraso, setTeveAtraso] = useState(false);
  const [notaCliente, setNotaCliente] = useState(5);
  const [faltou, setFaltou] = useState(false);

  const enviarLembreteWhatsApp = (telefone: string, nomeCliente: string, horario: string) => {
    const texto = `Olá ${nomeCliente}! Passando para lembrar do seu atendimento no Studio hoje às ${horario}. Confirmado?`;
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`, "_blank");
  };

  const abrirModalFinalizacao = (item: any) => {
    setTeveAtraso(false);
    setNotaCliente(5);
    setFaltou(false);
    setModalAtendimento(item);
  };

  const salvarFinalizacao = () => {
    setAgendamentos((prev) =>
      prev.map((item) =>
        item.id === modalAtendimento.id
          ? { ...item, status: faltou ? "FALTOU" : "CONCLUIDO" }
          : item
      )
    );
    setModalAtendimento(null);
  };

  const faturadoHoje = agendamentos
    .filter((a) => a.status === "CONCLUIDO")
    .reduce((acc, curr) => acc + curr.preco, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 pb-24 text-slate-800">
      {/* Topo do Painel com Menu Lateral */}
      <div className="bg-slate-900 text-white p-5 rounded-b-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {/* Componente Sidebar Integrado */}
            <Sidebar slug="studio-espaco-beleza" />
            <div>
              <h1 className="text-lg font-bold">Agendai 👋</h1>
              <p className="text-xs text-slate-400">Sua agenda de hoje</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/servicos" className="bg-slate-800 text-xs px-3 py-2 rounded-xl border border-slate-700 font-semibold">
              Serviços
            </Link>
            <Link href="/dashboard/financeiro" className="bg-pink-500 text-white text-xs px-3 py-2 rounded-xl font-bold shadow">
              Caixa
            </Link>
          </div>
        </div>

        {/* Resumo do Caixa Diário */}
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

      {/* Lista de Atendimentos */}
      <main className="p-4 space-y-3">
        {agendamentos.map((item) => {
          const estaConcluido = item.status === "CONCLUIDO";
          const estaFaltou = item.status === "FALTOU";

          return (
            <div key={item.id} className="p-4 rounded-xl border bg-white shadow-sm flex flex-col gap-3">
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
                {!estaConcluido && !estaFaltou ? (
                  <>
                    <button
                      onClick={() => enviarLembreteWhatsApp(item.telefone, item.nomeCliente, item.horario.split(" - ")[0])}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1 hover:bg-emerald-100 transition-all"
                    >
                      <MessageSquare size={14} /> WhatsApp
                    </button>
                    <button
                      onClick={() => abrirModalFinalizacao(item)}
                      className="flex-1 py-2 px-3 rounded-lg bg-pink-500 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-sm hover:bg-pink-600 transition-all"
                    >
                      <CheckCircle2 size={14} /> Finalizar
                    </button>
                  </>
                ) : (
                  <span className={`text-xs font-bold ${estaFaltou ? 'text-rose-500' : 'text-emerald-600'}`}>
                    {estaFaltou ? "❌ Cliente Faltou (No-Show)" : "✓ Atendimento Concluído"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* Modal de Pós-Atendimento & Qualificação da Cliente */}
      {modalAtendimento && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-xl">
            <h3 className="font-bold text-slate-900 text-base">Finalizar Atendimento</h3>
            <p className="text-xs text-slate-500">Cliente: <strong className="text-slate-800">{modalAtendimento.nomeCliente}</strong></p>

            <div className="space-y-3">
              {/* Opção No-Show */}
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-rose-50/50 transition-all">
                <input
                  type="checkbox"
                  checked={faltou}
                  onChange={(e) => setFaltou(e.target.checked)}
                  className="rounded text-pink-500 focus:ring-pink-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                  <UserX size={14} /> Cliente NÃO compareceu (Falta)
                </span>
              </label>

              {!faltou && (
                <>
                  {/* Opção de Atraso */}
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-amber-50/50 transition-all">
                    <input
                      type="checkbox"
                      checked={teveAtraso}
                      onChange={(e) => setTeveAtraso(e.target.checked)}
                      className="rounded text-pink-500 focus:ring-pink-500 h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <AlertTriangle size={14} className="text-amber-500" /> Teve atraso relevante?
                    </span>
                  </label>

                  {/* Avaliação em Estrelas */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Qualificação da Cliente:</label>
                    <div className="flex gap-2 justify-center py-1 bg-slate-50 rounded-xl border border-slate-100">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNotaCliente(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star size={24} className={star <= notaCliente ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalAtendimento(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={salvarFinalizacao}
                className="flex-1 py-2.5 rounded-xl bg-pink-500 text-white text-xs font-bold shadow hover:bg-pink-600 transition-all"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
