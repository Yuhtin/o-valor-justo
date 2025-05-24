"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import Head from "next/head"

// Dados reais para os artigos
const artigos = [
  {
    id: 1,
    titulo: "Quem somos?",
    resumo: "Qual é o propósito por trás do Valor Justo?",
    categoria: "Institucional",
    data: "16 de abril de 2025",
    imagem: "/images/valor-justo-logo.png",
    slug: "quem-somos",
    conteudo: `
     <h2>O Propósito do Valor Justo</h2>
     <p>O Valor Justo surgiu com o propósito de transformar a forma que o investidor pessoa física escolhe ações no Brasil. Acreditamos que é possível trazer de forma simples e objetiva análises e indicadores utilizados pelos analistas e gestores do mercado financeiro na palma da sua mão, e assim lançamos nossa plataforma.</p>
     
     <h2>Por que Valor Justo?</h2>
     <p>Seguimos a filosofia do Value Investing, e entendemos que não basta somente entender a qualidade do ativo que queremos investir, é necessário entender a diferença entre o preço no qual podemos comprar o ativo e o valor intrínseco dele, o que está além do preço de tela, para tomar as melhores decisões de investimentos.</p>
     
     <p>Usamos o lema <strong>"todo amador confunde a diferença entre preço e valor"</strong> como motivação para trazer conteúdos valiosos para o investidor individual.</p>
     
     <p>Estamos apenas no começo da nossa jornada para mudar a forma que o investidor brasileiro analisa ações!</p>
   `,
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
    conteudo: `
     <h2>O que é Custo de Capital?</h2>
     <p>O custo de capital é uma métrica essencial para analisar e fazer o valuation de uma empresa, bem como para avaliar qualquer alocação de capital em todos os aspectos. Podemos dizer que o custo de capital é a taxa mínima de retorno que uma empresa deve gerar em seus projetos para compensar quem investe nela. Em outras palavras, é o retorno que o investidor poderia obter na sua melhor alternativa disponível – seu custo de oportunidade.</p>
     
     <h2>Custo de Oportunidade</h2>
     <p>Podemos entender custo de oportunidade como "o retorno mínimo aceitável para fazer um investimento".</p>
     
     <p><strong>Exemplo prático:</strong> no Brasil, o investimento sem risco seriam os títulos do tesouro direto (pode-se usar o tesouro Selic ou o Prefixado). Se você aplica na Selic e ganha, digamos, 12% ao ano, qualquer outro investimento com maior risco precisa oferecer mais que 12% para valer a pena.</p>
     
     <p>Assim, imagine que você irá abrir uma loja de roupas, e a sua estimativa de retorno anual é de 10% ao ano, nesse caso alocar seu capital na abertura dessa loja é uma alocação de capital mal feita, já que o retorno esperado é inferior aos 12% (taxa básica de juros no exemplo) que você consegue obter em um investimento sem risco.</p>
     
     <h2>Custo da Dívida (Kd)</h2>
     <p>As empresas não possuem apenas capital dos donos investidos na operação, em boa parte dos casos possuem dívidas, e o custo dessa dívida deve ser considerado no custo de capital. Assim, o custo da dívida (Kd) é o juros efetivo que a empresa paga pelos empréstimos, após considerar o benefício fiscal dos juros.</p>
     
     <p><strong>Passo 1:</strong> encontre o rendimento (yield to maturity) dos títulos de dívida da empresa. Esse dado pode ser facilmente encontrado nos releases de resultados trimestrais ou no formulário de referência das empresas da bolsa, que você encontra nos sites de relações com investidores.</p>
     
     <p><strong>Passo 2:</strong> calcule o custo líquido de impostos:<br>
     Kd (líquido) = Kd (bruto) × (1 – alíquota marginal de IR).</p>
     
     <p>Se a alíquota for 34% (alíquota padrão para as empresas da bolsa brasileira) e o juro bruto 10%, então Kd líquido = 10% × 0,66 = 6,6%.</p>
     
     <h2>Custo do Capital Próprio (Ke)</h2>
     <p>Reflete o retorno exigido pelos acionistas, na prática é a mesma coisa que o custo de oportunidade, já que o acionista toma um risco maior que o credor ao investir na empresa. O método mais usado no mercado para calcular o Ke é o CAPM:</p>
     
     <p>Ke = Taxa livre de risco + β × (Prêmio de risco de mercado).</p>
     
     <ul>
       <li>Taxa livre de risco: Rentabilidade do Tesouro Prefixado de longo prazo (ex.: 10 anos).</li>
       <li>β (beta): mede a sensibilidade da ação ao mercado.</li>
       <li>Prêmio de risco de mercado: diferença esperada entre retorno de ações e da taxa livre de risco (geralmente de 4% a 6%).</li>
     </ul>
     
     <h3>O CAPM é a única forma de calcular o Ke?</h3>
     <p>Não. O CAPM é um modelo que constitui a teoria dos mercados eficientes, essa teoria infere que o mercado de ações é eficiente em precificar os ativos de acordo com o seu real valor. Nós do Valor Justo não seguimos fielmente esse modelo, e aconselhamos que você use uma abordagem mais simples.</p>
     
     <p><strong>Ke = Taxa livre de risco + Prêmio de risco Próprio</strong></p>
     
     <ul>
       <li>Taxa livre de risco: Rentabilidade do Tesouro Prefixado de longo prazo (ex.: 10 anos).</li>
       <li>Prêmio de risco Próprio: Basicamente, seja arbitrário e defina um prêmio pelo risco que você atribui a essa empresa, então vamo supor que você está analisando uma companhia que é mais arriscada e você decide que gostaria de ter um retorno no mínimo 7% acima da taxa livre de risco, então esse seria seu Ke.</li>
     </ul>
     
     <p>Outra abordagem amplamente utilizada no mercado que gostamos bastante é utilizar um "retorno real desejado", em que você basicamente definirá o retorno acima da inflação que você deseja obter por estar correndo o risco de investir nessa ação. Por exemplo: IPCA + 10%.</p>
     
     <h2>WACC – Custo Médio Ponderado de Capital</h2>
     <p>Quando a empresa se financia com dívida e capital próprio, o custo de capital final é a média ponderada desses custos, segundo a participação de cada fonte no total de recursos:</p>
     
     <p><strong>WACC = (E/V) × Ke + (D/V) × Kd (líquido)</strong></p>
     
     <ul>
       <li>E = valor de mercado da companhia</li>
       <li>D = Dívida Bruta</li>
       <li>V = E + D (valor total da empresa)</li>
     </ul>
     
     <p><strong>Exemplo:</strong><br>
     70% equity, 30% dívida; Ke = 15%; Kd líquido = 7,5%<br>
     WACC = 0,70×15% + 0,30×7,5% = 10,5% + 2,25% = 12,75%.</p>
     
     <h2>Abordagem Simplificada</h2>
     <p>Uma abordagem simples que lhe ajudará a fazer valuations mais rápidos com o valor justo é assumir o WACC sendo igual ao Custo do Capital Próprio (Ke), assim você não irá distorcer o seu custo de capital negativamente, tende a usar um custo de capital um pouco mais alto que o normal, e assim irá calcular seu valuation com uma menor margem para você "errar para cima".</p>
     
     <h2>Como o Custo de Capital Impacta o Valuation</h2>
     <p>O valuation é o processo de estimar quanto vale hoje uma empresa, trazendo fluxos de caixa futuros ao valor presente usando o WACC.</p>
     
     <ul>
       <li>Fluxos de caixa futuros: projeções de dinheiro que a empresa vai gerar.</li>
       <li>Desconto com WACC: aplicamos o custo de capital para trazer esses valores para hoje.</li>
       <li>Valor presente: soma dos fluxos descontados, que representa o valor estimado da empresa.</li>
     </ul>
     
     <h3>Cuidado importante:</h3>
     <p>Se você usar um custo de capital muito baixo, o desconto será fraco e o valuation ficará inflado. Isso pode dar a falsa impressão de que a empresa vale mais do que realmente vale, levando a decisões de investimento arriscadas. Sempre justifique bem o WACC que usar e teste cenários com taxas maiores para ver o efeito no valor estimado. (O nosso site faz o teste com taxas de desconto maior de forma automática!)</p>
     
     <p><strong>Exemplo simplificado:</strong><br>
     Empresa A gera R$ 100 de caixa por ano, para sempre.<br>
     Se o WACC for 10%, valor = 100 ÷ 10% = R$ 1.000.<br>
     Se o WACC for 20%, valor = 100 ÷ 20% = R$ 500.</p>
     
     <h2>Conclusão</h2>
     <p>O custo de capital é a porta de entrada para saber se um investimento cria valor. Ele afeta diretamente o valuation, podemos generalizar como:</p>
     
     <ul>
       <li>WACC baixo → valuation mais alto</li>
       <li>WACC alto → valuation mais baixo</li>
     </ul>
     
     <p>Isso explica em boa parte o fato dos ativos da bolsa americana tem múltiplos (Preço/Lucro, EV/EBITDA) maiores que os brasileiros, já que o custo de capital nos Estados Unidos é menor que no Brasil. Bem como, explica o fato que com as taxas de juro mais altas o mercado fica mais pessimista ao olhar para as ações.</p>
     
     <p>Além disso, o valuation não depende só do WACC, mas também da qualidade das projeções de fluxo de caixa e de premissas realistas. Uma análise completa combina uma taxa de desconto bem fundamentada e estimativas de resultados futuros sólidas para evitar surpresas e decisões mal fundamentadas.</p>
   `,
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
    conteudo: `
     <h2>O que é Valuation?</h2>
     <p>Valuation é o processo de descobrir quanto vale hoje uma empresa, projeto ou ativo, com base no dinheiro que ele vai gerar no futuro. Um dos métodos mais usados para isso é o Fluxo de Caixa Descontado (DCF). Neste artigo, vamos explicar de forma simples o que é valuation e como funciona um DCF.</p>
     
     <p>Valuation é como uma "avaliação do preço justo" de um negócio. Imagine que você quer comprar uma padaria: quanto você pagaria por ela? Você precisa saber quanto ela vai gerar de caixa nos próximos anos e então calcular um preço justo hoje.</p>
     
     <h2>Por que fazer valuation?</h2>
     <ul>
       <li><strong>Comprar ações:</strong> entender se o preço atual está barato ou caro.</li>
       <li><strong>Vender empresa:</strong> definir um preço mínimo aceitável.</li>
       <li><strong>Decidir projetos:</strong> avaliar se vale a pena investir em uma nova linha de produção.</li>
     </ul>
     
     <h2>Principais métodos de valuation</h2>
     <ul>
       <li><strong>Múltiplos de mercado:</strong> usa indicadores como P/L (preço sobre lucro) ou EV/EBITDA comparando empresas semelhantes, e com múltiplos históricos da ação analisada.</li>
       <li><strong>Fluxo de Caixa Descontado (DCF):</strong> traz projeções de caixa ao valor presente usando uma taxa de desconto (WACC).</li>
       <li><strong>Avaliação por ativos (Net Asset Value):</strong> soma o valor de mercado dos bens da empresa (imóveis, máquinas, estoque, participação em outras companhias).</li>
     </ul>
     
     <p>No Valor Justo os modelos disponíveis no site são adaptações do modelo de Fluxo de Caixa Descontado.</p>
     
     <h2>O que é DCF (Fluxo de Caixa Descontado)?</h2>
     <p>O DCF é um modelo que estima o valor de uma empresa com base nos fluxos de caixa futuros que ela deve gerar, trazidos para o valor de hoje.</p>
     
     <h3>Passo a passo de um DCF simples:</h3>
     <ol>
       <li>Projete o fluxo de caixa livre (FCL) para os próximos anos (ex.: 5 anos).<br>
       FCL = Lucro operacional + Depreciação – Investimentos (CAPEX) – Variação de capital de giro.</li>
       
       <li>Escolha a taxa de desconto (WACC), que reflete o custo de capital médio da empresa.</li>
       
       <li>Desconte cada fluxo de caixa:<br>
       Valor presente do FCL no ano t = FCLt ÷ (1 + WACC)^t</li>
       
       <li>Calcule o valor terminal (valor da perpetuidade) para capturar os fluxos após o período de projeção:<br>
       Valor terminal = FCLn × (1 + g) ÷ (WACC – g)<br>
       g = taxa de crescimento de longo prazo (o ideal é usar a inflação).<br>
       FCLn = Fluxo de caixa do Último ano da projeção<br>
       n = Último ano da projeção</li>
       
       <li>Desconte o valor terminal ao valor presente:<br>
       Valor presente do terminal = Valor terminal ÷ (1 + WACC)^n</li>
       
       <li>Some todos os fluxos trazidos a valor presente:<br>
       Valor da empresa = Σ (FCL descontado) + (Valor terminal descontado)</li>
     </ol>
     
     <h2>Exemplo Prático</h2>
     <p>Suponha uma empresa que gera R$ 50 de FCL no ano 1, crescendo 10% ao ano, por 5 anos, com WACC de 12% e g = 3%:</p>
     
     <table class="w-full border-collapse border border-gray-300 my-4">
       <thead>
         <tr class="bg-gray-100">
           <th class="border border-gray-300 px-4 py-2">Ano</th>
           <th class="border border-gray-300 px-4 py-2">FCL projetado</th>
           <th class="border border-gray-300 px-4 py-2">Desconto (1+12%)ⁿ</th>
           <th class="border border-gray-300 px-4 py-2">FCL descontado</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td class="border border-gray-300 px-4 py-2">1</td>
           <td class="border border-gray-300 px-4 py-2">50,0</td>
           <td class="border border-gray-300 px-4 py-2">1,12</td>
           <td class="border border-gray-300 px-4 py-2">44,6</td>
         </tr>
         <tr>
           <td class="border border-gray-300 px-4 py-2">2</td>
           <td class="border border-gray-300 px-4 py-2">55,0</td>
           <td class="border border-gray-300 px-4 py-2">1,25</td>
           <td class="border border-gray-300 px-4 py-2">44,0</td>
         </tr>
         <tr>
           <td class="border border-gray-300 px-4 py-2">3</td>
           <td class="border border-gray-300 px-4 py-2">60,5</td>
           <td class="border border-gray-300 px-4 py-2">1,40</td>
           <td class="border border-gray-300 px-4 py-2">43,2</td>
         </tr>
         <tr>
           <td class="border border-gray-300 px-4 py-2">4</td>
           <td class="border border-gray-300 px-4 py-2">66,6</td>
           <td class="border border-gray-300 px-4 py-2">1,57</td>
           <td class="border border-gray-300 px-4 py-2">42,4</td>
         </tr>
         <tr>
           <td class="border border-gray-300 px-4 py-2">5</td>
           <td class="border border-gray-300 px-4 py-2">73,3</td>
           <td class="border border-gray-300 px-4 py-2">1,76</td>
           <td class="border border-gray-300 px-4 py-2">41,6</td>
         </tr>
       </tbody>
     </table>
     
     <p><strong>Valor terminal (Perpetuidade)</strong> = 73,3 × (1+3%) ÷ (12% – 3%) = 73,3 × 1,03 ÷ 0,09 ≈ 838,0</p>
     <p><strong>Desconto da Perpetuidade</strong> = 838,0 ÷ (1+12%)^5 ≈ 476,1</p>
     <p><strong>Valor total</strong> = (44,6 + 44,0 + 43,2 + 42,4 + 41,6) + 476,1 = 691,9</p>
     
     <h2>Cuidados e Dicas</h2>
     <ul>
       <li><strong>Use premissas realistas:</strong> O crescimento que você adota como premissa deve ser plausível para o momento da empresa, bem como a taxa de desconto (custo de capital) tem que ser condizente com o momento e o risco da companhia.</li>
       
       <li><strong>Teste cenários:</strong> faça DCF com WACC mais alto e mais baixo para ver como o valuation muda.</li>
       
       <li><strong>Valor terminal sensato:</strong> não adote o crescimento da perpetuidade (g) > inflação, senão o valor terminal tenderá a ficar distorcido, pois ao assumir isso, você considera que a companhia irá crescer mais que o restante da economia para sempre, ou seja, com essa premissa você assume indiretamente que a empresa será maior do que toda a economia nacional em um futuro distante, o que é incorreto de se afirmar. Dica: Use 3% ou 4% na sua projeção, é o que a maioria das pessoas no mercado usam.</li>
     </ul>
     
     <h2>Conclusão</h2>
     <p>O DCF é uma ferramenta poderosa de valuation porque torna explícitas todas as suas hipóteses sobre o futuro da empresa. Ele ajuda a entender de onde vem o valor e quais fatores mais impactam o resultado. Mas, como todo modelo, é tão bom quanto as premissas que você coloca. Combine DCF com uma boa análise qualitativa da empresa e análise de múltiplos para ter uma visão completa e tomar decisões mais seguras.</p>
   `,
  },
]

