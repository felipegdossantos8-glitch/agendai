"use client";

import { useState } from "react";
import { Check, Calendar, User, Sparkles } from "lucide-react";

const SERVICOS_MOCK = [
  { id: "1", nome: "Design de Sobrancelha Simples", duracao: 30, preco: 40.0 },
  { id: "2", nome: "Design de Sobrancelha com Henna", duracao: 45, preco: 60.0 },
  { id: "3", nome: "Lash Lifting", duracao: 60, preco: 120.0 },
  { id: "4", nome: "Manicure Tradicional", duracao: 40, preco: 35.0 },
];

const HORARIOS_DISPONIVEIS = ["09:00", "10:00", "11:15", "14:00", "15:30", "17:00"];

export default function PaginaAgendamentoCliente() {
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState("2026-08-01");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");

  const alternarServico = (id: string) => {
    setServicosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const precoTotal = SERVICOS_MOCK.filter((s) => servicosSelecionados.includes(s.id)).reduce(
    (acc, curr) => acc + curr.preco,
    0
  );

  const duracaoTotal = SERVICOS_MOCK.filter((s) => servicosSelecionados.includes(s.id)).reduce(
    (acc, curr) => acc + curr.duracao,
    0
  );

  const finalizarAgendamento = () => {
    const nomesServicos = SERVICOS_MOCK.filter((s) => servicosSelecionados.includes(s.id))
      .map((s) => s.nome)
      .join(", ");

    const texto = `Olá! Gostaria de agendar pelo Agendai:\n\n` +
      `💅 *Serviços:* ${nomesServicos}\n` +
      `📅 *Data:* ${dataSelecionada}\n` +
      `⏰ *Horário:* ${horarioSelecionado}\n` +
      `👤 *Nome:* ${nomeCliente}\n` +
      `💰 *Total:* R$ ${precoTotal.toFixed(2)}`;

    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(texto)}`, "_blank");
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-24 text-slate-800">
      <header className="bg-gradient-to-r from-pink-500 to-rose-400 p-6 text-white text-center rounded-b-3xl shadow-sm">
        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 border-2 border-white shadow flex items-center justify-center text-pink-500 font-bold text-2xl">
          E
        </div>
        <h1 className="text-xl font-bold">Studio Espaço Beleza</h1>
        <p className="text-pink-100 text-sm mt-1">Design de Sobrancelhas & Estética</p>
      </header>

      <main className="p-4 space-y-6">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1">
            <Sparkles size={16} className="text-pink-500" /> 1. Escolha os Serviços
          </h2>
          <div className="space-y-2">
            {SERVICOS_MOCK.map((servico) => {
              const estaSelecionado = servicosSelecionados.includes(servico.id);
              return (
                <div
                  key={servico.id}
                  onClick={() => alternarServico(servico.id)}
                  className={`p-4 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                    estaSelecionado ? "border-pink-500 bg-pink-50 shadow-sm" : "border-slate-200 bg-white"
                  }`}
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">{servico.nome}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{servico.duracao} minutos</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-pink-600 block">R$ {servico.preco.toFixed(2)}</span>
                    <span className={`inline-block w-5 h-5 rounded-full border mt-1 ${estaSelecionado ? "bg-pink-500 border-pink-500 text-white" : "border-slate-300"}`}>
                      {estaSelecionado && <Check size={14} className="mx-auto mt-0.5" />}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {servicosSelecionados.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1">
              <Calendar size={16} className="text-pink-500" /> 2. Data e Horário
            </h2>
            <input
              type="date"
              value={dataSelecionada}
              onChange={(e) => setDataSelecionada(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white mb-3 text-slate-700 font-medium"
            />
            <div className="grid grid-cols-3 gap-2">
              {HORARIOS_DISPONIVEIS.map((horario) => (
                <button
                  key={horario}
                  onClick={() => setHorarioSelecionado(horario)}
                  className={`py-2 px-3 rounded-lg border text-sm font-semibold transition-all ${
                    horarioSelecionado === horario ? "bg-pink-500 border-pink-500 text-white shadow" : "border-slate-200 bg-white text-slate-600"
                  }`}
                >
                  {horario}
                </button>
              ))}
            </div>
          </section>
        )}

        {horarioSelecionado && (
          <section className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
              <User size={16} className="text-pink-500" /> 3. Seus Dados
            </h2>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm"
            />
            <input
              type="tel"
              placeholder="Seu WhatsApp (com DDD)"
              value={telefoneCliente}
              onChange={(e) => setTelefoneCliente(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white text-sm"
            />
          </section>
        )}
      </main>

      {servicosSelecionados.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-4 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block">Total ({duracaoTotal} min)</span>
            <span className="text-lg font-bold text-slate-800">R$ {precoTotal.toFixed(2)}</span>
          </div>
          <button
            disabled={!horarioSelecionado || !nomeCliente}
            onClick={finalizarAgendamento}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl shadow transition-all flex items-center gap-2 text-sm"
          >
            Confirmar via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
