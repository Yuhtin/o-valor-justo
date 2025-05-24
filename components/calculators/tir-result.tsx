"use client"

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"
import { InfoIcon as InfoCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TIRResultProps {
  tir: number | null
  fluxos: number[]
  ticker: string
  anos: number
  tipoInvestimento: "acao" | "fii"
}

export function TIRResult({ tir, fluxos, ticker, anos, tipoInvestimento }: TIRResultProps) {
  const [detalhesAbertos, setDetalhesAbertos] = useState(false)

  if (tir === null) {
    return (
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-medium mb-2">
          Qual o retorno anual esperado para {tipoInvestimento === "acao" ? "essa ação" : "esse FII"}?
        </h3>
        <p className="text-sm mb-2">Considerando um investimento de {anos} anos, pelas suas premissas:</p>
        <p className="text-red-500 font-semibold">Não foi possível calcular a TIR com as premissas fornecidas.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Isso pode ocorrer quando os fluxos de caixa projetados não são suficientes para recuperar o investimento
          inicial.
        </p>
      </div>
    )
  }

  // Formatar TIR com duas casas decimais
  const tirFormatada = tir.toFixed(2)

  // Calcular diferença em relação ao IPCA (considerado 5%)
  const diferencaIPCA = tir > 5 ? (tir - 5).toFixed(2) : null

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
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-medium mb-2">
        Qual o retorno anual esperado para {tipoInvestimento === "acao" ? "essa ação" : "esse FII"}?
      </h3>
      <p className="text-sm mb-4">
        Considerando um investimento de {anos} anos, pelas suas premissas, você obterá a seguinte taxa interna de
        retorno:
      </p>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
          <div className="flex items-center gap-2 mb-1 md:mb-0">
            <span className="text-md">Retorno anual esperado (TIR) = </span>
            <span className={`text-xl font-bold ${corResultado}`}>{tirFormatada}%</span>
          </div>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <InfoCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Taxa que iguala o valor presente dos fluxos futuros ao investimento inicial</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>

        {diferencaIPCA && (
          <p className="text-md">
            Investir em <span className="font-semibold">{ticker}</span> é equivalente a comprar um título que paga{" "}
            <span className="font-bold">IPCA + {diferencaIPCA}%</span>
          </p>
        )}

        <div className="pt-2">
          <h4 className="text-sm md:text-md font-medium mb-2">Fluxos de Caixa Projetados</h4>
          <div className="h-[200px] md:h-[250px] -mx-4 md:mx-0 px-2 md:px-0">
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
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="valor" name="Valor (R$)" fill="var(--color-fluxos)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="outline"
            onClick={() => setDetalhesAbertos(!detalhesAbertos)}
            className="text-xs md:text-sm py-1 px-2 md:py-2 md:px-4"
          >
            {detalhesAbertos ? "Ocultar detalhes" : "Expandir detalhes"}
          </Button>

          {detalhesAbertos && (
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-right">Fluxo de Caixa (R$)</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fluxos.map((fluxo, index) => (
                    <TableRow key={index}>
                      <TableCell>{index === 0 ? "Ano 0" : `Ano ${index}`}</TableCell>
                      <TableCell className="text-right font-medium">{fluxo.toFixed(2)}</TableCell>
                      <TableCell>
                        {index === 0
                          ? "Investimento inicial"
                          : index === anos
                            ? `Dividendo + Valor de saída`
                            : "Dividendo"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          A TIR calculada é uma projeção baseada em premissas definidas pelo usuário e não representa garantia de
          retorno.
        </p>
      </div>
    </div>
  )
}