// Update the artigosRelacionados array to reference the real articles
const artigosRelacionados = [
  {
    id: 1,
    titulo: "Quem somos?",
    categoria: "Institucional",
    data: "16 de abril de 2025",
    imagem: "/images/valor-justo-logo.png",
    slug: "quem-somos",
  },
  {
    id: 2,
    titulo: "Custo de Capital: Entendendo o WACC e o custo de oportunidade",
    categoria: "Valuation",
    data: "16 de abril de 2025",
    imagem: "/images/custo-de-capital.png",
    slug: "custo-de-capital-wacc-custo-oportunidade",
  },
  {
    id: 3,
    titulo: "Entendendo o Valuation: Como fazer o modelo de Fluxo de Caixa Descontado (DCF)",
    categoria: "Valuation",
    data: "16 de abril de 2025",
    imagem: "/images/valuation.png",
    slug: "entendendo-valuation-modelo-fluxo-caixa-descontado",
  },
]

export default function ArtigoPage() {
  const params = useParams()
  const slug = params.slug as string

  const [artigo, setArtigo] = useState<any>(null)
  const [mostrarCompartilhamento, setMostrarCompartilhamento] = useState(false)

  useEffect(() => {
    // Buscar o artigo pelo slug
    const artigoEncontrado = artigos.find((a) => a.slug === slug)
    if (artigoEncontrado) {
      setArtigo(artigoEncontrado)
    }
  }, [slug])

  if (!artigo) {
    return (
      <div className="min-h-screen bg-[#f5f9f7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-600">Carregando artigo...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{artigo.titulo} | Valor Justo</title>
        <meta name="description" content={artigo.resumo} />
        <meta property="og:title" content={artigo.titulo} />
        <meta property="og:description" content={artigo.resumo} />
        <meta property="og:image" content={artigo.imagem} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://valorjusto.com.br/conteudos/${artigo.slug}`} />
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
            <Link href="/conteudos" className="text-[#0d9f6f] text-sm hover:underline flex items-center">
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>Voltar para conteúdos</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Conteúdo principal */}
            <div className="lg:col-span-8">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Imagem destacada */}
                <div className="relative h-64 md:h-80 w-full">
                  <img
                    src={artigo.imagem || "/placeholder.svg"}
                    alt={artigo.titulo}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Cabeçalho do artigo */}
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-center mb-4">
                    <span className="text-sm font-medium text-[#0d9f6f] bg-[#e6f2ec] px-3 py-1 rounded mb-2 md:mb-0">
                      {artigo.categoria}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {artigo.data}
                    </div>
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold mb-4">{artigo.titulo}</h1>

                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <p className="text-gray-700 text-lg">{artigo.resumo}</p>
                  </div>

                  {/* Conteúdo do artigo */}
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: artigo.conteudo }} />

                  {/* Botões de compartilhamento */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center">
                      <span className="text-gray-700 mr-4">Compartilhar:</span>
                      <div className="relative">
                        <button
                          className="flex items-center text-gray-500 hover:text-[#0d9f6f]"
                          onClick={() => setMostrarCompartilhamento(!mostrarCompartilhamento)}
                        >
                          <Share2 className="h-5 w-5 mr-1" />
                          <span>Compartilhar</span>
                        </button>

                        {mostrarCompartilhamento && (
                          <div className="absolute left-0 mt-2 bg-white rounded-md shadow-lg p-2 z-10 flex space-x-2">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-full"
                              aria-label="Compartilhar no Facebook"
                            >
                              <Facebook className="h-5 w-5 text-blue-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Compartilhar no Twitter">
                              <Twitter className="h-5 w-5 text-blue-400" />
                            </button>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-full"
                              aria-label="Compartilhar no LinkedIn"
                            >
                              <Linkedin className="h-5 w-5 text-blue-700" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full" aria-label="Compartilhar por email">
                              <Mail className="h-5 w-5 text-gray-600" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Seção de comentários (opcional) */}
              <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Comentários</h3>
                <p className="text-gray-600">A seção de comentários será implementada em breve.</p>
              </div>
            </div>

            {/* Barra lateral */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Artigos Relacionados</h3>
                <div className="space-y-4">
                  {artigosRelacionados.map((artigo) => (
                    <div key={artigo.id} className="flex space-x-3">
                      <Link href={`/conteudos/${artigo.slug}`} className="shrink-0">
                        <div className="w-20 h-20 rounded overflow-hidden">
                          <img
                            src={artigo.imagem || "/placeholder.svg"}
                            alt={artigo.titulo}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                      <div>
                        <Link href={`/conteudos/${artigo.slug}`}>
                          <h4 className="font-medium text-sm hover:text-[#0d9f6f] line-clamp-2">{artigo.titulo}</h4>
                        </Link>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-[#0d9f6f]">{artigo.categoria}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-xs text-gray-500">{artigo.data.split(" ").slice(-3).join(" ")}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Calculadoras de Valuation</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Utilize nossas ferramentas gratuitas para calcular o valor justo de ações e FIIs.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/valuation-acoes"
                    className="block p-3 bg-[#e6f2ec] rounded-md hover:bg-[#d1e9dc] transition-colors"
                  >
                    <h4 className="font-medium text-[#0d9f6f]">Valuation de Ações</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Calcule o valor justo baseado no modelo de crescimento em dois estágios
                    </p>
                  </Link>

                  <Link
                    href="/valuation-fiis"
                    className="block p-3 bg-[#e6f2ec] rounded-md hover:bg-[#d1e9dc] transition-colors"
                  >
                    <h4 className="font-medium text-[#0d9f6f]">Valuation de FIIs</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Determine o valor justo de fundos imobiliários com base nos dividendos
                    </p>
                  </Link>

                  <Link
                    href="/modelo-dcf"
                    className="block p-3 bg-[#e6f2ec] rounded-md hover:bg-[#d1e9dc] transition-colors"
                  >
                    <h4 className="font-medium text-[#0d9f6f]">Modelo DCF</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Avalie empresas pelo método do fluxo de caixa descontado
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
