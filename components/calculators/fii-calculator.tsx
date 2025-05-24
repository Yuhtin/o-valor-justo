"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TIRResult } from "./tir-result"
import { calcularTIRFII } from "@/lib/calculators/tir-utils"

// Componente existente modificado para incluir o cálculo da TIR
export function FIICalculator() {
  // Estados existentes
  const [ticker, setTicker] = useState("")
  const [dividendoMensal, setDividendoMensal] = useState("")
  const [precoAtual, setPrecoAtual] = useState("")
  const [taxaCrescimento, setTaxaCrescimento] = useState("")
  const [taxaDesconto, setTaxaDesconto] = useState("")
  const [valorJusto, setValorJusto] = useState<number | null>(null)
  const [potencialValorizacao, setPotencialValorizacao] = useState<number | null>(null)

  // Novos estados para o cálculo da TIR
  const [tir, setTir] = useState<number | null>(null)
  const [fluxosCaixa, setFluxosCaixa] = useState<number[]>([])

  // Estados para validação
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [calculado, setCalculado] = useState(false)

  // Função para validar os inputs
  const validarInputs = () => {
    const newErrors: Record<string, string> = {}

    if (!ticker) newErrors.ticker = "Ticker é obrigatório"
    if (!dividendoMensal) newErrors.dividendoMensal = "Dividendo mensal é obrigatório"
    if (!precoAtual) newErrors.precoAtual = "Preço atual é obrigatório"
    if (!taxaCrescimento) newErrors.taxaCrescimento = "Taxa de crescimento é obrigatória"
    if (!taxaDesconto) newErrors.taxaDesconto = "Taxa de desconto é obrigatória"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Função para calcular o valor justo e a TIR
  const calcular = () => {
    if (!validarInputs()) return

    // Converter inputs para números
    const dividendoMensalNum = Number.parseFloat(dividendoMensal)
    const precoAtualNum = Number.parseFloat(precoAtual)
    const taxaCrescimentoNum = Number.parseFloat(taxaCrescimento)
    const taxaDescontoNum = Number.parseFloat(taxaDesconto)

    // Calcular dividendo anual
    const dividendoAnual = dividendoMensalNum * 12

    // Cálculo do valor justo (lógica existente)
    const valorJustoCalculado = calcularValorJusto(dividendoAnual, taxaCrescimentoNum, taxaDescontoNum)
    setValorJusto(valorJustoCalculado)

    // Cálculo do potencial de valorização (lógica existente)
    const potencial = (valorJustoCalculado / precoAtualNum - 1) * 100
    setPotencialValorizacao(potencial)

    // Projetar dividendos para os próximos 3 anos
    const dividendosProjetados = []
    let dividendoAtual = dividendoAnual

    for (let i = 0; i < 3; i++) {
      dividendoAtual *= 1 + taxaCrescimentoNum / 100
      dividendosProjetados.push(dividendoAtual)
    }

    // Calcular valor de saída (venda do ativo no ano 3)
    const dividendoProximoAno = dividendosProjetados[2] * (1 + taxaCrescimentoNum / 100)
    const valorSaida = dividendoProximoAno / (taxaDescontoNum / 100 - taxaCrescimentoNum / 100)

    // Calcular a TIR
    const fluxos = [-precoAtualNum, ...dividendosProjetados]
    fluxos[3] += valorSaida // Adicionar valor de saída no ano 3

    setFluxosCaixa(fluxos)
    setTir(calcularTIRFII(precoAtualNum, dividendosProjetados, taxaCrescimentoNum, taxaDescontoNum))

    setCalculado(true)
  }

  // Função para calcular o valor justo (lógica existente)
  const calcularValorJusto = (dividendoAnual: number, taxaCrescimento: number, taxaDesconto: number) => {
    // Implementação existente do cálculo do valor justo
    // Esta é uma implementação simplificada para exemplo
    const dividendoProximoAno = dividendoAnual * (1 + taxaCrescimento / 100)
    return dividendoProximoAno / (taxaDesconto / 100 - taxaCrescimento / 100)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Valuation de FIIs</CardTitle>
          <CardDescription>Calcule o valor justo de um FII com base nos dividendos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ticker">Ticker</Label>
            <Input
              id="ticker"
              placeholder="KNRI11"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className={errors.ticker ? "border-red-500" : ""}
            />
            {errors.ticker && <p className="text-red-500 text-sm">{errors.ticker}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dividendo-mensal">Dividendo Mensal (R$)</Label>
            <Input
              id="dividendo-mensal"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={dividendoMensal}
              onChange={(e) => setDividendoMensal(e.target.value)}
              className={errors.dividendoMensal ? "border-red-500" : ""}
            />
            {errors.dividendoMensal && <p className="text-red-500 text-sm">{errors.dividendoMensal}</p>}
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
        <TIRResult tir={tir} fluxos={fluxosCaixa} ticker={ticker} anos={3} tipoInvestimento="fii" />
      )}
    </div>
  )
}
