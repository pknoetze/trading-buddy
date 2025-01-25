import { createContext, useContext, useState, ReactNode } from 'react'

type Trade = {
  id: string
  instrument: string
  entryDateTime: string
  exitDateTime: string
  entryPrice: number
  exitPrice: number
  direction: string
  stake: number
  fees: number
  profitLoss: number
}

type TradeContextType = {
  trades: Trade[]
  addTrade: (trade: Omit<Trade, 'id' | 'profitLoss'>) => void
  removeTrade: (id: string) => void
}

const TradeContext = createContext<TradeContextType>({
  trades: [],
  addTrade: () => {},
  removeTrade: () => {}
})

export function TradeProvider({ children }: { children: ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>([])

  const addTrade = (trade: Omit<Trade, 'id' | 'profitLoss'>) => {
    const profitLoss = trade.direction === 'long' ?
      ((trade.exitPrice - trade.entryPrice) / trade.entryPrice * trade.stake) :
      ((trade.entryPrice - trade.exitPrice) / trade.entryPrice * trade.stake)

    const newTrade = {
      ...trade,
      id: crypto.randomUUID(),
      profitLoss: parseFloat(profitLoss.toFixed(2))
    }

    setTrades(prev => [newTrade, ...prev])
  }

  const removeTrade = (id: string) => {
    setTrades(prev => prev.filter(trade => trade.id !== id))
  }

  return (
    <TradeContext.Provider value={{ trades, addTrade, removeTrade }}>
      {children}
    </TradeContext.Provider>
  )
}

export function useTradeContext() {
  return useContext(TradeContext)
}
