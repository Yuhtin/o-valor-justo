import type { Metadata } from "next"
import HomeClient from "./HomeClient"

export const metadata: Metadata = {
  title: "Valor Justo - Descubra o Valor Justo dos Ativos da Bolsa | Valuation de Ações e FIIs",
  description:
    "Calcule em menos de 3 minutos o valor justo de ações e fundos imobiliários da bolsa brasileira. Ferramenta gratuita para análise fundamentalista e value investing.",
  keywords:
    "valor justo, valuation, ações baratas, valuation de ações, valuation de FIIs, análise fundamentalista, value investing, investimento em valor",
  openGraph: {
    title: "Valor Justo - Descubra o Valor Justo dos Ativos da Bolsa",
    description:
      "Calcule em menos de 3 minutos se você está comprando uma ação ou fundo imobiliário que pode lhe gerar retornos acima da média.",
    url: "https://valorjusto.com.br/",
    siteName: "Valor Justo",
    images: [
      {
        url: "https://valorjusto.com.br/imagem-compartilhamento.jpg",
        width: 1200,
        height: 630,
        alt: "Valor Justo - Calculadora de Valuation",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
}

export default function Home() {
  return <HomeClient />
}
