"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DividendoInput } from "./dividendo-input"
import { TIRResult } from "./tir-result"
import { calcularTIRDCF, projetarDividendos } from "@/lib/calculators/tir-utils"

// Componente existente modificado para incluir o cálculo da TIR
export function DCFCalculator() {
  // Estados existentes
  const [ticker, setTicker] = useState("")
  const [fclAtual, setFclAtual] = useState("")
  const [precoAtual, setPrecoAtual] = useState("")
  const [taxaCrescimento, setTaxaCrescimento] = useState("")
  const [taxaCrescimentoPerpetua, setTaxaCrescimentoPerpetua] = useState("")
  const [taxaDesconto, setTaxaDesconto] = useState("")
  const [acoesEmCirculacao, setAcoesEmCirculacao] = useState("")
  const [valorJusto, setValorJusto] = useState<number | null>(null)
  const [potencialValorizacao, setPotencialValorizacao] = useState<number | null>(null)

  // Novos estados para o cálculo da TIR
  const [dividendoAnual, setDividendoAnual] = useState("")
  const [tir, setTir] = useState<number | null>(null)
  const [fluxosCaixa, setFluxosCaixa] = useState<number[]>([])

  // Estados para validação
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [calculado, setCalculado] = useState(false)

  // Função para validar os inputs
  const validarInputs = () => {
    const newErrors: Record<string, string> = {}

    if (!ticker) newErrors.ticker = "Ticker é obrigatório"
    if (!fclAtual) newErrors.fclAtual = "FCL atual é obrigatório"
    if (!precoAtual) newErrors.precoAtual = "Preço atual é obrigatório"
    if (!taxaCrescimento) newErrors.taxaCrescimento = "Taxa de crescimento é obrigatória"
    if (!taxaCrescimentoPerpetua) newErrors.taxaCrescimentoPerpetua = "Taxa de crescimento perpétua é obrigatória"
    if (!taxaDesconto) newErrors.taxaDesconto = "Taxa de desconto é obrigatória"
    if (!acoesEmCirculacao) newErrors.acoesEmCirculacao = "Ações em circulação é obrigatório"
    if (!dividendoAnual) newErrors.dividendoAnual = "Dividendo anual é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para calcular o valor justo e a TIR
  const calcular = () => {
    if (!validarInputs()) return

    // Converter inputs para números
    const fclAtualNum = Number.parseFloat(fclAtual)
    const precoAtualNum = Number.parseFloat(precoAtual)
    const taxaCrescimentoNum = Number.parseFloat(taxaCrescimento)
    const taxaCrescimentoPerpetuaNum = Number.parseFloat(taxaCrescimentoPerpetua)
    const taxaDescontoNum = Number.parseFloat(taxaDesconto)
    const acoesEmCirculacaoNum = Number.parseFloat(acoesEmCirculacao)
    const dividendoAnualNum = Number.parseFloat(dividendoAnual)

    // Projetar FCLs para os próximos 10 anos
    const fclsProjetados = []
    let fclAtualProjetado = fclAtualNum

    for (let i = 0; i < 10; i++) {
      fclAtualProjetado *= 1 + taxaCrescimentoNum / 100
      fclsProjetados.push(fclAtualProjetado)
    }

    // Cálculo do valor justo (lógica existente)
    const valorEmpresa = calcularValorEmpresa(
      fclAtualNum,
      taxaCrescimentoNum,
      taxaCrescimentoPerpetuaNum,
      taxaDescontoNum,
    )
    const valorJustoCalculado = valorEmpresa / acoesEmCirculacaoNum
    setValorJusto(valorJustoCalculado)

    // Cálculo do potencial de valorização (lógica existente)
    const potencial = (valorJustoCalculado / precoAtualNum - 1) * 100
    setPotencialValorizacao(potencial)

    // Projetar dividendos para os próximos 5 anos
    const dividendosProjetados = projetarDividendos(dividendoAnualNum, taxaCrescimentoNum, 5)

    // Calcular a TIR
    const tirCalculada = calcularTIRDCF(
      precoAtualNum,
      dividendosProjetados,
      fclsProjetados,
      taxaCrescimentoNum,
      taxaCrescimentoPerpetuaNum,
      taxaDescontoNum,
    )

    // Preparar fluxos de caixa para exibição
    const fluxos = [-precoAtualNum, ...dividendosProjetados]

    // Recalcular o valuation no ponto de saída (Ano 5)
    let valorNoAnoSaida = 0

    // Somar os fluxos de caixa futuros descontados a partir do ano de saída
    for (let t = 6; t <= 10; t++) {
      valorNoAnoSaida += fclsProjetados[t - 1] / Math.pow(1 + taxaDescontoNum / 100, t - 5)
    }

    // Calcular e adicionar o valor terminal descontado
    const fclAno11 = fclsProjetados[9] * (1 + taxaCrescimentoPerpetuaNum / 100)
    const valorTerminal = fclAno11 / (taxaDescontoNum / 100 - taxaCrescimentoPerpetuaNum / 100)
    valorNoAnoSaida += valorTerminal / Math.pow(1 + taxaDescontoNum / 100, 5)

    // Adicionar valor de saída ao último fluxo
    fluxos[5] += valorNoAnoSaida / acoesEmCirculacaoNum

    setFluxosCaixa(fluxos)
    setTir(tirCalculada)

    setCalculado(true)
  }

  // Função para calcular o valor da empresa (lógica existente)
  const calcularValorEmpresa = (
    fclAtual: number,
    taxaCrescimento: number,
    taxaCrescimentoPerpetua: number,
    taxaDesconto: number,
  ) => {
    // Implementação existente do cálculo do valor da empresa
    // Esta é uma implementação simplificada para exemplo
    let valorPresente = 0
    let fclProjetado = fclAtual

    // Calcular valor presente dos fluxos de caixa projetados (10 anos)
    for (let t = 1; t <= 10; t++) {
      fclProjetado *= 1 + taxaCrescimento / 100
      valorPresente += fclProjetado / Math.pow(1 + taxaDesconto / 100, t)
    }

    // Calcular valor terminal
    const fclAno11 = fclProjetado * (1 + taxaCrescimentoPerpetua / 100)
    const valorTerminal = fclAno11 / (taxaDesconto / 100 - taxaCrescimentoPerpetua / 100)

    // Adicionar valor terminal descontado
    valorPresente += valorTerminal / Math.pow(1 + taxaDesconto / 100, 10)

    return valorPresente
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Valuation por DCF</CardTitle>
          <CardDescription>
            Calcule o valor justo de uma ação com base no Fluxo de Caixa Descontado (DCF)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticker">Ticker</Label>
            <Input
              id="ticker"
              placeholder="PETR4"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className={errors.ticker ? "border-red-500" : ""}
            />
            {errors.ticker && <p className="text-red-500 text-sm">{errors.ticker}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fcl-atual">FCL Atual (R$ milhões)</Label>
            <Input
              id="fcl-atual"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={fclAtual}
              onChange={(e) => setFclAtual(e.target.value)}
              className={errors.fclAtual ? "border-red-500" : ""}
            />
            {errors.fclAtual && <p className="text-red-500 text-sm">{errors.fclAtual}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco-atual">Preço Atual (R$)</Label>
            <Input
              id="preco-atual"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={precoAtual}
              onChange={(e) => setPrecoAtual(e.target.value)}
              className={errors.precoAtual ? "border-red-500" : ""}
            />
            {errors.precoAtual && <p className="text-red-500 text-sm">{errors.precoAtual}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxa-crescimento">Taxa de Crescimento (%)</Label>
            <Input
              id="taxa-crescimento"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={taxaCrescimento}
              onChange={(e) => setTaxaCrescimento(e.target.value)}
              className={errors.taxaCrescimento ? "border-red-500" : ""}
            />
            {errors.taxaCrescimento && <p className="text-red-500 text-sm">{errors.taxaCrescimento}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxa-crescimento-perpetua">Taxa de Crescimento Perpétua (%)</Label>
            <Input
              id="taxa-crescimento-perpetua"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={taxaCrescimentoPerpetua}
              onChange={(e) => setTaxaCrescimentoPerpetua(e.target.value)}
              className={errors.taxaCrescimentoPerpetua ? "border-red-500" : ""}
            />
            {errors.taxaCrescimentoPerpetua && <p className="text-red-500 text-sm">{errors.taxaCrescimentoPerpetua}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxa-desconto">Taxa de Desconto (%)</Label>
            <Input
              id="taxa-desconto"
              type="number"
              step="0.1"
              placeholder="0.0"
              value={taxaDesconto}
              onChange={(e) => setTaxaDesconto(e.target.value)}
              className={errors.taxaDesconto ? "border-red-500" : ""}
            />
            {errors.taxaDesconto && <p className="text-red-500 text-sm">{errors.taxaDesconto}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="acoes-circulacao">Ações em Circulação (milhões)</Label>
            <Input
              id="acoes-circulacao"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={acoesEmCirculacao}
              onChange={(e) => setAcoesEmCirculacao(e.target.value)}
              className={errors.acoesEmCirculacao ? "border-red-500" : ""}
            />
            {errors.acoesEmCirculacao && <p className="text-red-500 text-sm">{errors.acoesEmCirculacao}</p>}
          </div>

          {/* Novo campo para dividendos */}
          <DividendoInput value={dividendoAnual} onChange={setDividendoAnual} error={errors.dividendoAnual} />

          <Button onClick={calcular} className="w-full">
            Calcular
          </Button>
        </CardContent>
      </Card>

      {calculado && valorJusto !== null && potencialValorizacao !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado da Avaliação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Valor Justo de {ticker}</h3>
              <p className="text-3xl font-bold">R$ {valorJusto.toFixed(2)}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Potencial de Valorização</h3>
              <p className={`text-2xl font-bold ${potencialValorizacao >= 0 ? "text-green-500" : "text-red-500"}`}>
                {potencialValorizacao.toFixed(2)}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Componente de resultado da TIR */}
      {calculado && tir !== null && (
        <TIRResult tir={tir} fluxos={fluxosCaixa} ticker={ticker} anos={5} tipoInvestimento="acao" />
      )}
    </div>
  )
}
