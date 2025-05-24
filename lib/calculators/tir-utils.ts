/**
 * Função para calcular a TIR (Taxa Interna de Retorno) a partir de uma série de fluxos de caixa
 * usando o método da bissecção
 * @param fluxos Array de fluxos de caixa, começando com o investimento inicial (negativo)
 * @returns Taxa Interna de Retorno em percentual ou null se não convergir
 */
export function calcularTIRDosFluxos(fluxos: number[]): number | null {
  // Função que calcula a TIR usando o método da bissecção
  // Assegure-se que esta função seja chamada com os fluxos de caixa corretos

  // Verificação inicial dos fluxos
  if (!fluxos || fluxos.length < 2) {
    console.error("Fluxos inválidos para cálculo da TIR")
    return null
  }

  // Imprimir os fluxos para debug
  console.log("Fluxos para cálculo da TIR:", fluxos)

  // Verificar se há pelo menos um valor negativo e um positivo
  let temNegativo = false
  let temPositivo = false

  for (let i = 0; i < fluxos.length; i++) {
    if (fluxos[i] < 0) temNegativo = true
    if (fluxos[i] > 0) temPositivo = true
  }

  if (!temNegativo || !temPositivo) {
    console.error("Impossível calcular TIR: necessário ter fluxos positivos e negativos")
    return null
  }

  // Implementação do método da bissecção para encontrar a TIR
  let taxaMin = -0.99 // -99%
  let taxaMax = 10.0 // 1000%
  let taxaMeio
  let vplMeio
  const precisao = 0.0001
  const maxIteracoes = 1000 // Aumentado o número de iterações

  // Função para calcular o VPL com uma determinada taxa
  function calcularVPL(taxa: number): number {
    let vpl = 0
    for (let i = 0; i < fluxos.length; i++) {
      vpl += fluxos[i] / Math.pow(1 + taxa, i)
    }
    return vpl
  }

  // Verificar os limites
  let vplMin = calcularVPL(taxaMin)
  let vplMax = calcularVPL(taxaMax)

  // Verificar se há mudança de sinal (condição para existência da TIR)
  if (vplMin * vplMax > 0) {
    console.error("Não foi possível encontrar a TIR: sem mudança de sinal no intervalo")
    return null
  }

  // Método da bissecção
  for (let i = 0; i < maxIteracoes; i++) {
    taxaMeio = (taxaMin + taxaMax) / 2
    vplMeio = calcularVPL(taxaMeio)

    // Log para debug
    if (i % 100 === 0) {
      console.log(`Iteração ${i}: Taxa = ${taxaMeio}, VPL = ${vplMeio}`)
    }

    if (Math.abs(vplMeio) < precisao) {
      console.log(`TIR encontrada: ${taxaMeio * 100}% após ${i} iterações`)
      return taxaMeio * 100 // Convertendo para percentual
    }

    if (vplMeio * vplMin < 0) {
      taxaMax = taxaMeio
      vplMax = vplMeio
    } else {
      taxaMin = taxaMeio
      vplMin = vplMeio
    }
  }

  // Se chegou aqui, não convergiu com a precisão desejada, mas retorna a melhor aproximação
  console.log(`TIR aproximada: ${taxaMeio * 100}% (não convergiu com a precisão desejada)`)
  return taxaMeio * 100 // Convertendo para percentual
}

/**
 * Função para projetar dividendos futuros com base em uma taxa de crescimento
 * @param dividendoInicial Dividendo do ano inicial
 * @param taxaCrescimento Taxa de crescimento anual em percentual
 * @param anos Número de anos para projetar
 * @returns Array com os dividendos projetados
 */
export function projetarDividendos(dividendoInicial: number, taxaCrescimento: number, anos: number): number[] {
  const dividendos: number[] = []
  let dividendoAtual = dividendoInicial

  for (let i = 0; i < anos; i++) {
    dividendoAtual *= 1 + taxaCrescimento / 100
    dividendos.push(dividendoAtual)
  }

  return dividendos
}

/**
 * Calcula a TIR para investimento em FIIs
 * @param precoAtual Preço atual da cota
 * @param dividendos Array com os dividendos projetados para os próximos anos
 * @param taxaCrescimentoPerpetua Taxa de crescimento perpétua em percentual
 * @param taxaDesconto Taxa de desconto em percentual
 * @param anoSaida Ano de saída do investimento (padrão: 3)
 * @returns TIR em percentual ou null se não convergir
 */
