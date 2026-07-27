"use client";

import { useState } from "react";
import { CheckCircle2, MessageSquare, Clock, Star, AlertTriangle, UserX, Calendar as CalendarIcon } from "lucide-react";
import Sidebar from "./components/Sidebar";

const AGENDAMENTOS_MOCK = [
  { id: "1", data: "2026-07-27", nomeCliente: "Amanda Silva", servico: "Design de Sobrancelha", horario: "09:00 - 09:30", preco: 40.0, status: "CONFIRMADO", telefone: "5511988888888" },
  { id: "2", data: "2026-07-27", nomeCliente: "Carla Santos", servico: "Lash Lifting + Henna", horario: "10:00 - 11:15", preco: 180.0, status: "AGENDADO", telefone: "5511977777777" },
  { id: "3", data: "2026-07-28", nomeCliente: "Juliana Mendes", servico: "Manicure Tradicional", horario: "14:00 - 14:40", preco: 35.0, status: "AGENDADO", telefone: "5511966666666" },
];

export default function PainelProfissional() {
  const [dataFiltro, setDataFiltro] = useState("2026-07-27");
  const [agendamentos, setAgendamentos] = useState(AGENDAMENTOS_MOCK);
  
  const [modalAtendimento, setModalAtendimento] = useState<any>(null);
  const [teveAtraso, setTeveAtraso] = useState(false);
  const [notaCliente, setNotaCliente] = useState(5);
  const [faltou, setFaltou] = useState(false);
  const [observacaoAtendimento, setObservacaoAtendimento] = useState("");

  const agendamentosFiltrados = agendamentos.filter((a) => a.data === dataFiltro);

  const enviarLembreteWhatsApp = (telefone: string, nomeCliente: string, horario: string) => {
    const texto = `Olá ${nomeCliente}! Passando para lembrar do seu atendimento no Studio hoje às ${horario}. Confirmado?`;
    window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(texto)}`, "_blank");
  };

  const abrirModalFinalizacao = (item: any) => {
    setTeveAtraso(false);
    setNotaCliente(5);
    setFaltou(false);
    setObservacaoAtendimento("");
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

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-100 pb-24 text-slate-800">
      {/* Topo do Painel com Sidebar e Filtro de Data */}
      <div className="bg-slate-900 text-white p-5 rounded-b-2xl shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sidebar slug="studio-piloto" />
            <div>
              <h1 className="text-lg font-bold">Agendai 👋</h1>
              <p className="text-xs text-slate-400">Agenda da Profissional</p>
            </div>
          </div>
        </div>

        {/* Filtro de Data Futura */}
        <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-xl border border-slate-700">
          <CalendarIcon size={16} className="text-pink-400 shrink-0" />
          <input
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            className="bg-transparent text-xs text-white font-bold w-full focus:outline-none"
          />
        </div>
      </div>

      {/* Lista de Atendimentos */}
      <main className="p-4 space-y-3">
        {agendamentosFiltrados.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            Nenhum agendamento para esta data.
          </div>
        ) : (
          agendamentosFiltrados.map((item) => {
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
                        className="flex-1 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 font-semibold text-xs flex items-center justify-center gap-1"
                      >
                        <MessageSquare size={14} /> WhatsApp
                      </button>
                      <button
                        onClick={() => abrirModalFinalizacao(item)}
                        className="flex-1 py-2 px-3 rounded-lg bg-pink-500 text-white font-semibold text-xs flex items-center justify-center gap-1 shadow-sm"
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
          })
        )}
      </main>

      {/* Modal de Finalização com Campo de Observações */}
      {modalAtendimento && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-xl">
            <h3 className="font-bold text-slate-900 text-base">Finalizar Atendimento</h3>
            <p className="text-xs text-slate-500">Cliente: <strong className="text-slate-800">{modalAtendimento.nomeCliente}</strong></p>

            <div className="space-y-3">
              <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer">
                <input type="checkbox" checked={faltou} onChange={(e) => setFaltou(e.target.checked)} className="rounded text-pink-500" />
                <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                  <UserX size={14} /> Cliente NÃO compareceu (Falta)
                </span>
              </label>

              {!faltou && (
                <>
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer">
                    <input type="checkbox" checked={teveAtraso} onChange={(e) => setTeveAtraso(e.target.checked)} className="rounded text-pink-500" />
                    <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <AlertTriangle size={14} className="text-amber-500" /> Teve atraso relevante?
                    </span>
                  </label>

                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Qualificação da Cliente:</label>
                    <div className="flex gap-2 justify-center py-1 bg-slate-50 rounded-xl border border-slate-100">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" onClick={() => setNotaCliente(star)} className="p-1">
                          <Star size={24} className={star <= notaCliente ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Campo de Observação Adicionado */}
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Observações / Ficha da Cliente:</label>
                    <textarea
                      placeholder="Ex: Prefere tom mais claro na sobrancelha, tem pele sensível."
                      value={observacaoAtendimento}
                      onChange={(e) => setObservacaoAtendimento(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs h-16 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setModalAtendimento(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">Cancelar</button>
              <button type="button" onClick={salvarFinalizacao} className="flex-1 py-2.5 rounded-xl bg-pink-500 text-white text-xs font-bold shadow">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
