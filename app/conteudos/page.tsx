"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Search, Share2, Filter } from "lucide-react"
import Head from "next/head"

// Dados reais para os artigos
const artigos = [
  {
    id: 4,
    titulo: "Mills: a Small Cap que pode multiplicar até 3x na visão dos gestores",
    resumo:
      "A Mills (BVMF: MILS3), líder brasileira em locação de equipamentos, tem chamado a atenção de gestoras de renome como Leblon Equities e a Reach Capital. Com posições significativas em seus portfólios, a empresa é vista como uma joia resiliente em um setor difícil de se operar.",
    categoria: "Valuation",
    data: "19 de abril de 2025",
    autor: "Mateus Gusmão",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2-zUiFNs7ImpmnXHqKWhVnGPO6OPHL1Z.png",
    slug: "mills-small-cap-multiplicar-3x",
  },
  {
    id: 1,
    titulo: "Quem somos?",
    resumo: "Qual é o propósito por trás do Valor Justo?",
    categoria: "Institucional",
    data: "16 de abril de 2025",
    imagem: "/images/valor-justo-logo.png",
    slug: "quem-somos",
  },
  {
    id: 2,
    titulo: "Custo de Capital: Entendendo o WACC e o custo de oportunidade",
    resumo:
      "Entenda o que é o custo de capital, a métrica do WACC e como calcular o custo de oportunidade do seu investimento, para obter a melhor taxa de desconto para o seu valuation.",
    categoria: "Valuation",
    data: "16 de abril de 2025",
    imagem: "/images/custo-de-capital.png",
    slug: "custo-de-capital-wacc-custo-oportunidade",
  },
  {
    id: 3,
    titulo: "Entendendo o Valuation: Como fazer o modelo de Fluxo de Caixa Descontado (DCF)",
    resumo:
      "Como funciona um valuation? Nesse artigo você aprenderá quais são os principais modelos de avaliação de ativos e como fazer o modelo de fluxo de caixa descontado.",
    categoria: "Valuation",
    data: "16 de abril de 2025",
    imagem: "/images/valuation.png",
    slug: "entendendo-valuation-modelo-fluxo-caixa-descontado",
  },
]

// Lista de categorias disponíveis
const categorias = ["Todos", "Institucional", "Valuation"]

export default function Conteudos() {
  const [busca, setBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  // Filtrar artigos com base na busca e categoria selecionada
  const artigosFiltrados = artigos.filter((artigo) => {
    const matchBusca =
      artigo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      artigo.resumo.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = categoriaAtiva === "Todos" || artigo.categoria === categoriaAtiva

    return matchBusca && matchCategoria
  })

  return (
    <>
      <Head>
        <title>Conteúdos | Valor Justo - Artigos sobre Valuation e Investimentos</title>
        <meta
          name="description"
          content="Artigos e conteúdos educativos sobre valuation, análise fundamentalista, ações e fundos imobiliários."
        />
        <meta
          name="keywords"
          content="valuation, artigos financeiros, análise fundamentalista, investimentos, ações, FIIs"
        />
        <link rel="canonical" href="https://valorjusto.com.br/conteudos" />
      </Head>
      <div className="min-h-screen bg-[#f5f9f7]">
        <header className="py-4 border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <Link href="/" className="flex justify-center">
              <svg width="240" height="120" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* SVG content - same as in home page */}
              </svg>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Link href="/" className="text-[#0d9f6f] text-sm hover:underline flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>Voltar para a página inicial</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold mb-6">Conteúdos</h1>

          {/* Barra de busca e filtros */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0d9f6f] focus:border-transparent"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

              <div className="md:hidden">
                <button
                  onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md"
                >
                  <Filter className="h-4 w-4" />
                  Filtrar por categoria
                </button>
              </div>

              <div className={`md:flex gap-2 ${mostrarFiltros ? "flex" : "hidden"} flex-wrap`}>
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    className={`px-3 py-1 rounded-full text-sm ${
                      categoriaAtiva === categoria
                        ? "bg-[#0d9f6f] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setCategoriaAtiva(categoria)}
                  >
                    {categoria}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de artigos */}
          {artigosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artigosFiltrados.map((artigo) => (
                <div
                  key={artigo.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/conteudos/${artigo.slug}`}>
                    <div className="relative h-48 w-full">
                      <img
                        src={artigo.imagem || "/placeholder.svg"}
                        alt={artigo.titulo}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-[#0d9f6f] bg-[#e6f2ec] px-2 py-1 rounded">
                        {artigo.categoria}
                      </span>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        {artigo.data}
                      </div>
                    </div>
                    <Link href={`/conteudos/${artigo.slug}`}>
                      <h3 className="font-semibold mb-2 hover:text-[#0d9f6f] transition-colors line-clamp-2">
                        {artigo.titulo}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{artigo.resumo}</p>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/conteudos/${artigo.slug}`}
                        className="text-[#0d9f6f] text-sm font-medium hover:underline"
                      >
                        Ler mais
                      </Link>
                      <button
                        className="text-gray-500 hover:text-[#0d9f6f]"
                        aria-label="Compartilhar"
                        onClick={(e) => {
                          e.preventDefault()
                          // Lógica de compartilhamento será implementada posteriormente
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-600">Nenhum artigo encontrado para a busca atual.</p>
            </div>
          )}
        </div>

        <footer className="mt-12 py-4 border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center text-xs text-gray-500">
              <p className="mb-2">
                As informações apresentadas neste site são baseadas em projeções e devem ser usadas apenas como
                referência. Não constituem recomendação de investimento. Faça sua própria análise antes de investir.
              </p>
              <p>© 2023 Valor Justo. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
