"use "use client";

import { useState } from "react";
import Link from "next/link";
import { User, Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export default function TelaLogin() {
  const [tipoConta, setTipoConta] = useState<"PROFISSIONAL" | "CLIENTE">("PROFISSIONAL");
  const [isCadastro, setIsCadastro] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo e Boas-Vindas */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-full text-xs font-bold">
            <Sparkles size={14} /> Agendai SaaS
          </div>
          <h1 className="text-2xl font-bold">
            {isCadastro ? "Criar sua Conta" : "Acessar o Agendai"}
          </h1>
          <p className="text-xs text-slate-400">
            {isCadastro
              ? "Cadastre-se para gerenciar seus horários ou agendar"
              : "Entre com seus dados para continuar"}
          </p>
        </div>

        {/* Selector do Tipo de Usuario */}
        <div className="bg-slate-800 p-1 rounded-xl flex gap-1 border border-slate-700">
          <button
            onClick={() => setTipoConta("PROFISSIONAL")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tipoConta === "PROFISSIONAL"
                ? "bg-pink-500 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            💅 Sou Profissional
          </button>
          <button
            onClick={() => setTipoConta("CLIENTE")}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tipoConta === "CLIENTE"
                ? "bg-pink-500 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🙋‍♀️ Sou Cliente
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
          {isCadastro && (
            <div>
              <label className="text-xs text-slate-300 block mb-1">
                {tipoConta === "PROFISSIONAL" ? "Nome do Studio / Profissional" : "Seu Nome Completo"}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder={tipoConta === "PROFISSIONAL" ? "Ex: Studio Maria Beleza" : "Ex: Ana Silva"}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-300 block mb-1">E-mail</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3.5 text-slate-500" />
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3.5 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <Link
            href={tipoConta === "PROFISSIONAL" ? "/dashboard" : "/studio-espaco-beleza"}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold p-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition-all mt-4"
          >
            {isCadastro ? "Finalizar Cadastro" : "Entrar no Sistema"}
            <ArrowRight size={16} />
          </Link>
        </form>

        {/* Toggle entre Login e Cadastro */}
        <div className="text-center pt-2">
          <button
            onClick={() => setIsCadastro(!isCadastro)}
            className="text-xs text-slate-400 hover:text-pink-400 font-semibold"
          >
            {isCadastro ? "Já possui uma conta? Faça login" : "Não tem conta? Cadastre-se gratuitamente"}
          </button>
        </div>
      </div>
    </div>
  );
}
