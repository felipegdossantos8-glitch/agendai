"use client";

import { useState } from "react";
import { MapPin, Link as LinkIcon, Save, Copy, Check, Sparkles, Phone } from "lucide-react";

export default function PerfilProfissional() {
  const [copiado, setCopiado] = useState(false);
  const [formData, setFormData] = useState({
    nomeStudio: "Studio Espaço Beleza",
    slug: "studio-espaco-beleza",
    telefoneWhatsapp: "5511999999999",
    endereco: "Rua das Flores, 123 - Sala 4 - Centro, Jundiaí/SP",
    descricaoEspaco: "Atendimento personalizado de sobrancelhas e cílios em ambiente climatizado.",
  });

  const linkPersonalizado = `https://agendai.vercel.app/${formData.slug}`;

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Converte nome em slug seguro (sem acentos nem espaços)
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

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 pb-24 text-slate-800">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Perfil & Link do Espaço ⚙️</h1>
        <p className="text-xs text-slate-500">
          Altere as informações do seu espaço que serão enviadas para as clientes
        </p>
      </header>

      {/* Box do Link Personalizado */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm mb-6 border border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-pink-400 text-xs font-bold">
          <Sparkles size={16} /> Seu Link de Agendamento
        </div>
        <p className="text-xs text-slate-400 mb-3">Este link altera automaticamente com o slug definido abaixo:</p>
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

      {/* Formulário de Configurações do Profissional */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
            <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 pl-3">
              <span className="text-xs text-slate-400 select-none">/</span>
              <input
                type="text"
                value={formData.slug}
                onChange={handleSlugChange}
                className="w-full p-3 bg-transparent text-sm focus:outline-none font-mono text-pink-600"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Gera a URL exclusiva do seu Instagram.
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              WhatsApp para Avisos
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
              Endereço Completo (Enviado no WhatsApp da cliente)
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
              Descrição / Recado Adicional
            </label>
            <textarea
              value={formData.descricaoEspaco}
              onChange={(e) => setFormData({ ...formData, descricaoEspaco: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm h-20 focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Prévia da Mensagem do WhatsApp */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-1">
          <span className="text-xs font-bold text-emerald-800 block">
            💬 Prévia do Lembrete com Endereço
          </span>
          <p className="text-xs text-emerald-900 font-mono bg-white/60 p-2.5 rounded-xl border border-emerald-100">
            Olá Ana! Seu agendamento para Design de Sobrancelha está confirmado para hoje às 14:00.<br />
            📍 <strong>Local:</strong> {formData.endereco}
          </p>
        </div>

        <button
          type="button"
          className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md hover:bg-pink-600 transition-all"
        >
          <Save size={18} /> Salvar Alterações
        </button>
      </form>
    </div>
  );
}
