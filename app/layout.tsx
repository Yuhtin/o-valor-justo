import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Valor Justo - Calculadora de Valuation",
  description: "Descubra o valor justo dos ativos da bolsa em menos de 3 minutos",
  keywords:
    "valor justo, valuation, ações baratas, valuation de ações, valuation de FIIs, análise fundamentalista, value investing, investimento em valor",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google tag (gtag.js) */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NFHY3ZL7LV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NFHY3ZL7LV');
            `,
          }}
        />
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "Valor Justo",
                "description": "Ferramenta para calcular o valor justo de ações e fundos imobiliários da bolsa brasileira usando diferentes modelos de valuation.",
                "url": "https://valorjusto.com.br",
                "applicationCategory": "FinanceApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "BRL"
                },
                "featureList": "Valuation de Ações, Valuation de FIIs, Modelo DCF, DCF Reverso, Conteúdos Educativos"
              }
            `,
          }}
        />
        {/* Open Graph tags */}
        <meta property="og:title" content="Valor Justo - Descubra o Valor Justo dos Ativos da Bolsa" />
        <meta
          property="og:description"
          content="Calcule em menos de 3 minutos se você está comprando uma ação ou fundo imobiliário que pode lhe gerar retornos acima da média."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://valorjusto.com.br/" />
        <meta property="og:image" content="https://valorjusto.com.br/imagem-compartilhamento.jpg" />
        <link rel="canonical" href="https://valorjusto.com.br/" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
