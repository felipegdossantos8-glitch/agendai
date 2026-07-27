"use client";

import { useState } from "react";
import { Plus, Copy, Check, Edit2, Trash2, Link as LinkIcon, Sparkles } from "lucide-react";

export default function GestaoServicos() {
  const [copiado, setCopiado] = useState(false);
  const [slug, setSlug] = useState("studio-espaco-beleza");
  
  const [servicos, setServicos] = useState([
    { id: "1", nome: "Design de Sobrancelha Simples", duracao: 30, preco: 40.0, descricao: "Modelagem com pinça e alinhamento." },
    { id: "2", nome: "Design com Henna", duracao: 45, preco: 60.0, descricao: "Aplicação de henna com alta fixação." },
  ]);

  const [novoServico, setNovoServico] = useState({ nome: "", duracao: 30, preco: 0, descricao: "" });
  const [mostrarModal, setMostrarModal] = useState(false);

  const linkPersonalizado = `https://agendai.vercel.app/${slug}`;

  const copiarLink = () => {
    navigator.clipboard.writeText(linkPersonalizado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const adicionarServico = () => {
    if (!novoServico.nome || !novoServico.preco) return;
    setServicos([...servicos, { ...novoServico, id: Date.now().toString() }]);
    setNovoServico({ nome: "", duracao: 30, preco: 0, descricao: "" });
    setMostrarModal(false);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 pb-20 text-slate-800">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Meus Serviços & Link 💅</h1>
        <p className="text-xs text-slate-500">Configure o cardápio que suas clientes verão</p>
      </header>

      {/* Card do Link da Bio / WhatsApp */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-2xl text-white shadow-md mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} />
          <span className="font-bold text-sm">Seu Link de Agendamento</span>
        </div>
        <p className="text-xs text-pink-100 mb-3">Cole este link na Bio do seu Instagram e WhatsApp:</p>
        <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl flex items-center justify-between gap-2 border border-white/30 text-xs">
          <span className="truncate font-mono">{linkPersonalizado}</span>
          <button
            onClick={copiarLink}
            className="bg-white text-pink-600 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shadow-sm hover:bg-pink-50 transition-all shrink-0"
          >
            {copiado ? <Check size={14} /> : <Copy size={14} />}
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>

      {/* Lista de Serviços */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-slate-800">Serviços Cadastrados ({servicos.length})</h2>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-pink-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
        >
          <Plus size={16} /> Criar Serviço
        </button>
      </div>

      <div className="space-y-3">
        {servicos.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">{item.nome}</h3>
              <p className="text-xs text-slate-500">{item.duracao} min • R$ {item.preco.toFixed(2)}</p>
              {item.descricao && <p className="text-xs text-slate-400 mt-1">{item.descricao}</p>}
            </div>
            <div className="flex items-center gap-2">
              <button className="text-slate-400 hover:text-slate-600"><Edit2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Cadastro de Serviço */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm space-y-4">
            <h3 className="font-bold text-slate-900">Novo Serviço</h3>
            <input
              type="text"
              placeholder="Nome do serviço (ex: Lash Lifting)"
              value={novoServico.nome}
              onChange={(e) => setNovoServico({ ...novoServico, nome: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Preço (R$)"
                onChange={(e) => setNovoServico({ ...novoServico, preco: parseFloat(e.target.value) })}
                className="p-3 rounded-xl border border-slate-200 text-sm"
              />
              <input
                type="number"
                placeholder="Duração (min)"
                value={novoServico.duracao}
                onChange={(e) => setNovoServico({ ...novoServico, duracao: parseInt(e.target.value) })}
                className="p-3 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <textarea
              placeholder="Descrição adicional (opcional)"
              value={novoServico.descricao}
              onChange={(e) => setNovoServico({ ...novoServico, descricao: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm h-20"
            />
            <div className="flex gap-2">
              <button onClick={() => setMostrarModal(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-bold text-slate-600">Cancelar</button>
              <button onClick={adicionarServico} className="flex-1 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-bold shadow">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