export function calcularTIRFII(
  precoAtual: number,
  dividendos: number[],
  taxaCrescimentoPerpetua: number,
  taxaDesconto: number,
  anoSaida = 3,
): number | null {
  // Preço de compra é negativo (saída de caixa)
  const fluxos: number[] = [-precoAtual]

  // Adicionar fluxos de dividendos para cada ano até a saída
  for (let ano = 1; ano <= anoSaida; ano++) {
    fluxos.push(dividendos[ano - 1])
  }

  // Calcular valor de saída (venda do ativo)
  const dividendoProximoAno = dividendos[anoSaida - 1] * (1 + taxaCrescimentoPerpetua / 100)
  const valorSaida = dividendoProximoAno / (taxaDesconto / 100 - taxaCrescimentoPerpetua / 100)

  // Adicionar valor de saída ao último fluxo
  fluxos[anoSaida] += valorSaida

  // Calcular TIR
  return calcularTIRDosFluxos(fluxos)
}

/**
 * Calcula a TIR para investimento em ações usando o modelo LPA
 * @param precoAtual Preço atual da ação
 * @param dividendos Array com os dividendos projetados para os próximos anos
 * @param valorTerminal Valor terminal calculado
 * @param anoSaida Ano de saída do investimento (padrão: 5)
 * @returns TIR em percentual ou null se não convergir
 */
export function calcularTIRAcaoLPA(
  precoAtual: number,
  dividendos: number[],
  valorTerminal: number,
  anoSaida = 5,
): number | null {
  // Preço de compra é negativo (saída de caixa)
  const fluxos: number[] = [-precoAtual]

  // Adicionar fluxos de dividendos para cada ano até a saída
  for (let ano = 1; ano <= anoSaida; ano++) {
    fluxos.push(dividendos[ano - 1])
  }

  // Usar o valor terminal já calculado como valor de saída no ano final
  fluxos[anoSaida] += valorTerminal

  // Calcular TIR
  return calcularTIRDosFluxos(fluxos)
}

/**
 * Calcula a TIR para investimento em ações usando o modelo DCF
 * @param precoAtual Preço atual da ação
 * @param dividendos Array com os dividendos projetados para os próximos anos
 * @param fcls Array com os fluxos de caixa livres projetados
 * @param taxaCrescimento Taxa de crescimento em percentual
 * @param taxaCrescimentoPerpetua Taxa de crescimento perpétua em percentual
 * @param taxaDesconto Taxa de desconto em percentual
 * @param anoSaida Ano de saída do investimento (padrão: 5)
 * @returns TIR em percentual ou null se não convergir
 */
export function calcularTIRDCF(
  precoAtual: number,
  dividendos: number[],
  fcls: number[],
  taxaCrescimento: number,
  taxaCrescimentoPerpetua: number,
  taxaDesconto: number,
  anoSaida = 5,
): number | null {
  // Preço de compra é negativo (saída de caixa)
  const fluxos: number[] = [-precoAtual]

  // Adicionar fluxos de dividendos para cada ano até a saída
  for (let ano = 1; ano <= anoSaida; ano++) {
    fluxos.push(dividendos[ano - 1])
  }

  // Recalcular o valuation no ponto de saída (Ano 5)
  // Este será o novo Ano 0 a partir do qual descontamos os fluxos futuros
  let valorNoAnoSaida = 0

  // Somar os fluxos de caixa futuros descontados a partir do ano de saída
  for (let t = anoSaida + 1; t <= 10; t++) {
    valorNoAnoSaida += fcls[t - 1] / Math.pow(1 + taxaDesconto / 100, t - anoSaida)
  }

  // Calcular e adicionar o valor terminal descontado
  const fclAno11 = fcls[9] * (1 + taxaCrescimentoPerpetua / 100)
  const valorTerminal = fclAno11 / (taxaDesconto / 100 - taxaCrescimentoPerpetua / 100)
  valorNoAnoSaida += valorTerminal / Math.pow(1 + taxaDesconto / 100, 10 - anoSaida)

  // Adicionar valor de saída ao último fluxo
  fluxos[anoSaida] += valorNoAnoSaida

  // Calcular TIR usando o método da bissecção
  return calcularTIRDosFluxos(fluxos)
}

/**
 * Formata um número para o padrão brasileiro
 * @param valor Valor a ser formatado
 * @param casasDecimais Número de casas decimais (padrão: 2)
 * @returns String formatada
 */
export function formatarNumero(valor: number, casasDecimais = 2): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  })
}
