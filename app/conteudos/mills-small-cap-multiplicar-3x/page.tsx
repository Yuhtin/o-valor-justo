"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import Head from "next/head"

export default function ArtigoMills() {
  const [mostrarCompartilhamento, setMostrarCompartilhamento] = useState(false)

  const artigo = {
    id: 4,
    titulo: "Mills: a Small Cap que pode multiplicar até 3x na visão dos gestores",
    resumo:
      "A Mills (BVMF: MILS3), líder brasileira em locação de equipamentos, tem chamado a atenção de gestoras de renome como Leblon Equities e a Reach Capital. Com posições significativas em seus portfólios, a empresa é vista como uma joia resiliente em um setor difícil de se operar.",
    categoria: "Valuation",
    data: "19 de abril de 2025",
    autor: "Mateus Gusmão",
    imagem: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2-zUiFNs7ImpmnXHqKWhVnGPO6OPHL1Z.png",
    slug: "mills-small-cap-multiplicar-3x",
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2-zUiFNs7ImpmnXHqKWhVnGPO6OPHL1Z.png"
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
                  <p className="text-sm text-gray-600 mb-2">Por: {artigo.autor}</p>

                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <p className="text-gray-700 text-lg">
                      A Mills (BVMF: MILS3), líder brasileira em locação de equipamentos, tem chamado a atenção de
                      gestoras de renome como Leblon Equities e a Reach Capital. Com posições significativas em seus
                      portfólios, a empresa é vista como uma joia resiliente em um setor difícil de se operar. Este
                      artigo sintetiza a tese de investimento com base em análises recentes das duas gestoras, e uma
                      análise própria. Destacando <strong>portfólio privilegiado</strong>,{" "}
                      <strong>gestão conservadora</strong> e <strong>ação descontada</strong>.
                    </p>
                  </div>

                  {/* Conteúdo do artigo */}
                  <div className="prose max-w-none">
                    <h2 className="text-xl font-bold mt-8 mb-4">Importante:</h2>
                    <p>
                      Esse conteúdo não constitui de forma alguma uma recomendação de investimentos, saiba distinguir um
                      estudo de uma recomendação de compra.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">
                      Entendendo a operação de aluguel de máquinas (Rental)
                    </h2>
                    <p>
                      Antes de falar da Mills, precisamos entender como funciona a operação de aluguel de máquinas. Hoje
                      a Mills aluga equipamentos de 4 classes distintas: Plataformas Elevatórias (Máquinas Leves), Linha
                      Amarela (Máquinas Pesadas), Intralogística e Formas e Escoramentos.
                    </p>

                    <figure className="my-6">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image4-SEYyrEJWBYX5pPAvDeMwbpf3sW0MaJ.png"
                        alt="Portfólio de equipamentos para locação da Mills"
                        className="w-full rounded-lg"
                      />
                      <figcaption className="text-sm text-gray-500 mt-2">
                        Figura 1: Portfólio de equipamentos para locação da Mills. Fonte: RI da Mills
                      </figcaption>
                    </figure>

                    <p>Nessas 4 verticais a operação funciona de forma muito parecida:</p>

                    <p>
                      <strong>I) Compra</strong> da máquina;
                    </p>
                    <p>
                      <strong>II) Alocação</strong> da máquina em um contrato de locação fixo, geralmente alocadas em
                      construções, serviços industriais, agronegócio, galpões logísticos, etc;
                    </p>
                    <p>
                      <strong>III) Extensão da vida útil</strong> da máquina, com máquinas leves a Mills consegue
                      realizar uma manutenção geral da máquina (processo chamado de <em>rebuild</em>) ao fim do 7º ano
                      de operação e estender o uso da máquina por mais 7 anos, diminuindo a necessidade do investimento
                      em novos equipamentos.
                    </p>
                    <p>
                      <strong>IV) Venda</strong> da máquina, ao fim do ciclo de utilização da máquina, a Mills põe à
                      venda suas máquinas na sua plataforma de seminovos, essa etapa é mais relevante para a Linha
                      Amarela, já que a Mills ainda não estende a vida útil de máquinas pesadas.
                    </p>

                    <p>
                      Mas afinal, <strong>é rentável fazer locação de máquinas?</strong>
                    </p>

                    <p>
                      Sim! Para quantificar o retorno de uma máquina, escolhi 2 modelos de plataformas elevatórias da
                      marca JLG que a Mills disponibiliza para alugar no site da sua subsidiária Nest Rental. Para fazer
                      a conta, utilizei o preço da diária das máquinas no site, o valor de compra da máquina que achei
                      em sites de concessionárias, as mesmas margens e mesmo nível de utilização das máquinas da Mills
                      (65% do tempo alugadas), considerando que as máquinas irão operar por 15 anos com um{" "}
                      <em>rebuild</em> da máquina no 7º ano.
                    </p>

                    <figure className="my-6">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image5.jpg-q7sQu4jgYCvrkm7WCO79EcadsoOi76.jpeg"
                        alt="Simulação de retorno de plataformas elevatórias na JLG"
                        className="w-full rounded-lg"
                      />
                      <figcaption className="text-sm text-gray-500 mt-2">
                        Figura 2: Simulação de retorno de plataformas elevatórias na JLG. Fonte: Estimativas próprias.
                      </figcaption>
                    </figure>

                    <p>
                      Essa conta não significa que a Mills terá exatamente esse retorno nas máquinas, pois ela consegue{" "}
                      <strong>comprar as máquinas com desconto das montadoras</strong> pelo maior volume nos pedidos, e
                      não obrigatoriamente os preços do site da Nest rental são aplicados para todos os clientes. Mas,
                      concluímos que:
                    </p>

                    <ul>
                      <li>
                        As máquinas de menor altura, por serem mais baratas, possuem uma concorrência maior, e assim os
                        retornos são menores do que em máquinas mais altas que são mais escassas no mercado, ou seja,{" "}
                        <strong>quanto mais escassa a máquina, maior o retorno</strong>.
                      </li>
                      <li>
                        A Mills possui diversas máquinas de maior alcance (superior a 15~20 metros) no portfólio, que
                        unido a uma escala nacional (62 filiais), faz com que ela consiga{" "}
                        <strong>retornos elevados em comparação a pequenos concorrentes</strong> no longo prazo, graças
                        a diluição de custos operacionais e <strong>poder de barganha</strong> com fornecedores de
                        máquinas e peças para manutenção devido sua escala.
                      </li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4">Contexto Histórico: Da Crise à Consolidação</h2>
                    <p>
                      A Mills enfrentou desafios severos pós-Lava Jato (2014-2017), quando sua receita retraiu mais de
                      80% graças à desaceleração do setor de construção civil. A crise levou a uma reinvenção:
                    </p>

                    <ul>
                      <li>
                        <strong>Diversificação de Receitas</strong>: Reduziu a exposição à construção civil de 65% em
                        2018 para 35% (2024), entrando em setores como agronegócio, siderurgia, petroquímica e serviços,
                        o que reduziu drasticamente a ciclicidade dos resultados da Mills.
                      </li>
                      <li>
                        <strong>Aquisições Estratégicas</strong>: Entre 2018 e 2022, fez transações importantes para se
                        consolidar como o maior player no aluguel de plataformas elevatórias. Com destaque para a fusão
                        com seu maior concorrente em 2019, a Solaris, que diminuiu a competição e trouxe um maior poder
                        de precificação para a Mills.
                      </li>
                      <li>
                        <strong>Entrada em novos segmentos</strong>: Entre 2022 e 2024, adquiriu empresas como Triengel
                        (linha amarela) e JM (empilhadeiras), oferecendo novas classes de máquinas no seu portfólio, que
                        ampliou seu mercado endereçável em 10x.
                      </li>
                    </ul>

                    <figure className="my-6">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image6-8NIHXURNaGGFj499xsCA40TVpL32LI.png"
                        alt="Receita de locação da Mills por segmento de atuação"
                        className="w-full rounded-lg"
                      />
                      <figcaption className="text-sm text-gray-500 mt-2">
                        Figura 3: Receita de locação da Mills por segmento de atuação. Fonte: RI Mills e Estimativas
                        Reach capital
                      </figcaption>
                    </figure>

                    <h2 className="text-xl font-bold mt-8 mb-4">A Tese de Investimento em Três Pilares</h2>

                    <h3 className="text-lg font-bold mt-6 mb-3">
                      Pilar 1: Diversificação em Segmentos de Alto Potencial
                    </h3>
                    <p>A Mills atua em quatro frentes, cada uma com dinâmicas distintas:</p>

                    <ul>
                      <li>
                        <strong>Rental Leves (Plataformas Aéreas)</strong>: Vertical altamente rentável, porém com
                        contratos mais curtos (8 meses de duração), a Mills lidera o segmento com 23% de market share.
                      </li>
                      <li>
                        <strong>Formas e Escoramentos</strong>: Negócio cíclico, que depende do volume de obras de
                        infraestrutura, mas é um forte gerador de caixa, em que a Mills lidera com 41% de market share.
                      </li>
                      <li>
                        <strong>Linha Amarela (Máquinas Pesadas)</strong>: Mercado de R$ 40 bilhões/ano, é mais
                        concorrido e intensivo em capital que as demais verticais, logo são máquinas menos rentáveis que
                        as leves, porém possuem contratos mais longos que trazem mais previsibilidade de receita, a
                        Mills possui apenas ~0,5% do mercado, o que traz um alto potencial de crescimento para essa
                        vertical.
                      </li>
                      <li>
                        <strong>Intralogística (Empilhadeiras)</strong>: A vertical mais recente na empresa que une
                        altos retornos (próximos das plataformas elevatórias) com os contratos de médio/longo prazo,
                        existe um alto potencial de crescimento dado que a Mills também possui uma fatia próxima de 1~2%
                        do mercado em um setor de R$ 14 bilhões/ano.
                      </li>
                    </ul>

                    <p>
                      <strong>Por que isso importa?</strong> A diversificação reduz a dependência de um único setor e
                      cria múltiplos motores de crescimento. A Mills projeta um mercado endereçável total de R$ 59
                      bilhões/ano, assim há um amplo espaço para a companhia se consolidar nos mercados de
                      intralogística e pesados por meio de aquisições estratégicas, como fez com o segmento de
                      plataformas elevatórias.
                    </p>

                    <figure className="my-6">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image7-CmWmaIRzo20WHCQy7PgnoOwzaSoAQ5.png"
                        alt="Mercado endereçável da Mills"
                        className="w-full rounded-lg"
                      />
                      <figcaption className="text-sm text-gray-500 mt-2">
                        Figura 4: Mercado endereçável da Mills. Fonte: RI Mills.
                      </figcaption>
                    </figure>

                    <h3 className="text-lg font-bold mt-6 mb-3">
                      Pilar 2: Gestão Conservadora e Alocação Eficiente de Capital
                    </h3>
                    <p>
                      Enquanto concorrentes como Armac e Vamos operam com alavancagem de 2,5~4x EBITDA, a Mills mantém
                      dívida líquida de apenas 1,4x (2024). Isso permite:
                    </p>

                    <ul>
                      <li>
                        <strong>Recompras de Ações</strong>: mais de 13 milhões de ações recompradas entre 2023 e 2024,
                        sinalizando confiança da companhia no desconto da ação.
                      </li>
                      <li>
                        <strong>Dividendos Atraentes</strong>: Com os juros mais altos, o cenário de compras de máquinas
                        novas se torna menos atrativo, assim a companhia também está comprometida em gerar valor para os
                        acionistas, em 2024 foram distribuídos R$ 143 MI em dividendos e já foram anunciados R$ 13,6 MI
                        em proventos para 2025, resultando em um dividend yeld de 6,5% nos últimos 12 meses.
                      </li>
                      <li>
                        <strong>Aquisições Disciplinadas</strong>: Foco em empresas com "diferencial competitivo" e que
                        possam ser adquiridas a valuations atrativos, como a JM Empilhadeiras, que domina técnicas de
                        extensão da vida útil das máquinas. A Mills conseguiu comprar a JM em um múltiplo EV/EBITDA de
                        4,3x, múltiplo que era menor do que o das ações da Mills (EV/EBITDA 5,4x em maio de 2024, quando
                        saiu a aquisição). Considerando que a Mills pagou R$ 279,5 MI na aquisição, e que a JM tinha
                        mais de 1.900 máquinas, chegamos no valor de R$ 147 mil por máquina, assim, a Mills conseguiu
                        comprar a JM em um valor que não destoa muito do valor de reposição da frota.
                      </li>
                    </ul>

                    <figure className="my-6">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image3-ZogGcPbwmvrJ5Z9K72snjI3qBUkvxJ.png"
                        alt="Destaques da aquisição da JM Empilhadeiras"
                        className="w-full rounded-lg"
                      />
                      <figcaption className="text-sm text-gray-500 mt-2">
                        Figura 5: Destaques da aquisição da JM Empilhadeiras. Fonte: RI da Mills.
                      </figcaption>
                    </figure>

                    <p>
                      Pedro Chermont (Leblon Equities) destaca a <strong>transparência da gestão</strong> com o conselho
                      de administração como um diferencial: "Não há tentativa de enganar acionistas. Decisões de
                      alocação de capital são baseadas em retornos concretos, não em otimismo".
                    </p>

                    <h3 className="text-lg font-bold mt-6 mb-3">Pilar 3: Valuation Descolado dos Fundamentos</h3>
                    <p>
                      A Mills negocia hoje em um Preço/Lucro (P/L) de 7,3x o lucro de 2024, abaixo da média de 5 anos de
                      13x lucro. Projeções indicam:
                    </p>

                    <ul>
                      <li>
                        <strong>EBITDA de R$ 1,2 bilhão em 2026</strong> (vs. R$ 670 milhões em 2023), a Leblon Equities
                        divulgou no call do 1T25 para os seus cotistas essa projeção impulsionado pela maturação dos
                        investimentos em linha amarela e intralogística.
                      </li>
                    </ul>

                    <p>
                      Considerando a projeção da Leblon e o múltiplo EV/EBITDA médio que a Mills negociou nos últimos 5
                      anos, de 5,5x, no fim de 2026 se a ação da Mills estiver cotada nesse múltiplo histórico e se a
                      empresa mantiver o mesmo nível de alavancagem, há um{" "}
                      <strong>potencial de upside superior a +100%</strong>.
                    </p>

                    <ul>
                      <li>
                        <strong>Preço-Alvo de R$ 20-40/ação</strong>: A Reach Capital no comentário do fundo Reach Small
                        Caps de Julho-24 divulgou o preço-alvo de R$ 20 (70% de upside), enquanto a Leblon projeta o
                        valor justo em R$ 28 por meio do modelo de fluxo de caixa descontado. (Você pode ver as
                        projeções da Leblon mais detalhadas no{" "}
                        <a
                          href="https://www.youtube.com/watch?v=fCZBKPydWZI"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0d9f6f] hover:underline"
                        >
                          call do 1T25
                        </a>
                        )
                      </li>
                    </ul>

                    <p>
                      Fazendo um valuation com a{" "}
                      <a
                        href="https://ovalorjusto.com.br/modelo-dcf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0d9f6f] hover:underline"
                      >
                        função do Valor Justo de valuation DCF
                      </a>
                      , usando como premissa minha estimativa de fluxo de caixa livre de R$ 300 milhões para a Mills em
                      2025, e que ela crescerá <strong>somente a inflação</strong> chegamos em um retorno esperado de
                      ~19% ao ano.
                    </p>

                    <figure className="my-6">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image1-6LJFDD0H2wy3rIrzJNwjPOvkqUUiYh.png"
                        alt="Estimativa de Valuation da Mills"
                        className="w-full rounded-lg"
                      />
                      <figcaption className="text-sm text-gray-500 mt-2">
                        Figura 6: Estimativa de Valuation da Mills. Fonte: Valor Justo.
                      </figcaption>
                    </figure>

                    <p>
                      Vale ressaltar que a minha estimativa considera um nível de investimentos (CAPEX) equivalente a
                      apenas ⅓ do que a Mills investiu em 2024 dado o cenário macro mais complicado, se a Mills investir
                      mais, provavelmente o fluxo de caixa livre para 2025 será menor, porém para os anos seguintes essa
                      geração de caixa cresce mais dado o maior número de máquinas que possam ser adquiridas em 2025.
                      Recomendo que você utilize a função do valor justo de{" "}
                      <a
                        href="https://ovalorjusto.com.br/valuation-acoes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0d9f6f] hover:underline"
                      >
                        valuation por Lucro por Ação
                      </a>{" "}
                      ou até mesmo do{" "}
                      <a
                        href="https://ovalorjusto.com.br/modelo-dcf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0d9f6f] hover:underline"
                      >
                        DCF
                      </a>
                      , para <strong>tirar suas próprias conclusões</strong>.
                    </p>

                    <h2 className="text-xl font-bold mt-8 mb-4">Riscos e Mitigadores</h2>
                    <ul>
                      <li>
                        <strong>Cenário Macroeconômico</strong>: Juros altos tendem a desacelerar as atividades dos
                        clientes da companhia e aumentam as despesas financeiras, como a Mills tem uma dívida menos
                        relevante dentro do balanço frente aos seus concorrentes, esse risco está mais atrelado a
                        diminuição da demanda.
                      </li>
                      <li>
                        <strong>Concorrência na Linha Amarela</strong>: O segmento de Linha Amarela é o mais difícil de
                        se operar no setor de rentals, as máquinas quebram muito e é um mercado com um cenário
                        competitivo acirrado, assim possuem margens menores, que em cenários mais estressados podem
                        fazer esse segmento não ser rentável dentro da Mills.
                      </li>
                      <li>
                        <strong>Execução Operacional</strong>: A entrada em novos segmentos exige precisão na alocação
                        de capital, mas como a Mills tem entrado em novas frentes adquirindo empresas com{" "}
                        <em>know-how</em> dos novos segmentos de atuação, esse risco de execução é menos relevante.
                      </li>
                    </ul>

                    <h2 className="text-xl font-bold mt-8 mb-4">Conclusão: Uma Oportunidade Estrutural</h2>
                    <p>
                      A Mills não é apenas uma aposta na recuperação do cenário macro no Brasil, mas em uma{" "}
                      <strong>máquina de geração de valor</strong> com:
                    </p>

                    <ol>
                      <li>
                        <strong>Diversificação que reduz ciclicidade</strong>;
                      </li>
                      <li>
                        <strong>Operações com rentabilidade atrativa</strong>;
                      </li>
                      <li>
                        <strong>Gestão conservadora em um setor altamente alavancado</strong>;
                      </li>
                      <li>
                        <strong>Valuation que ignora o potencial de crescimento</strong>.
                      </li>
                    </ol>

                    <p>
                      Como resume Chermont: "No Brasil, onde o vento macro quase sempre é contra, empresas como a Mills
                      provam que o micro importa mais". Para investidores pacientes, a combinação de múltiplos baixos,
                      recompras e claras avenidas de crescimento, faz da Mills uma boa oportunidade no cenário atual.
                    </p>

                    <div className="mt-8 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 italic">Fontes:</p>
                      <p className="text-sm text-gray-600 italic">RI Mills;</p>
                      <p className="text-sm text-gray-600 italic">
                        Leblon Equities - Call Trimestral 1T2025:{" "}
                        <a
                          href="https://www.youtube.com/watch?v=fCZBKPydWZI"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0d9f6f] hover:underline"
                        >
                          Leblon Equities - Call Trimestral 1T2025
                        </a>
                        ;
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        Podcast Skin in the Game #70 - Pedro Chermont:{" "}
                        <a
                          href="https://www.youtube.com/watch?v=-14QS4j9Bb0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0d9f6f] hover:underline"
                        >
                          Ações BR e USA que vão DISPARAR em 2025 - Skin in the Game #70 | Pedro Chermont
                        </a>
                        ;
                      </p>
                      <p className="text-sm text-gray-600 italic">
                        Cartas Reach Capital (2022 e Jun/2024). Disponível em:{" "}
                        <a
                          href="https://www.reachcapital.com.br/c%C3%B3pia-cartas"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0d9f6f] hover:underline"
                        >
                          https://www.reachcapital.com.br/cópia-cartas
                        </a>
                        ;
                      </p>
                      <p className="text-sm text-gray-600 italic">Estimativas próprias.</p>
                    </div>
                  </div>

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
                  <div className="flex space-x-3">
                    <Link href="/conteudos/entendendo-valuation-modelo-fluxo-caixa-descontado" className="shrink-0">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          src="/images/valuation.png"
                          alt="Entendendo o Valuation"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href="/conteudos/entendendo-valuation-modelo-fluxo-caixa-descontado">
                        <h4 className="font-medium text-sm hover:text-[#0d9f6f] line-clamp-2">
                          Entendendo o Valuation: Como fazer o modelo de Fluxo de Caixa Descontado (DCF)
                        </h4>
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-[#0d9f6f]">Valuation</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">16 de abril de 2025</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link href="/conteudos/custo-de-capital-wacc-custo-oportunidade" className="shrink-0">
                      <div className="w-20 h-20 rounded overflow-hidden">
                        <img
                          src="/images/custo-de-capital.png"
                          alt="Custo de Capital"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link href="/conteudos/custo-de-capital-wacc-custo-oportunidade">
                        <h4 className="font-medium text-sm hover:text-[#0d9f6f] line-clamp-2">
                          Custo de Capital: Entendendo o WACC e o custo de oportunidade
                        </h4>
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-[#0d9f6f]">Valuation</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-xs text-gray-500">16 de abril de 2025</span>
                      </div>
                    </div>
                  </div>
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
                    href="/modelo-dcf"
                    className="block p-3 bg-[#e6f2ec] rounded-md hover:bg-[#d1e9dc] transition-colors"
                  >
                    <h4 className="font-medium text-[#0d9f6f]">Modelo DCF</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Avalie empresas pelo método do fluxo de caixa descontado
                    </p>
                  </Link>

                  <Link
                    href="/dcf-reverso"
                    className="block p-3 bg-[#e6f2ec] rounded-md hover:bg-[#d1e9dc] transition-colors"
                  >
                    <h4 className="font-medium text-[#0d9f6f]">DCF Reverso</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Descubra a taxa de crescimento implícita no preço atual da ação
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
