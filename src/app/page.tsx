import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 px-3 py-1.5 rounded-full text-xs font-bold mb-4">
        <Sparkles size={14} /> Agendai SaaS
      </div>
      <h1 className="text-4xl font-extrabold mb-2 text-pink-500">Agendai 👋</h1>
      <p className="text-slate-400 mb-8 max-w-sm text-sm">
        Sistema de agendamento simples e inteligente para profissionais de beleza e estética.
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {/* Botão Principal enviando para a Tela de Login */}
        <Link
          href="/login"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-pink-500/20 transition-all flex items-center justify-center gap-2 text-sm"
        >
          Entrar / Cadastrar Espaço
          <ArrowRight size={16} />
        </Link>

        {/* Link para ver a demonstração da cliente */}
        <Link
          href="/studio-espaco-beleza"
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-3 px-6 rounded-xl border border-slate-700 transition-all text-xs"
        >
          Ver Demonstração de Agendamento (Cliente)
        </Link>
      </div>
    </main>
  );
}
