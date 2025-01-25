import { useTradeContext } from '../context/TradeContext'
import { 
  FaChartLine, 
  FaArrowUp, 
  FaArrowDown, 
  FaBalanceScale, 
  FaMoneyBillWave, 
  FaExchangeAlt 
} from 'react-icons/fa'

export default function Dashboard() {
  const { trades } = useTradeContext()

  const calculateStats = () => {
    const winningTrades = trades.filter(t => t.profitLoss >= 0)
    const losingTrades = trades.filter(t => t.profitLoss < 0)
    
    const totalProfit = winningTrades.reduce((sum, t) => sum + t.profitLoss, 0)
    const totalLoss = losingTrades.reduce((sum, t) => sum + Math.abs(t.profitLoss), 0)
    
    const winRate = trades.length > 0 ? 
      (winningTrades.length / trades.length * 100).toFixed(2) : 0
      
    const avgProfit = winningTrades.length > 0 ?
      (totalProfit / winningTrades.length).toFixed(2) : 0
      
    const avgLoss = losingTrades.length > 0 ?
      (totalLoss / losingTrades.length).toFixed(2) : 0
      
    const expectancy = trades.length > 0 ?
      ((winningTrades.length / trades.length) * parseFloat(avgProfit) -
      (losingTrades.length / trades.length) * parseFloat(avgLoss)).toFixed(2) : 0
      
    const accumulativePL = trades.reduce((sum, t) => sum + t.profitLoss, 0).toFixed(2)
    
    const riskRewardRatio = avgLoss > 0 ?
      (parseFloat(avgProfit) / parseFloat(avgLoss)).toFixed(2) : 0

    return {
      winRate,
      avgProfit,
      avgLoss,
      expectancy,
      accumulativePL,
      riskRewardRatio
    }
  }

  const stats = calculateStats()

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Win Rate */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-primary" />
            <h3 className="text-lg font-medium">Win Rate</h3>
          </div>
          <p className="text-2xl font-bold">{stats.winRate}%</p>
        </div>

        {/* Avg. Profit */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaArrowUp className="text-green-500" />
            <h3 className="text-lg font-medium">Avg. Profit</h3>
          </div>
          <p className="text-2xl font-bold">${stats.avgProfit}</p>
        </div>

        {/* Avg. Loss */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaArrowDown className="text-red-500" />
            <h3 className="text-lg font-medium">Avg. Loss</h3>
          </div>
          <p className="text-2xl font-bold">${stats.avgLoss}</p>
        </div>

        {/* Expectancy */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaBalanceScale className="text-yellow-500" />
            <h3 className="text-lg font-medium">Expectancy</h3>
          </div>
          <p className="text-2xl font-bold">${stats.expectancy}</p>
        </div>

        {/* Accumulative P/L */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaMoneyBillWave className="text-purple-500" />
            <h3 className="text-lg font-medium">Accumulative P/L</h3>
          </div>
          <p className={`text-2xl font-bold ${
            parseFloat(stats.accumulativePL) >= 0 ? 
            'text-green-600 dark:text-green-400' : 
            'text-red-600 dark:text-red-400'
          }`}>
            ${stats.accumulativePL}
          </p>
        </div>

        {/* Risk/Reward */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaExchangeAlt className="text-blue-500" />
            <h3 className="text-lg font-medium">Risk/Reward</h3>
          </div>
          <p className="text-2xl font-bold">{stats.riskRewardRatio}</p>
        </div>
      </div>
    </div>
  )
}
