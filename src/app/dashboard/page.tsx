"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  const [dataFiltro, setDataFiltro] = useState(new Date().toISOString().split("T")[0]);
  const [horaInicio, setHoraInicio] = useState("08:00");
  const [horaFim, setHoraFim] = useState("19:00");
  const [modalAgendar, setModalAgendar] = useState(false);

  // Estados para o novo agendamento (Item 9)
  const [clientes, setClientes] = useState<{ id: string; nome: string; telefone: string }[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState("");
  const [novoNome, setNovoNome] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [horarioAgendamento, setHorarioAgendamento] = useState("09:00");

  useEffect(() => {
    const c = localStorage.getItem("agendai_clientes");
    if (c) setClientes(JSON.parse(c));
  }, []);

  const handleCriarAgendamento = () => {
    let nomeFinal = novoNome;
    let telFinal = novoTelefone;

    if (clienteSelecionado !== "novo") {
      const cli = clientes.find((x) => x.id === clienteSelecionado);
      if (cli) {
        nomeFinal = cli.nome;
        telFinal = cli.telefone;
      }
    } else {
      if (!novoNome || !novoTelefone) return alert("Preencha nome e telefone do novo cliente.");
      // Cadastra novo cliente automaticamente
      const novo = { id: Date.now().toString(), nome: novoNome, telefone: novoTelefone };
      const listaAtualizada = [...clientes, novo];
      setClientes(listaAtualizada);
      localStorage.setItem("agendai_clientes", JSON.stringify(listaAtualizada));
    }

    alert(`Agendamento criado para ${nomeFinal} às ${horarioAgendamento}`);
    setModalAgendar(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Agenda do Dia</h1>
            <p className="text-sm text-gray-500">Atendimentos programados</p>
          </div>
          <button
            onClick={() => setModalAgendar(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
          >
            + Criar Agendamento
          </button>
        </div>

        {/* Item 1: Filtros da Agenda com De - Até */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Data</label>
            <input
              type="date"
              value={dataFiltro}
              onChange={(e) => setDataFiltro(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">De (Horário)</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Até (Horário)</label>
            <input
              type="time"
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        {/* Modal Item 9: Agendamento para cliente existente ou novo */}
        {modalAgendar && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Novo Agendamento</h2>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Cliente</label>
                <select
                  value={clienteSelecionado}
                  onChange={(e) => setClienteSelecionado(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm"
                >
                  <option value="">Selecione um cliente...</option>
                  <option value="novo">+ Novo Cliente (Cadastrar na hora)</option>
                  {clientes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome} ({c.telefone})
                    </option>
                  ))}
                </select>
              </div>

              {clienteSelecionado === "novo" && (
                <div className="space-y-2 border-l-2 border-pink-500 pl-3 my-2">
                  <input
                    type="text"
                    placeholder="Nome do Novo Cliente"
                    className="w-full p-2 border rounded-lg text-sm"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="WhatsApp"
                    className="w-full p-2 border rounded-lg text-sm"
                    value={novoTelefone}
                    onChange={(e) => setNovoTelefone(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Horário</label>
                <input
                  type="time"
                  value={horarioAgendamento}
                  onChange={(e) => setHorarioAgendamento(e.target.value)}
                  className="w-full p-2 border rounded-lg text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setModalAgendar(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCriarAgendamento}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
