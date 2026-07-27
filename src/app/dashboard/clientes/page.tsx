"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Users, Search, Plus, Edit2, Phone, X } from "lucide-react";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  totalAgendamentos: number;
  observacao: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: "1", nome: "Amanda Silva", telefone: "(11) 98888-8888", totalAgendamentos: 5, observacao: "Alergia leve a esmalte de gel" },
    { id: "2", nome: "Carla Santos", telefone: "(11) 97777-7777", totalAgendamentos: 2, observacao: "Gosta de sobrancelha bem marcada" },
    { id: "3", nome: "Juliana Mendes", telefone: "(11) 96666-6666", totalAgendamentos: 8, observacao: "Cliente assídua - Manicure" },
  ]);

  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  // Form State
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [observacao, setObservacao] = useState("");

  const abrirParaCriar = () => {
    setEditandoId(null);
    setNome("");
    setTelefone("");
    setObservacao("");
    setModalAberto(true);
  };

  const abrirParaEditar = (c: Cliente) => {
    setEditandoId(c.id);
    setNome(c.nome);
    setTelefone(c.telefone);
    setObservacao(c.observacao);
    setModalAberto(true);
  };

  const salvarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (editandoId) {
      setClientes((prev) =>
        prev.map((c) => (c.id === editandoId ? { ...c, nome, telefone, observacao } : c))
      );
    } else {
      const novo: Cliente = {
        id: Date.now().toString(),
        nome,
        telefone,
        totalAgendamentos: 0,
        observacao,
      };
      setClientes([...clientes, novo]);
    }
    setModalAberto(false);
  };

  const filtrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Base de Clientes 👥</h1>
            <p className="text-xs text-slate-500">Cadastre e edite as informações das suas clientes</p>
          </div>
          <button
            onClick={abrirParaCriar}
            className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-95 transition-all"
          >
            <Plus size={16} /> Cadastrar Cliente
          </button>
        </header>

        {/* Busca */}
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Buscar por nome da cliente..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500 bg-white"
          />
        </div>

        {/* Lista */}
        <div className="space-y-3 pb-12">
          {filtrados.map((c) => (
            <div key={c.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-slate-800">{c.nome}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Phone size={12} /> {c.telefone}
                </p>
                {c.observacao && (
                  <p className="text-[11px] text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md inline-block">
                    {c.observacao}
                  </p>
                )}
              </div>

              <button
                onClick={() => abrirParaEditar(c)}
                className="p-2 text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all"
                title="Editar Cliente"
              >
                <Edit2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-slate-800">
                {editandoId ? "Editar Cliente" : "Novo Cliente"}
              </h3>
              <button onClick={() => setModalAberto(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={salvarCliente} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp / Telefone</label>
                <input
                  type="text"
                  required
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Observações / Preferências</label>
                <textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  rows={2}
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
