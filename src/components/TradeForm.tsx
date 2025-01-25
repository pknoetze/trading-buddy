import { useState, useEffect } from 'react'
import { useTradeContext } from '../context/TradeContext'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const INSTRUMENTS = ['DE40', 'F40', 'STOXX50']

const formatDateForInput = (date: Date) => {
  const pad = (num: number) => num.toString().padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export default function TradeForm({ trade: initialTrade, onSuccess }: { trade?: any, onSuccess: () => void }) {
  const { addTrade, updateTrade } = useTradeContext()
  const now = new Date()
  const defaultDate = formatDateForInput(now)

  const [trade, setTrade] = useState({
    instrument: '',
    entryDateTime: defaultDate,
    exitDateTime: defaultDate,
    entryPrice: '',
    exitPrice: '',
    direction: 'long',
    stake: '',
    fees: ''
  })

  useEffect(() => {
    if (initialTrade) {
      setTrade({
        ...initialTrade,
        entryDateTime: formatDateForInput(new Date(initialTrade.entryDateTime)),
        exitDateTime: formatDateForInput(new Date(initialTrade.exitDateTime))
      })
    }
  }, [initialTrade])

  const calculateProfitLoss = () => {
    const entryPrice = parseFloat(trade.entryPrice)
    const exitPrice = parseFloat(trade.exitPrice)
    const stake = parseFloat(trade.stake)
    const fees = parseFloat(trade.fees) || 0
    
    if (isNaN(entryPrice) || isNaN(exitPrice) || isNaN(stake)) return null
    
    let profitLoss = trade.direction === 'long' ?
      ((exitPrice - entryPrice) / entryPrice * stake) :
      ((entryPrice - exitPrice) / entryPrice * stake)
    
    profitLoss -= fees
    
    return {
      value: profitLoss.toFixed(2),
      isProfit: profitLoss >= 0
    }
  }

  const profitLoss = calculateProfitLoss()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const tradeData = {
      ...trade,
      entryPrice: parseFloat(trade.entryPrice),
      exitPrice: parseFloat(trade.exitPrice),
      stake: parseFloat(trade.stake),
      fees: parseFloat(trade.fees) || 0
    }

    if (initialTrade) {
      updateTrade({ ...tradeData, id: initialTrade.id })
    } else {
      addTrade(tradeData)
    }
    
    onSuccess()
    
    if (!initialTrade) {
      setTrade({
        instrument: '',
        entryDateTime: defaultDate,
        exitDateTime: defaultDate,
        entryPrice: '',
        exitPrice: '',
        direction: 'long',
        stake: '',
        fees: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Instrument Name */}
        <div>
          <label className="block mb-2">Instrument *</label>
          <select
            className="input-field"
            value={trade.instrument}
            onChange={(e) => setTrade({...trade, instrument: e.target.value})}
            required
          >
            <option value="">Select Instrument</option>
            {INSTRUMENTS.map(instrument => (
              <option key={instrument} value={instrument}>
                {instrument}
              </option>
            ))}
          </select>
        </div>

        {/* Entry Date & Time */}
        <div>
          <label className="block mb-2">Entry Date & Time *</label>
          <input
            type="datetime-local"
            className="input-field"
            value={trade.entryDateTime}
            onChange={(e) => setTrade({...trade, entryDateTime: e.target.value})}
            required
          />
        </div>

        {/* Exit Date & Time */}
        <div>
          <label className="block mb-2">Exit Date & Time *</label>
          <input
            type="datetime-local"
            className="input-field"
            value={trade.exitDateTime}
            onChange={(e) => setTrade({...trade, exitDateTime: e.target.value})}
            required
          />
        </div>

        {/* Entry Price */}
        <div>
          <label className="block mb-2">Entry Price *</label>
          <input
            type="number"
            step="0.01"
            className="input-field"
            value={trade.entryPrice}
            onChange={(e) => setTrade({...trade, entryPrice: e.target.value})}
            required
          />
        </div>

        {/* Exit Price */}
        <div>
          <label className="block mb-2">Exit Price *</label>
          <input
            type="number"
            step="0.01"
            className="input-field"
            value={trade.exitPrice}
            onChange={(e) => setTrade({...trade, exitPrice: e.target.value})}
            required
          />
        </div>

        {/* Direction */}
        <div>
          <label className="block mb-2">Direction *</label>
          <select
            className="input-field"
            value={trade.direction}
            onChange={(e) => setTrade({...trade, direction: e.target.value})}
            required
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>

        {/* Stake Amount */}
        <div>
          <label className="block mb-2">Stake Amount *</label>
          <input
            type="number"
            step="0.01"
            className="input-field"
            value={trade.stake}
            onChange={(e) => setTrade({...trade, stake: e.target.value})}
            required
          />
        </div>

        {/* Fees */}
        <div>
          <label className="block mb-2">Fees</label>
          <input
            type="number"
            step="0.01"
            className="input-field"
            value={trade.fees}
            onChange={(e) => setTrade({...trade, fees: e.target.value})}
          />
        </div>
      </div>

      {/* Calculated Profit/Loss */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-lg font-medium">Calculated Profit/Loss</h3>
        <div className={`flex items-center gap-2 ${
          profitLoss ? 
            (profitLoss.isProfit ? 
              'text-green-600 dark:text-green-400' : 
              'text-red-600 dark:text-red-400') : 
            'text-gray-600 dark:text-gray-400'
        }`}>
          {profitLoss ? (
            <>
              {profitLoss.isProfit ? (
                <FaArrowUp className="text-xl" />
              ) : (
                <FaArrowDown className="text-xl" />
              )}
              <p className="text-2xl font-bold">
                ${profitLoss.value}
              </p>
            </>
          ) : (
            <p className="text-2xl font-bold">-</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onSuccess}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {initialTrade ? 'Update Trade' : 'Add Trade'}
        </button>
      </div>
    </form>
  )
}
