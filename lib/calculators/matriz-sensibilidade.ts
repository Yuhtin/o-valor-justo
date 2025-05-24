/**
 * Gera uma matriz de sensibilidade para análise de valor justo
 * @param taxaCrescimentoBase Taxa de crescimento base inserida pelo usuário
 * @param taxaDescontoBase Taxa de desconto base inserida pelo usuário
 * @param calculaValorJusto Função que calcula o valor justo com base nas taxas
 * @param precoAtual Preço atual do ativo
 * @returns Matriz de sensibilidade com valores e classificações
 */
export function gerarMatrizSensibilidade(
  taxaCrescimentoBase: number,
  taxaDescontoBase: number,
  calculaValorJusto: (taxaCrescimento: number, taxaDesconto: number) => number,
  precoAtual: number,
) {
  // Define as variações para as taxas
  const variacoes = [-2, -1, 0, 1, 2] // Em pontos percentuais

  // Cria a matriz de resultados
  const matriz = []

  // Gera as linhas (taxas de crescimento)
  for (let i = 0; i < variacoes.length; i++) {
    const linha = []
    const taxaCrescimento = taxaCrescimentoBase + variacoes[i]

    // Gera as colunas (taxas de desconto)
    for (let j = 0; j < variacoes.length; j++) {
      const taxaDesconto = taxaDescontoBase + variacoes[j]

      // Calcula o valor justo com as taxas atuais
      const valorJusto = calculaValorJusto(taxaCrescimento, taxaDesconto)

      // Determina a classificação com base no preço atual
      let classificacao = ""
      if (valorJusto >= precoAtual * 1.15) {
        classificacao = "subavaliada"
      } else if (valorJusto <= precoAtual * 0.85) {
        classificacao = "sobreavaliada"
      } else {
        classificacao = "justa"
      }

      // Adiciona o resultado à linha
      linha.push({
        valor: valorJusto,
        classificacao: classificacao,
      })
    }

    matriz.push({
      taxaCrescimento: taxaCrescimento,
      valores: linha,
    })
  }

  return matriz
}

/**
 * Gera os cabeçalhos para a taxa de desconto
 * @param taxaDescontoBase Taxa de desconto base
 * @returns Array com os valores de cabeçalho formatados
 */
export function gerarCabecalhosTaxaDesconto(taxaDescontoBase: number): string[] {
  return [-2, -1, 0, 1, 2].map((variacao) => {
    return (taxaDescontoBase + variacao).toFixed(1) + "%"
  })
}

/**
 * Gera os cabeçalhos para a taxa de crescimento
 * @param taxaCrescimentoBase Taxa de crescimento base
 * @returns Array com os valores de cabeçalho formatados
 */
export function gerarCabecalhosTaxaCrescimento(taxaCrescimentoBase: number): string[] {
  return [-2, -1, 0, 1, 2].map((variacao) => {
    return (taxaCrescimentoBase + variacao).toFixed(1) + "%"
  })
}
