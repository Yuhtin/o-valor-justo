"use client"

import Link from "next/link"
import { BarChart2, LineChart, Building2, Search, ArrowRight, Calendar, Share2 } from "lucide-react"

// Dados reais para os artigos em destaque
const artigosDestaque = [
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
]

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-[#f5f9f7]">
      <header className="py-4 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex justify-center">
            <svg width="240" height="120" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0.000000,1080.000000) scale(0.100000,-0.100000)" fill="#009959">
                <path d="M5480 7415 l0 -825 170 0 170 0 0 825 0 825 -170 0 -170 0 0 -825z" />
                <path d="M2390 8145 c0 -7 78 -191 268 -630 88 -203 188 -435 222 -515 35 -80 88 -203 119 -275 l57 -130 175 -3 176 -2 68 157 c37 87 91 212 120 278 28 66 107 248 175 405 68 157 165 380 215 495 51 116 90 213 88 218 -5 9 -325 9 -339 -1 -5 -4 -64 -131 -129 -282 -65 -151 -171 -396 -235 -545 -64 -148 -121 -269 -126 -269 -5 1 -51 100 -102 220 -51 121 -156 369 -234 552 l-142 332 -188 0 c-103 0 -188 -2 -188 -5z" />
                <path d="M4385 7783 c-132 -28 -305 -98 -305 -124 0 -12 109 -229 115 -229 2 0 33 15 67 34 84 46 167 66 275 66 104 0 164 -17 211 -61 41 -38 58 -72 67 -131 l7 -46 -229 -5 c-173 -3 -242 -9 -287 -22 -124 -35 -204 -95 -248 -184 -19 -39 -23 -62 -23 -146 1 -120 20 -169 94 -238 98 -92 192 -121 370 -115 112 4 133 7 188 32 37 17 79 46 102 71 22 24 42 40 45 37 3 -3 6 -34 6 -69 l0 -63 161 0 160 0 -3 413 c-4 386 -5 416 -25 474 -75 223 -248 324 -553 322 -70 0 -156 -7 -195 -16z m435 -756 c0 -53 -5 -71 -29 -109 -76 -120 -289 -155 -388 -64 -70 63 -50 174 37 218 29 15 63 18 208 18 l172 0 0 -63z" />
                <path d="M6515 7776 c-96 -27 -140 -49 -220 -108 -97 -71 -172 -183 -211 -313 -25 -82 -25 -248 0 -330 59 -196 197 -340 398 -413 68 -25 84 -27 233 -27 149 0 165 2 242 28 171 59 298 174 369 334 27 61 54 217 47 273 -23 187 -66 290 -163 387 -75 76 -150 123 -255 159 -70 24 -98 28 -220 31 -123 2 -150 0 -220 -21z m278 -261 c101 -26 159 -74 201 -165 32 -71 41 -150 27 -234 -28 -162 -141 -259 -301 -260 -63 -1 -85 4 -132 27 -115 57 -178 165 -178 307 0 167 83 284 231 324 70 19 83 19 152 1z" />
                <path d="M8190 7784 c-79 -21 -150 -58 -200 -104 -24 -22 -45 -40 -46 -40 -2 0 -4 32 -6 71 l-3 71 -155 -1 c-85 0 -156 -3 -157 -6 -2 -3 -3 -270 -3 -595 l0 -590 168 0 167 0 -3 287 c-4 394 8 457 101 539 60 53 124 74 220 74 l77 0 0 155 0 155 -52 -1 c-29 0 -78 -7 -108 -15z" />
                <path d="M820 5845 l0 -145 4585 0 4585 0 0 145 0 145 -4585 0 -4585 0 0 -145z" fill="#000000" />
                <path d="M9379 5463 c14 -28 14 -45 -2 -67 -11 -15 -17 -17 -35 -7 -17 9 -28 9 -49 -2 -35 -18 -104 -29 -119 -19 -6 4 -16 16 -22 27 -11 19 -11 19 -12 -3 0 -14 13 -36 30 -52 l30 -28 -22 -14 c-16 -11 -20 -20 -14 -41 5 -22 12 -27 39 -27 17 0 44 -8 58 -18 33 -22 104 -102 91 -102 -11 0 -72 60 -72 72 0 21 -33 4 -70 -36 -26 -28 -62 -52 -97 -67 -54 -22 -57 -22 -87 -5 -30 17 -30 17 -13 -1 21 -24 22 -47 3 -63 -8 -6 -20 -28 -27 -48 -16 -50 -56 -127 -96 -183 -18 -26 -33 -49 -33 -53 0 -3 11 -6 25 -6 19 0 29 10 44 39 11 21 36 49 56 61 19 12 47 36 62 54 27 31 30 32 82 27 53 -6 54 -7 57 -41 2 -19 9 -48 14 -64 6 -16 10 -40 10 -53 0 -15 5 -23 12 -21 8 3 11 20 10 46 -4 42 11 82 29 82 8 0 10 -28 8 -82 -4 -83 -4 -83 21 -83 24 0 25 2 26 70 1 39 9 92 18 118 9 26 16 54 16 61 0 7 18 25 40 40 47 31 60 33 35 6 -18 -20 -18 -21 16 -49 53 -44 90 -103 97 -158 6 -40 11 -49 30 -51 22 -3 30 12 12 23 -5 3 -10 24 -10 45 0 21 -4 50 -10 64 -5 14 -16 62 -24 108 -51 275 -93 378 -155 378 l-26 0 25 13 c35 18 41 84 9 113 -22 19 -22 19 -10 -3z" />
                <path d="M2575 5238 c-81 -28 -123 -87 -126 -175 -5 -125 101 -207 245 -189 168 21 235 216 112 324 -56 49 -156 66 -231 40z" />
                <path d="M8966 5205 c-9 -25 -7 -47 4 -40 6 3 10 1 10 -6 0 -9 3 -10 11 -2 13 13 8 55 -7 60 -6 2 -14 -3 -18 -12z" />
                <path d="M1680 5079 c-145 -246 -217 -531 -227 -890 -12 -437 63 -768 241 -1071 l28 -48 159 0 c87 0 159 2 159 5 0 3 -24 56 -54 118 -129 271 -187 506 -202 822 -17 375 57 730 222 1057 19 37 34 70 34 73 0 3 -72 5 -160 5 l-159 0 -41 -71z" />
                <path d="M8196 5018 c156 -321 216 -652 193 -1066 -15 -273 -77 -509 -195 -752 l-63 -130 159 0 159 0 29 43 c98 142 176 358 224 622 19 103 22 157 23 375 0 225 -3 270 -23 380 -44 236 -106 417 -203 586 l-43 74 -162 0 -163 0 65 -132z" />
                <path d="M5911 4833 c-1 -70 -4 -129 -7 -132 -3 -3 -42 -7 -87 -8 l-82 -2 -3 -125 -3 -125 88 -3 88 -3 6 -315 c4 -210 10 -328 19 -355 38 -120 115 -205 222 -246 56 -21 80 -24 203 -24 124 0 147 3 203 24 35 13 66 30 69 37 8 20 -74 229 -89 227 -7 -1 -37 -9 -67 -17 -104 -30 -187 10 -210 98 -12 47 -16 531 -5 560 5 14 28 16 150 16 l145 0 -3 126 -3 126 -127 -1 c-76 -1 -136 2 -148 9 -18 10 -20 20 -20 135 l0 125 -169 0 -169 0 -1 -127z" />
                <path d="M4965 4696 c-138 -32 -238 -88 -299 -169 -105 -137 -78 -360 53 -451 60 -42 167 -74 334 -102 177 -29 214 -39 245 -67 31 -29 30 -86 -2 -116 -86 -81 -369 -61 -565 39 -24 12 -47 18 -51 13 -11 -12 -100 -215 -100 -228 0 -17 120 -70 220 -97 75 -20 109 -22 280 -23 165 0 204 3 255 19 136 44 233 116 283 211 24 44 27 61 27 145 -1 109 -16 149 -82 211 -63 61 -185 109 -308 124 -87 10 -242 43 -268 56 -43 23 -57 42 -57 79 0 27 7 45 26 63 40 40 88 52 204 51 112 -1 199 -18 286 -58 l51 -24 56 120 56 120 -57 26 c-101 46 -193 63 -367 67 -114 3 -177 1 -220 -9z" />
                <path d="M7165 4686 c-95 -27 -140 -49 -220 -108 -147 -108 -229 -280 -229 -478 0 -271 152 -482 416 -578 68 -25 85 -27 233 -27 149 0 165 2 242 28 293 101 457 370 408 673 -18 114 -47 187 -102 262 -86 115 -207 193 -359 232 -111 29 -281 27 -389 -4z m278 -261 c130 -34 206 -118 229 -256 22 -126 -13 -248 -94 -326 -84 -81 -230 -102 -340 -49 -112 54 -178 164 -178 297 0 172 85 295 230 333 71 19 84 19 152 1z" />
                <path d="M2490 4085 c0 -402 -4 -623 -11 -648 -6 -22 -26 -55 -44 -75 -32 -36 -36 -37 -102 -36 -41 0 -81 6 -100 16 -40 20 -41 19 -82 -95 -17 -49 -36 -97 -41 -107 -7 -12 -6 -21 3 -28 25 -21 135 -51 212 -57 206 -17 372 61 449 211 53 103 56 153 54 817 l-3 608 -168 2 -167 2 0 -610z" />
                <path d="M3153 4683 c-2 -6 -3 -193 -1 -415 3 -391 4 -405 26 -468 57 -159 158 -253 319 -295 66 -17 227 -19 293 -4 63 14 163 65 196 100 15 16 31 29 35 29 5 0 9 -28 11 -62 l3 -63 160 0 160 0 0 593 0 594 -165 0 -165 0 -6 -339 c-3 -186 -11 -352 -16 -368 -35 -103 -92 -165 -175 -190 -139 -41 -259 3 -312 115 -20 43 -21 65 -26 413 l-5 368 -164 2 c-116 1 -165 -1 -168 -10z" />
              </g>
            </svg>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Descubra o Valor Justo dos Ativos da Bolsa</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Saiba em menos de 3 minutos se você está comprando uma ação ou fundo imobiliário que pode lhe gerar retornos
            acima da média
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Link href="/valuation-acoes" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#e6f2ec] rounded-full flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-[#0d9f6f]" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-center mb-2">Valuation de Ações</h2>
              <p className="text-sm text-gray-600 text-center">
                Calcule o valor justo da ação baseado no modelo de crescimento em dois estágios usando o Lucro por Ação
                (LPA)
              </p>
            </div>
          </Link>

          <Link href="/valuation-fiis" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#e6f2ec] rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-[#0d9f6f]" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-center mb-2">Valuation de FIIs</h2>
              <p className="text-sm text-gray-600 text-center">
                Determine o valor justo de fundos imobiliários com base nos dividendos projetados
              </p>
            </div>
          </Link>

          <Link href="/modelo-dcf" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#e6f2ec] rounded-full flex items-center justify-center mb-4">
                <LineChart className="w-6 h-6 text-[#0d9f6f]" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-center mb-2">Modelo DCF</h2>
              <p className="text-sm text-gray-600 text-center">
                Avalie empresas pelo método do fluxo de caixa descontado com projeções de 10 anos
              </p>
            </div>
          </Link>

          <Link href="/dcf-reverso" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#e6f2ec] rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-[#0d9f6f]" aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold text-center mb-2">DCF Reverso</h2>
              <p className="text-sm text-gray-600 text-center">
                Descubra a taxa de crescimento implícita no preço atual da ação
              </p>
            </div>
          </Link>
        </div>

        {/* Nova seção de Conteúdos */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Conteúdos</h2>
            <Link href="/conteudos" className="text-[#0d9f6f] text-sm hover:underline flex items-center">
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artigosDestaque.map((artigo) => (
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
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-6">Sobre o Valor Justo</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="mb-4">
              O Valor Justo é uma ferramenta que utiliza modelos financeiros consagrados para estimar o valor intrínseco
              de ativos negociados na B3. Nossa calculadora permite que investidores apliquem diferentes premissas e
              cenários para avaliar o potencial de valorização ou desvalorização de ações e fundos imobiliários.
            </p>
            <p className="mb-2">Os modelos disponíveis são:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>
                <strong>Valuation de Ações</strong> - Baseado no crescimento do lucro por ação (LPA) em dois estágios
              </li>
              <li>
                <strong>Valuation de FIIs</strong> - Baseado na projeção de dividendos futuros
              </li>
              <li>
                <strong>Modelo DCF</strong> - Fluxo de caixa descontado completo com projeções de 10 anos
              </li>
              <li>
                <strong>DCF Reverso</strong> - Cálculo da taxa de crescimento implícita no preço atual
              </li>
            </ul>
            <p>
              Utilize estas ferramentas como parte de uma análise mais ampla, sempre considerando aspectos qualitativos
              e quantitativos em suas decisões de investimento.
            </p>
          </div>
        </div>
      </main>

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
  )
}
