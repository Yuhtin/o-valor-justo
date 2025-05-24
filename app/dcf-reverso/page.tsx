"use client"

import { useState } from "react"
import Link from "next/link"
import { InfoIcon } from "lucide-react"
import Head from "next/head"

export default function DCFReverso() {
  // Estados para os inputs
  const [ticker, setTicker] = useState("")
  const [nomeEmpresa, setNomeEmpresa] = useState("")
  const [fclAtual, setFclAtual] = useState("")
  const [precoAtual, setPrecoAtual] = useState("")
  const [taxaCrescimentoPerpetua, setTaxaCrescimentoPerpetua] = useState("3.0")
  const [taxaDesconto, setTaxaDesconto] = useState("15.0")
  const [acoesEmCirculacao, setAcoesEmCirculacao] = useState("")

  // Estados para os resultados
  const [taxaCrescimentoImplicita, setTaxaCrescimentoImplicita] = useState<number | null>(null)
  const [fluxosProjetados, setFluxosProjetados] = useState<Array<{ ano: number; fcl: number; vp: number }>>([])
  const [valorTerminal, setValorTerminal] = useState<number | null>(null)
  const [valorPresenteTerminal, setValorPresenteTerminal] = useState<number | null>(null)
  const [valorTotalFluxos, setValorTotalFluxos] = useState<number | null>(null)
  const [valorEmpresa, setValorEmpresa] = useState<number | null>(null)

  // Estados para validação e controle
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [calculado, setCalculado] = useState(false)

  // Função para validar os inputs
  const validarInputs = () => {
    const newErrors: Record<string, string> = {}

    if (!ticker) newErrors.ticker = "Ticker é obrigatório"
    if (!fclAtual) newErrors.fclAtual = "FCL atual é obrigatório"
    if (!precoAtual) newErrors.precoAtual = "Preço atual é obrigatório"
    if (!taxaCrescimentoPerpetua) newErrors.taxaCrescimentoPerpetua = "Taxa de crescimento perpétua é obrigatória"
    if (!taxaDesconto) newErrors.taxaDesconto = "Taxa de desconto é obrigatória"
    if (!acoesEmCirculacao) newErrors.acoesEmCirculacao = "Ações em circulação é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para calcular a taxa de crescimento implícita
  const calcular = () => {
    if (!validarInputs()) return

    // Converter inputs para números
    const fclAtualNum = Number.parseFloat(fclAtual)
    const precoAtualNum = Number.parseFloat(precoAtual)
    const taxaCrescimentoPerpetuaNum = Number.parseFloat(taxaCrescimentoPerpetua) / 100
    const taxaDescontoNum = Number.parseFloat(taxaDesconto) / 100
    const acoesEmCirculacaoNum = Number.parseFloat(acoesEmCirculacao)

    // Calcular valor de mercado da empresa
    const valorMercadoEmpresa = precoAtualNum * acoesEmCirculacaoNum
    setValorEmpresa(valorMercadoEmpresa)

    // Implementação do método da bisseção para encontrar a taxa de crescimento implícita
    let taxaMin = -0.5 // -50%
    let taxaMax = 0.5 // 50%
    let taxaAtual = 0
    let diferenca = calcularDiferenca(taxaAtual)
    let iteracoes = 0
    const precisao = 0.0001
    const maxIteracoes = 100

    // Função para calcular a diferença entre o valor por ação calculado e o preço atual
    function calcularDiferenca(taxaCrescimento) {
      let vpFluxos = 0
      let fluxoAtual = fclAtualNum

      // Cálculo do VP dos fluxos futuros (anos 1-10)
      for (let ano = 1; ano <= 10; ano++) {
        fluxoAtual = fluxoAtual * (1 + taxaCrescimento)
        vpFluxos += fluxoAtual / Math.pow(1 + taxaDescontoNum, ano)
      }

      // Cálculo do valor terminal
      const fluxoAno11 = fluxoAtual * (1 + taxaCrescimentoPerpetuaNum)
      const valorTerminal = fluxoAno11 / (taxaDescontoNum - taxaCrescimentoPerpetuaNum)
      const vpValorTerminal = valorTerminal / Math.pow(1 + taxaDescontoNum, 10)

      // Valor total da empresa
      const valorEmpresa = vpFluxos + vpValorTerminal

      // Valor por ação
      const valorPorAcao = valorEmpresa / acoesEmCirculacaoNum

      // Diferença entre o valor calculado e o preço atual
      return valorPorAcao - precoAtualNum
    }

    while (Math.abs(diferenca) > precisao && iteracoes < maxIteracoes) {
      if (diferenca > 0) {
        taxaMax = taxaAtual
      } else {
        taxaMin = taxaAtual
      }

      taxaAtual = (taxaMin + taxaMax) / 2
      diferenca = calcularDiferenca(taxaAtual)
      iteracoes++
    }

    // Calcular todos os detalhes usando a taxa encontrada
    const taxaCrescimento = taxaAtual
    let fluxoAtual = fclAtualNum
    const fluxos = []
    let somaFluxosDescontados = 0

    for (let ano = 1; ano <= 10; ano++) {
      fluxoAtual = fluxoAtual * (1 + taxaCrescimento)
      const valorDescontado = fluxoAtual / Math.pow(1 + taxaDescontoNum, ano)
      somaFluxosDescontados += valorDescontado

      fluxos.push({
        ano: ano,
        fcl: fluxoAtual,
        vp: valorDescontado,
      })
    }

    // Cálculo do valor terminal
    const fluxoFinal = fluxos[9].fcl * (1 + taxaCrescimentoPerpetuaNum)
    const valorTerminalCalculado = fluxoFinal / (taxaDescontoNum - taxaCrescimentoPerpetuaNum)
    const vpValorTerminalCalculado = valorTerminalCalculado / Math.pow(1 + taxaDescontoNum, 10)

    setTaxaCrescimentoImplicita(taxaCrescimento * 100) // Converter para percentual
    setFluxosProjetados(fluxos)
    setValorTerminal(valorTerminalCalculado)
    setValorPresenteTerminal(vpValorTerminalCalculado)
    setValorTotalFluxos(somaFluxosDescontados)

    setCalculado(true)
  }

  // Função para obter a interpretação do resultado com base na taxa de crescimento
  const obterInterpretacaoResultado = () => {
    if (!taxaCrescimentoImplicita) return ""

    if (taxaCrescimentoImplicita < 0) {
      return "O mercado precifica um decrescimento para a empresa. Esta taxa representa o crescimento anual que a empresa precisa atingir nos próximos 10 anos para justificar seu preço atual. Se você acredita que a empresa tende a pelo menos permanecer do mesmo tamanho, a ação pode estar barata segundo suas premissas."
    } else if (taxaCrescimentoImplicita < 4) {
      return "O mercado precifica um crescimento baixo para a empresa. Esta taxa representa o crescimento anual que a empresa precisa atingir nos próximos 10 anos para justificar seu preço atual. Crescimentos esperados muito baixos podem sinalizar ações mais baratas caso você tenha boas perspectivas sobre a empresa."
    } else if (taxaCrescimentoImplicita < 7) {
      return "O mercado precifica um crescimento moderado para a empresa. Esta taxa representa o crescimento anual que a empresa precisa atingir nos próximos 10 anos para justificar seu preço atual. Se você acredita que a empresa tende a ter um crescimento agressivo nos próximos anos, a ação pode estar mal precificada segundo suas premissas."
    } else {
      return "O mercado precifica um crescimento agressivo para a empresa. Esta taxa representa o crescimento anual que a empresa precisa atingir nos próximos 10 anos para justificar seu preço atual. Se você acredita que a empresa não crescerá além dessa taxa para os próximos anos, a ação pode estar próxima do valor justo."
    }
  }

  // Função para formatar números
  const formatarNumero = (valor: number, casasDecimais = 2) => {
    return valor.toLocaleString("pt-BR", {
      minimumFractionDigits: casasDecimais,
      maximumFractionDigits: casasDecimais,
    })
  }

  // Função para determinar a cor de fundo com base na taxa de crescimento
  const getBackgroundColor = () => {
    if (taxaCrescimentoImplicita === null) return "bg-gray-100"
    if (taxaCrescimentoImplicita < 0) return "bg-green-600"
    if (taxaCrescimentoImplicita < 4) return "bg-green-400"
    if (taxaCrescimentoImplicita < 7) return "bg-yellow-100"
    return "bg-red-200"
  }

  // Função para determinar a cor do texto
  const getTextColor = () => {
    if (taxaCrescimentoImplicita === null) return ""
    if (taxaCrescimentoImplicita < 4) return "text-white"
    return ""
  }

  return (
    <>
      <Head>
        <title>DCF Reverso | Descubra o Crescimento Implícito no Preço das Ações</title>
        <meta
          name="description"
          content="Calcule qual taxa de crescimento está implícita no preço atual das ações brasileiras. Ferramenta para identificar expectativas de mercado e ações sub/sobrevalorizadas."
        />
        <meta
          name="keywords"
          content="DCF reverso, crescimento implícito, expectativa de mercado, valuation, análise de ações, preço justo"
        />
        <link rel="canonical" href="https://valorjusto.com.br/dcf-reverso" />
        <meta property="og:title" content="DCF Reverso | Descubra o Crescimento Implícito no Preço das Ações" />
        <meta
          property="og:description"
          content="Calcule qual taxa de crescimento está implícita no preço atual das ações brasileiras."
        />
        <meta property="og:url" content="https://valorjusto.com.br/dcf-reverso" />
        <meta property="og:type" content="website" />
      </Head>
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

        <div className="container mx-auto px-4 py-6 md:py-6">
          <div className="mb-6">
            <Link href="/" className="text-[#0d9f6f] text-sm hover:underline flex items-center">
              <span>← Voltar para a página inicial</span>
            </Link>
          </div>

          <h1 className="text-xl md:text-xl font-bold mb-2">DCF Reverso</h1>
          <p className="text-sm text-gray-600 mb-4 md:mb-6">
            Descubra a taxa de crescimento implícita no preço atual da ação
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Parâmetros de Cálculo */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Parâmetros de Cálculo</h2>
              <p className="text-xs text-gray-500 mb-4">
                Preencha os campos abaixo para calcular a taxa de crescimento implícita
              </p>

              <div className="mb-3 md:mb-4">
                <label htmlFor="ticker" className="block text-sm font-medium mb-1">
                  Ticker da Ação
                </label>
                <div className="flex items-center">
                  <input
                    id="ticker"
                    type="text"
                    placeholder="PETR4"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    className={`input-field ${errors.ticker ? "border-red-500" : ""}`}
                  />
                  <div className="tooltip ml-2">
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                    <span className="tooltip-text">Código da ação na B3</span>
                  </div>
                </div>
                {errors.ticker && <p className="text-red-500 text-xs mt-1">{errors.ticker}</p>}
              </div>

              <div className="mb-3 md:mb-4">
                <label htmlFor="nome-empresa" className="block text-sm font-medium mb-1">
                  Nome da Empresa
                </label>
                <div className="flex items-center">
                  <input
                    id="nome-empresa"
                    type="text"
                    placeholder="Petrobras"
                    value={nomeEmpresa}
                    onChange={(e) => setNomeEmpresa(e.target.value)}
                    className="input-field"
                  />
                  <div className="tooltip ml-2">
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                    <span className="tooltip-text">Nome da empresa (opcional)</span>
                  </div>
                </div>
              </div>

              <div className="mb-3 md:mb-4">
                <label htmlFor="preco-atual" className="block text-sm font-medium mb-1">
                  Preço Atual (R$)
                </label>
                <div className="flex items-center">
                  <input
                    id="preco-atual"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={precoAtual}
                    onChange={(e) => setPrecoAtual(e.target.value)}
                    className={`input-field ${errors.precoAtual ? "border-red-500" : ""}`}
                  />
                  <div className="tooltip ml-2">
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                    <span className="tooltip-text">Preço atual da ação</span>
                  </div>
                </div>
                {errors.precoAtual && <p className="text-red-500 text-xs mt-1">{errors.precoAtual}</p>}
              </div>

              <div className="mb-3 md:mb-4">
                <label htmlFor="acoes-circulacao" className="block text-sm font-medium mb-1">
                  Número de Ações (milhões)
                </label>
                <div className="flex items-center">
                  <input
                    id="acoes-circulacao"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={acoesEmCirculacao}
                    onChange={(e) => setAcoesEmCirculacao(e.target.value)}
                    className={`input-field ${errors.acoesEmCirculacao ? "border-red-500" : ""}`}
                  />
                  <div className="tooltip ml-2">
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                    <span className="tooltip-text">
                      Número de ações em circulação em milhões (você pode encontrar esses dados no Status Invest,
                      Investidor10 ou no Balanço patrimonial/Site de RI da empresa)
                    </span>
                  </div>
                </div>
                {errors.acoesEmCirculacao && <p className="text-red-500 text-xs mt-1">{errors.acoesEmCirculacao}</p>}
              </div>

              <div className="mb-3 md:mb-4">
                <label htmlFor="fcl-atual" className="block text-sm font-medium mb-1">
                  Fluxo de Caixa Livre (R$ milhões)
                </label>
                <div className="flex items-center">
                  <input
                    id="fcl-atual"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={fclAtual}
                    onChange={(e) => setFclAtual(e.target.value)}
                    className={`input-field ${errors.fclAtual ? "border-red-500" : ""}`}
                  />
                  <div className="tooltip ml-2">
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                    <span className="tooltip-text">
                      Fluxo de Caixa Livre atual em milhões de reais (você pode encontrar esses dados no Status Invest,
                      Investidor10 ou nas Demonstrações financeiras da empresa)
                    </span>
                  </div>
                </div>
                {errors.fclAtual && <p className="text-red-500 text-xs mt-1">{errors.fclAtual}</p>}
              </div>

              <div className="mb-3 md:mb-4">
                <label htmlFor="taxa-crescimento-perpetua" className="block text-sm font-medium mb-1">
                  Taxa de Crescimento Perpétua (%)
                </label>
                <div className="flex items-center">
                  <input
                    id="taxa-crescimento-perpetua"
                    type="number"
                    step="0.1"
                    placeholder="3.0"
                    value={taxaCrescimentoPerpetua}
                    onChange={(e) => setTaxaCrescimentoPerpetua(e.target.value)}
                    className={`input-field ${errors.taxaCrescimentoPerpetua ? "border-red-500" : ""}`}
                  />
                  <div className="tooltip ml-2">
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                    <span className="tooltip-text">
                      Taxa de crescimento perpétua após o período de projeção. Importante: aconselhamos deixar esse
                      número entre 3 e 4%, pois taxas de crescimento perpetuo altas irão distorcer o seu valuation
                    </span>
                  </div>
                </div>
                {errors.taxaCrescimentoPerpetua && (
                  <p className="text-red-500 text-xs mt-1">{errors.taxaCrescimentoPerpetua}</p>
                )}
              </div>

              <div className="mb-3 md:mb-4">
                <label htmlFor="taxa-desconto" className="block text-sm font-medium mb-1">
                  Taxa de Desconto (%)
                </label>
                <div className="flex items-center">
                  <input
                    id="taxa-desconto"
                    type="number"
                    step="0.1"
                    placeholder="15.0"
                    value={taxaDesconto}
                    onChange={(e) => setTaxaDesconto(e.target.value)}
                    className={`input-field ${errors.taxaDesconto ? "border-red-500" : ""}`}
                  />
                  <div className="tooltip ml-2">
                    <InfoIcon className="h-4 w-4 text-gray-400" />
                    <span className="tooltip-text">
                      Taxa de desconto (custo de capital). Dica: caso não saiba calcular o custo de capital, usar a
                      rentabilidade atual do Tesouro Prefixado é um valor que não tende a distorcer seu valuation
                    </span>
                  </div>
                </div>
                {errors.taxaDesconto && <p className="text-red-500 text-xs mt-1">{errors.taxaDesconto}</p>}
              </div>

              <button onClick={calcular} className="btn-primary w-full">
                Calcular Taxa de Crescimento Implícita
              </button>
            </div>

            {/* Resultado da Análise */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Resultado da Análise</h2>
              <p className="text-xs text-gray-500 mb-4">Taxa de crescimento implícita no preço atual da ação</p>

              {!calculado ? (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">
                    Preencha os parâmetros e clique em "Calcular Taxa de Crescimento Implícita"
                  </p>
                </div>
              ) : (
                <div>
                  <div className="p-4 rounded mb-6 bg-white border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Taxa de Crescimento Implícita (% a.a.)</p>
                    <p className="text-2xl md:text-3xl font-bold text-center">
                      {taxaCrescimentoImplicita !== null ? formatarNumero(taxaCrescimentoImplicita) + "%" : "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-100 p-4 rounded mb-6">
                    <h3 className="text-sm font-medium mb-2">Interpretação do Resultado:</h3>
                    <p className="text-sm text-gray-700">{obterInterpretacaoResultado()}</p>
                  </div>

                  {/* Projeção de Fluxos de Caixa */}
                  <div className="mt-4 md:mt-6">
                    <h3 className="text-base md:text-lg font-medium mb-2">Projeção de Fluxos de Caixa</h3>
                    <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-200 p-2">Ano</th>
                            <th className="border border-gray-200 p-2 text-right">Fluxo de Caixa (R$ milhões)</th>
                            <th className="border border-gray-200 p-2 text-right">Valor Presente (R$ milhões)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fluxosProjetados.map((fluxo, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                              <td className="border border-gray-200 p-2">Ano {fluxo.ano}</td>
                              <td className="border border-gray-200 p-2 text-right">{formatarNumero(fluxo.fcl)}</td>
                              <td className="border border-gray-200 p-2 text-right">{formatarNumero(fluxo.vp)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Resumo dos Valores */}
                  <div className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Valor Total dos Fluxos Descontados</p>
                      <p className="text-sm font-bold">
                        R$ {valorTotalFluxos !== null ? formatarNumero(valorTotalFluxos) + " milhões" : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Valor Terminal Descontado</p>
                      <p className="text-sm font-bold">
                        R$ {valorPresenteTerminal !== null ? formatarNumero(valorPresenteTerminal) + " milhões" : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Valor de Mercado da Empresa</p>
                      <p className="text-sm font-bold">
                        R$ {valorEmpresa !== null ? formatarNumero(valorEmpresa) + " milhões" : "N/A"}
                      </p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-xs text-gray-600 mb-1">Valor por Ação</p>
                      <p className="text-sm font-bold">R$ {precoAtual ? formatarNumero(Number(precoAtual)) : "N/A"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <footer className="mt-8 md:mt-12 py-3 md:py-4 border-t border-gray-200 bg-white">
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
