"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { formatarNumero } from "@/lib/calculators/tir-utils"

interface TIRSectionProps {
  tir: number | null
  fluxos: number[]
  ticker: string
  anos: number
  tipoInvestimento: "acao" | "fii"
}

export function TIRSection({ tir, fluxos, ticker, anos, tipoInvestimento }: TIRSectionProps) {
  const [detalhesAbertos, setDetalhesAbertos] = useState(false)

  if (!fluxos || fluxos.length === 0) {
    return null
  }

  if (tir === null) {
    return (
      <div className="mt-4">
        <h3 className="font-medium mb-2">
          Qual o retorno anual esperado para {tipoInvestimento === "acao" ? "essa ação" : "esse FII"}?
        </h3>
        <p className="text-sm mb-2">Considerando um investimento de {anos} anos, pelas suas premissas:</p>
        <p className="text-red-500 font-medium">Não foi possível calcular a TIR com as premissas fornecidas.</p>
        <p className="text-sm text-gray-500 mt-2">
          Isso pode ocorrer quando os fluxos de caixa projetados não são suficientes para recuperar o investimento
          inicial.
        </p>
      </div>
    )
  }

  // Formatar TIR com duas casas decimais
  const tirFormatada = formatarNumero(tir, 2)

  // Calcular diferença em relação ao IPCA (considerado 5%)
  const diferencaIPCA = tir > 5 ? formatarNumero(tir - 5, 2) : null

  // Determinar a cor do resultado com base no valor da TIR
  let corResultado = "text-yellow-500"
  if (tir >= 12) {
    corResultado = "text-green-500"
  } else if (tir < 8) {
    corResultado = "text-red-500"
  }

  // Preparar dados para o gráfico
  const dadosGrafico = fluxos.map((valor, index) => ({
    ano: index === 0 ? "Investimento" : `Ano ${index}`,
    valor: valor,
  }))

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
      <div className="pt-2">
        <h4 className="text-xs md:text-sm font-medium mb-2">Fluxos de Caixa Projetados</h4>
        <div className="h-[180px] md:h-[200px] -mx-4 md:mx-0 px-2 md:px-0">
          <ChartContainer
            config={{
              fluxos: {
                label: "Fluxos de Caixa",
                color: "hsl(152, 76%, 36%)",
              },
            }}
            className="h-full"
          >
            <BarChart data={dadosGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis tickFormatter={(value) => formatarNumero(value, 0)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="valor" name="Valor (R$)" fill="var(--color-fluxos)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      <div className="pt-2">
        <button
          onClick={() => setDetalhesAbertos(!detalhesAbertos)}
          className="text-xs text-[#0d9f6f] hover:underline inline-block py-1 px-1"
        >
          {detalhesAbertos ? "Ocultar detalhes" : "Expandir detalhes"}
        </button>

        {detalhesAbertos && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-1">Período</th>
                  <th className="border border-gray-200 p-1 text-right">Fluxo de Caixa (R$)</th>
                  <th className="border border-gray-200 p-1">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {fluxos.map((fluxo, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="border border-gray-200 p-1">{index === 0 ? "Ano 0" : `Ano ${index}`}</td>
                    <td className="border border-gray-200 p-1 text-right font-medium">{formatarNumero(fluxo, 2)}</td>
                    <td className="border border-gray-200 p-1">
                      {index === 0
                        ? "Investimento inicial"
                        : index === anos
                          ? `Dividendo + Valor de saída`
                          : "Dividendo"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2">
        A TIR calculada é uma projeção baseada em premissas definidas pelo usuário e não representa garantia de retorno.
      </p>
    </div>
  )
}
