"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  observacoes: string;
  totalAtendimentos?: number;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [novoCliente, setNovoCliente] = useState({ nome: "", telefone: "", email: "", observacoes: "" });

  useEffect(() => {
    // Carregar clientes vinculados ao profissional_id logado
    const salves = localStorage.getItem("agendai_clientes");
    if (salves) setClientes(JSON.parse(salves));
  }, []);

  const salvarCliente = () => {
    if (!novoCliente.nome || !novoCliente.telefone) return alert("Preencha nome e telefone!");
    const atualizados = [...clientes, { ...novoCliente, id: Date.now().toString(), totalAtendimentos: 0 }];
    setClientes(atualizados);
    localStorage.setItem("agendai_clientes", JSON.stringify(atualizados));
    setModalAberto(false);
    setNovoCliente({ nome: "", telefone: "", email: "", observacoes: "" });
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.telefone.includes(busca)
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestão de Clientes</h1>
            <p className="text-sm text-gray-500">Histórico e dados de contato</p>
          </div>
          <button
            onClick={() => setModalAberto(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            + Novo Cliente
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar cliente por nome ou telefone..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full max-w-md p-2.5 border border-gray-300 rounded-lg mb-6 text-sm"
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Observações</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    Nenhum cliente encontrado.
                  </td>
                </tr>
              ) : (
                clientesFiltrados.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{c.nome}</td>
                    <td className="p-4">{c.telefone}</td>
                    <td className="p-4">{c.email || "-"}</td>
                    <td className="p-4 text-gray-500">{c.observacoes || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal Novo Cliente */}
        {modalAberto && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
              <h2 className="text-lg font-bold text-gray-800">Cadastrar Cliente</h2>
              <input
                type="text"
                placeholder="Nome completo *"
                className="w-full p-2 border rounded-lg"
                value={novoCliente.nome}
                onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
              />
              <input
                type="text"
                placeholder="WhatsApp/Telefone *"
                className="w-full p-2 border rounded-lg"
                value={novoCliente.telefone}
                onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
              />
              <input
                type="email"
                placeholder="E-mail (opcional)"
                className="w-full p-2 border rounded-lg"
                value={novoCliente.email}
                onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
              />
              <textarea
                placeholder="Alergias, preferências, observações..."
                className="w-full p-2 border rounded-lg"
                value={novoCliente.observacoes}
                onChange={(e) => setNovoCliente({ ...novoCliente, observacoes: e.target.value })}
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarCliente}
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
