"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function AgendaGeralPage() {
  const [dataAtual, setDataAtual] = useState(new Date());

  // Gerador simples de dias do mês atual
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();

  const diasArray = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  const espacosIniciais = Array.from({ length: primeiroDiaSemana }, (_, i) => i);

  const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Visão Geral da Agenda</h1>
            <p className="text-sm text-gray-500">Acompanhamento mensal de atendimentos</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDataAtual(new Date(ano, mes - 1, 1))}
              className="px-3 py-1.5 border rounded-lg hover:bg-white"
            >
              Anterior
            </button>
            <span className="font-bold text-gray-700">{nomesMeses[mes]} {ano}</span>
            <button
              onClick={() => setDataAtual(new Date(ano, mes + 1, 1))}
              className="px-3 py-1.5 border rounded-lg hover:bg-white"
            >
              Próximo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-4 text-sm">
            <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {espacosIniciais.map((e) => (
              <div key={`espaco-${e}`} className="h-24 bg-gray-50/50 rounded-lg"></div>
            ))}
            {diasArray.map((dia) => (
              <div
                key={dia}
                className="h-24 border border-gray-100 rounded-lg p-2 hover:border-pink-300 transition-colors bg-white flex flex-col justify-between"
              >
                <span className="font-bold text-sm text-gray-700">{dia}</span>
                <span className="text-[11px] text-pink-600 bg-pink-50 rounded px-1 text-center font-medium">
                  Atendimentos
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
