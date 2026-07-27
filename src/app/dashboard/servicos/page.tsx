"use client";

import { useState } from "react";
import { Plus, Copy, Check, Edit2, Trash2, Sparkles, X } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function GestaoServicos() {
  const [copiado, setCopiado] = useState(false);
  const [slug] = useState("studio-piloto");
  
  const [servicos, setServicos] = useState([
    { id: "1", nome: "Design de Sobrancelha Simples", duracao: 30, preco: 40.0, descricao: "Modelagem com pinça e alinhamento." },
    { id: "2", nome: "Design com Henna", duracao: 45, preco: 60.0, descricao: "Aplicação de henna com alta fixação." },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [servicoEmEdicao, setServicoEmEdicao] = useState<any>(null);

  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState(30);
  const [preco, setPreco] = useState<number | string>("");
  const [descricao, setDescricao] = useState("");

  const abrirModalParaCriar = () => {
    setServicoEmEdicao(null);
    setNome("");
    setDuracao(30);
    setPreco("");
    setDescricao("");
    setModalAberto(true);
  };

  const abrirModalParaEditar = (servico: any) => {
    setServicoEmEdicao(servico);
    setNome(servico.nome);
    setDuracao(servico.duracao);
    setPreco(servico.preco);
    setDescricao(servico.descricao || "");
    setModalAberto(true);
  };

  const salvarServico = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !preco) return;

    const precoNum = typeof preco === "string" ? parseFloat(preco) : preco;

    if (servicoEmEdicao) {
      setServicos((prev) =>
        prev.map((item) =>
          item.id === servicoEmEdicao.id
            ? { ...item, nome, duracao: Number(duracao), preco: precoNum, descricao }
            : item
        )
      );
    } else {
      const novo = {
        id: Date.now().toString(),
        nome,
        duracao: Number(duracao),
        preco: precoNum,
        descricao,
      };
      setServicos((prev) => [...prev, novo]);
    }

    setModalAberto(false);
  };

  const excluirServico = (id: string) => {
    setServicos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 pb-24 text-slate-800">
      {/* Header com Sidebar */}
      <header className="flex items-center justify-between mb-6 bg-slate-900 text-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <Sidebar slug={slug} />
          <div>
            <h1 className="text-lg font-bold">Gerenciar Serviços 💅</h1>
            <p className="text-xs text-slate-400">Cardápio do seu espaço</p>
          </div>
        </div>
        <button
          onClick={abrirModalParaCriar}
          className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow"
        >
          <Plus size={16} /> Criar
        </button>
      </header>

      {/* Lista de Serviços */}
      <div className="space-y-3">
        {servicos.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{item.nome}</h3>
              <p className="text-xs text-slate-500">{item.duracao} min • R$ {Number(item.preco).toFixed(2)}</p>
              {item.descricao && <p className="text-xs text-slate-400 mt-1">{item.descricao}</p>}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => abrirModalParaEditar(item)} className="p-2 text-slate-500 hover:text-pink-500 rounded-lg hover:bg-slate-50">
                <Edit2 size={16} />
              </button>
              <button onClick={() => excluirServico(item.id)} className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Criação/Edição */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={salvarServico} className="bg-white rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">{servicoEmEdicao ? "Editar Serviço" : "Novo Serviço"}</h3>
              <button type="button" onClick={() => setModalAberto(false)} className="text-slate-400"><X size={18} /></button>
            </div>

            <input
              type="text"
              placeholder="Nome do Serviço"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-pink-500"
            />

            <div className="grid grid-cols-2 gap-2">
              {/* Campo Preço com R$ fixo na frente */}
              <div className="relative">
                <span className="absolute left-3 top-3 text-sm text-slate-400 font-bold">R$</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                  className="w-full p-3 pl-9 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Campo Duração com 'min' no final */}
              <div className="relative">
                <input
                  type="number"
                  placeholder="30"
                  value={duracao}
                  onChange={(e) => setDuracao(Number(e.target.value))}
                  required
                  className="w-full p-3 pr-11 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-pink-500"
                />
                <span className="absolute right-3 top-3 text-xs text-slate-400 font-bold">min</span>
              </div>
            </div>

            <textarea
              placeholder="Descrição adicional (opcional)"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm h-20 focus:outline-none focus:border-pink-500"
            />

            <div className="flex gap-2">
              <button type="button" onClick={() => setModalAberto(false)} className="flex-1 py-2.5 rounded-xl border text-xs font-bold text-slate-600">Cancelar</button>
              <button type="submit" className="flex-1 py-2.5 rounded-xl bg-pink-500 text-white text-xs font-bold shadow">Salvar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
