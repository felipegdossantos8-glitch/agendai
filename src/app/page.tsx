import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold mb-2 text-pink-500">Agendai 👋</h1>
      <p className="text-slate-400 mb-8 max-w-sm">
        Sistema de agendamento simples para profissionais de beleza e estética.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/dashboard"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow transition-all"
        >
          Painel da Profissional
        </Link>
        <Link
          href="/studio-beleza"
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-6 rounded-xl border border-slate-700 transition-all"
        >
          Página de Agendamento (Cliente)
        </Link>
      </div>
    </main>
  );
}
