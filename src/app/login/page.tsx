"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Sparkles, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function TelaLogin() {
  const router = useRouter();
  const [tipoConta, setTipoConta] = useState<"PROFISSIONAL" | "CLIENTE">("PROFISSIONAL");
  const [isCadastro, setIsCadastro] = useState(false);

  // Estados dos Campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estados de Feedback de Validação
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    // Validações básicas de preenchimento
    if (!email || !senha || (isCadastro && !nome)) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    setCarregando(true);

    // Simulação do Login / Cadastro
    setTimeout(() => {
      setCarregando(false);

      if (isCadastro) {
        setSucesso("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => {
          if (tipoConta === "PROFISSIONAL") {
            router.push("/dashboard/perfil");
          } else {
            router.push("/studio-piloto");
          }
        }, 1200);
      } else {
        // Validação de teste de login
        if (email.includes("@") && senha === "123456") {
          setSucesso("Login realizado com sucesso!");
          setTimeout(() => {
            if (tipoConta === "PROFISSIONAL") {
              router.push("/dashboard");
            } else {
              router.push("/studio-piloto");
            }
          }, 1000);
        } else {
          setErro("E-mail ou senha incorretos. Tente novamente (Dica de teste: senha '123456').");
        }
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
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

        {/* Seletor Tipo de Conta */}
        <div className="bg-slate-800 p-1 rounded-xl flex gap-1 border border-slate-700">
          <button
            type="button"
            onClick={() => { setTipoConta("PROFISSIONAL"); setErro(""); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tipoConta === "PROFISSIONAL" ? "bg-pink-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            💅 Sou Profissional
          </button>
          <button
            type="button"
            onClick={() => { setTipoConta("CLIENTE"); setErro(""); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tipoConta === "CLIENTE" ? "bg-pink-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            🙋‍♀️ Sou Cliente
          </button>
        </div>

        {/* Mensagens de Alerta */}
        {erro && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{erro}</span>
          </div>
        )}

        {sucesso && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{sucesso}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isCadastro && (
            <div>
              <label className="text-xs text-slate-300 block mb-1">
                {tipoConta === "PROFISSIONAL" ? "Nome do Studio / Profissional" : "Seu Nome Completo"}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3.5 text-slate-500" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold p-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition-all mt-4"
          >
            {carregando
              ? "Aguarde..."
              : isCadastro
              ? "Finalizar Cadastro"
              : "Entrar no Sistema"}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Toggle Login x Cadastro */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => { setIsCadastro(!isCadastro); setErro(""); setSucesso(""); }}
            className="text-xs text-slate-400 hover:text-pink-400 font-semibold"
          >
            {isCadastro
              ? "Já possui uma conta? Faça login"
              : "Não tem conta? Cadastre-se gratuitamente"}
          </button>
        </div>
      </div>
    </div>
  );
}
