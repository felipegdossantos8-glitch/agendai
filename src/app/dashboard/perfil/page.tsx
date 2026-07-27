"use client";

import { useState } from "react";
import { MapPin, Save, Copy, Check, Sparkles, Phone, CheckCircle2 } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function PerfilProfissional() {
  const [copiado, setCopiado] = useState(false);
  const [salvoComSucesso, setSalvoComSucesso] = useState(false);
  
  const [formData, setFormData] = useState({
    nomeStudio: "Studio Piloto Beleza",
    slug: "studio-piloto",
    telefoneWhatsapp: "5511999999999",
    endereco: "Rua Exemplo, 100 - Centro, Jundiaí/SP",
    descricaoEspaco: "Atendimento personalizado de sobrancelhas e cílios em ambiente climatizado.",
  });

  const linkPersonalizado = `https://agendai.vercel.app/${formData.slug}`;

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedSlug = rawValue
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-");

    setFormData({ ...formData, slug: formattedSlug });
  };

  const copiarLink = () => {
    navigator.clipboard.writeText(linkPersonalizado);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const salvarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvoComSucesso(true);
    setTimeout(() => setSalvoComSucesso(false), 3000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 pb-24 text-slate-800">
      {/* Header com Sidebar */}
      <header className="flex items-center gap-3 mb-6 bg-slate-900 text-white p-4 rounded-2xl shadow-sm">
        <Sidebar />
        <div>
          <h1 className="text-lg font-bold">Perfil do Espaço ⚙️</h1>
          <p className="text-xs text-slate-400">Dados do studio e link oficial</p>
        </div>
      </header>

      {/* Alerta de Sucesso ao Salvar */}
      {salvoComSucesso && (
        <div className="bg-emerald-500 text-white p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-4 shadow">
          <CheckCircle2 size={16} /> Alterações salvas com sucesso!
        </div>
      )}

      {/* Box do Link Personalizado */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm mb-6 border border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-pink-400 text-xs font-bold">
          <Sparkles size={16} /> Seu Link de Agendamento
        </div>
        <div className="bg-slate-800 p-2.5 rounded-xl flex items-center justify-between gap-2 border border-slate-700 text-xs font-mono">
          <span className="truncate text-pink-300">{linkPersonalizado}</span>
          <button
            onClick={copiarLink}
            className="bg-pink-500 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-pink-600 transition-all shrink-0"
          >
            {copiado ? <Check size={14} /> : <Copy size={14} />}
            {copiado ? "Copiado" : "Copiar"}
          </button>
        </div>
      </div>

      <form onSubmit={salvarPerfil} className="space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nome do Espaço / Profissional
            </label>
            <input
              type="text"
              value={formData.nomeStudio}
              onChange={(e) => setFormData({ ...formData, nomeStudio: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Link Personalizado (Slug)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={handleSlugChange}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none font-mono text-pink-600"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              WhatsApp para Lembretes
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                value={formData.telefoneWhatsapp}
                onChange={(e) => setFormData({ ...formData, telefoneWhatsapp: e.target.value })}
                className="w-full p-3 pl-10 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Endereço Completo
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                value={formData.endereco}
                onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                className="w-full p-3 pl-10 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Descrição do Espaço
            </label>
            <textarea
              value={formData.descricaoEspaco}
              onChange={(e) => setFormData({ ...formData, descricaoEspaco: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm h-20 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:bg-pink-600 transition-all"
        >
          <Save size={18} /> Salvar Alterações
        </button>
      </form>
    </div>
  );
}
