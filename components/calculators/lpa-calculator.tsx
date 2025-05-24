"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DividendoInput } from "./dividendo-input"
import { TIRResult } from "./tir-result"
import { calcularTIRAcaoLPA, projetarDividendos } from "@/lib/calculators/tir-utils"

// Componente existente modificado para incluir o cálculo da TIR
export function LPACalculator() {
  // Estados existentes
  const [ticker, setTicker] = useState("")
  const [lpaAtual, setLpaAtual] = useState("")
  const [precoAtual, setPrecoAtual] = useState("")
  const [taxaCrescimento, setTaxaCrescimento] = useState("")
  const [taxaDesconto, setTaxaDesconto] = useState("")
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
    if (!lpaAtual) newErrors.lpaAtual = "LPA atual é obrigatório"
    if (!precoAtual) newErrors.precoAtual = "Preço atual é obrigatório"
    if (!taxaCrescimento) newErrors.taxaCrescimento = "Taxa de crescimento é obrigatória"
    if (!taxaDesconto) newErrors.taxaDesconto = "Taxa de desconto é obrigatória"
    if (!dividendoAnual) newErrors.dividendoAnual = "Dividendo anual é obrigatório"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para calcular o valor justo e a TIR
  const calcular = () => {
    if (!validarInputs()) return

    // Converter inputs para números
    const lpaAtualNum = Number.parseFloat(lpaAtual)
    const precoAtualNum = Number.parseFloat(precoAtual)
    const taxaCrescimentoNum = Number.parseFloat(taxaCrescimento)
    const taxaDescontoNum = Number.parseFloat(taxaDesconto)
    const dividendoAnualNum = Number.parseFloat(dividendoAnual)

    // Cálculo do valor justo (lógica existente)
    const valorJustoCalculado = calcularValorJusto(lpaAtualNum, taxaCrescimentoNum, taxaDescontoNum)
    setValorJusto(valorJustoCalculado)

    // Cálculo do potencial de valorização (lógica existente)
    const potencial = (valorJustoCalculado / precoAtualNum - 1) * 100
    setPotencialValorizacao(potencial)

    // Projetar dividendos para os próximos 5 anos
    const dividendosProjetados = projetarDividendos(dividendoAnualNum, taxaCrescimentoNum, 5)

    // Calcular a TIR
    const fluxos = [-precoAtualNum, ...dividendosProjetados]
    fluxos[5] += valorJustoCalculado // Adicionar valor terminal no ano 5

    setFluxosCaixa(fluxos)
    setTir(calcularTIRAcaoLPA(precoAtualNum, dividendosProjetados, valorJustoCalculado))

    setCalculado(true)
  }

  // Função para calcular o valor justo (lógica existente)
  const calcularValorJusto = (lpa: number, taxaCrescimento: number, taxaDesconto: number) => {
    // Implementação existente do cálculo do valor justo
    // Esta é uma implementação simplificada para exemplo
    return (lpa * (1 + taxaCrescimento / 100)) / (taxaDesconto / 100 - taxaCrescimento / 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Valuation por LPA</CardTitle>
          <CardDescription>Calcule o valor justo de uma ação com base no Lucro por Ação (LPA)</CardDescription>
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
            <Label htmlFor="lpa-atual">LPA Atual (R$)</Label>
            <Input
              id="lpa-atual"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={lpaAtual}
              onChange={(e) => setLpaAtual(e.target.value)}
              className={errors.lpaAtual ? "border-red-500" : ""}
            />
            {errors.lpaAtual && <p className="text-red-500 text-sm">{errors.lpaAtual}</p>}
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
