"use client"

import { InfoIcon } from "lucide-react"

interface DividendoInputProps {
  value: string
  onChange: (value: string) => void
  id?: string
  error?: string
}

export function DividendoInput({ value, onChange, id = "dividendo", error }: DividendoInputProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-1 mb-1">
        <label htmlFor={id} className="text-xs md:text-sm font-medium">
          Dividendos pagos no último ano (R$)
        </label>
        <div className="tooltip">
          <InfoIcon className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
          <span className="tooltip-text">
            Valor total dos dividendos distribuídos nos últimos 12 meses (você pode encontrar esses dados no Status
            Invest, Investidor10 ou Funds Explorer)
          </span>
        </div>
      </div>
      <input
        id={id}
        type="number"
        step="0.01"
        min="0"
        placeholder="0.00"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${error ? "border-red-500" : ""}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
