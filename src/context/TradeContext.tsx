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
  updateTrade: (trade: Trade) => void
  removeTrade: (id: string) => void
}

const TradeContext = createContext<TradeContextType>({
  trades: [],
  addTrade: () => {},
  updateTrade: () => {},
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

  const updateTrade = (updatedTrade: Trade) => {
    const profitLoss = updatedTrade.direction === 'long' ?
      ((updatedTrade.exitPrice - updatedTrade.entryPrice) / updatedTrade.entryPrice * updatedTrade.stake) :
      ((updatedTrade.entryPrice - updatedTrade.exitPrice) / updatedTrade.entryPrice * updatedTrade.stake)
    
    setTrades(prev => prev.map(trade => 
      trade.id === updatedTrade.id ? 
        { ...updatedTrade, profitLoss: parseFloat(profitLoss.toFixed(2)) } : 
        trade
    ))
  }

  const removeTrade = (id: string) => {
    setTrades(prev => prev.filter(trade => trade.id !== id))
  }

  return (
    <TradeContext.Provider value={{ trades, addTrade, updateTrade, removeTrade }}>
      {children}
    </TradeContext.Provider>
  )
}

export function useTradeContext() {
  return useContext(TradeContext)
}
