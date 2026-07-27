"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AgendamentoClientePage() {
  const { slug } = useParams();
  const [profissional, setProfissional] = useState<any>(null);
  const [servicos, setServicos] = useState<any[]>([]);

  useEffect(() => {
    // Buscar perfil e serviços filtrados estritamente por slug/profissional_id
    if (slug) {
      // Exemplo de busca dinâmica baseada no slug do salão
      const perfis = JSON.parse(localStorage.getItem("agendai_perfis") || "[]");
      const encontrado = perfis.find((p: any) => p.slug === slug);
      if (encontrado) {
        setProfissional(encontrado);
      } else {
        setProfissional({ nome_estabelecimento: `Espaço ${slug}` });
      }
    }
  }, [slug]);

  return (
    <div className="max-w-md mx-auto p-4 min-h-screen bg-white">
      <header className="py-6 text-center border-b">
        <h1 className="text-xl font-bold text-gray-800">
          {profissional?.nome_estabelecimento || "Carregando..."}
        </h1>
        <p className="text-xs text-gray-500">Escolha o serviço e o melhor horário</p>
      </header>
      {/* Serviços dinâmicos do salão específico */}
    </div>
  );
}
