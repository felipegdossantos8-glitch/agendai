"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, Edit2, Calendar as CalendarIcon, Clock, X, Check } from "lucide-react";

interface Agendamento {
  id: string;
  data: string;
  cliente: string;
  servico: string;
  horario: string;
  valor: number;
  status: string;
}

export default function PainelAgenda() {
  const [dataInicio, setDataInicio] = useState("2026-07-27");
  const [dataFim, setDataFim] = useState("2026-07-28");
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    { id: "1", data: "2026-07-27", cliente: "Amanda Silva", servico: "Design de Sobrancelha", horario: "09:00", valor: 40.0, status: "Agendado" },
    { id: "2", data: "2026-07-27", cliente: "Carla Santos", servico: "Lash Lifting + Henna", horario: "10:30", valor: 180.0, status: "Confirmado" },
    { id: "3", data: "2026-07-28", cliente: "Juliana Mendes", servico: "Manicure Tradicional", horario: "14:00", valor: 35.0, status: "Agendado" },
  ]);

  // Form State
  const [cliente, setCliente] = useState("");
  const [servico, setServico] = useState("");
  const [data, setData] = useState("2026-07-27");
  const [horario, setHorario] = useState("10:00");
  const [valor, setValor] = useState("50.00");

  const agendamentosFiltrados = agendamentos.filter(
    (a) => a.data >= dataInicio && a.data <= dataFim
  );

  const abrirModalParaCriar = () => {
    setEditandoId(null);
    setCliente("");
    setServico("");
    setData("2026-07-27");
    setHorario("10:00");
    setValor("50.00");
    setModalAberto(true);
  };

  const abrirModalParaEditar = (item: Agendamento) => {
    setEditandoId(item.id);
    setCliente(item.cliente);
    setServico(item.servico);
    setData(item.data);
    setHorario(item.horario);
    setValor(item.valor.toString());
    setModalAberto(true);
  };

  const salvarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId) {
      setAgendamentos((prev) =>
        prev.map((a) =>
          a.id === editandoId
            ? { ...a, cliente, servico, data, horario, valor: parseFloat(valor) || 0 }
            : a
        )
      );
    } else {
      const novo: Agendamento = {
        id: Date.now().toString(),
        cliente,
        servico,
        data,
        horario,
        valor: parseFloat(valor) || 0,
        status: "Agendado",
      };
      setAgendamentos([...agendamentos, novo]);
    }
    setModalAberto(false);
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Agenda do Dia 📅</h1>
            <p className="text-xs text-slate-500">Gerencie e edite os horários marcados</p>
          </div>
          <button
            onClick={abrirModalParaCriar}
            className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-95 transition-all"
          >
            <Plus size={16} />
            Novo Agendamento
          </button>
        </header>

        {/* Filtro por Intervalo */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Data Inicial</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
            />
          </div>
          <div className="flex-1 min-w-[130px]">
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Data Final</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Lista de Atendimentos */}
        <div className="space-y-3 pb-12">
          {agendamentosFiltrados.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border text-xs text-slate-400">
              Nenhum agendamento encontrado no período selecionado.
            </div>
          ) : (
            agendamentosFiltrados.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                      {item.data} às {item.horario}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-800">{item.cliente}</h3>
                  <p className="text-xs text-slate-500">{item.servico}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-xs text-slate-700">R$ {item.valor.toFixed(2)}</span>
                  <button
                    onClick={() => abrirModalParaEditar(item)}
                    className="p-2 text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all"
                    title="Editar Agendamento"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal para Agendar / Editar */}
      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-slate-800">
                {editandoId ? "Editar Agendamento" : "Novo Agendamento"}
              </h3>
              <button onClick={() => setModalAberto(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={salvarAgendamento} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nome da Cliente</label>
                <input
                  type="text"
                  required
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  placeholder="Ex: Maria Oliveira"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Serviço</label>
                <input
                  type="text"
                  required
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                  placeholder="Ex: Manicure + Pedicure"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Horário</label>
                  <input
                    type="time"
                    required
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-pink-500 hover:bg-pink-600 shadow-md shadow-pink-500/20"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
