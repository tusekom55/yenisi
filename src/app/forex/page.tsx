'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3,
  Clock,
  Globe,
  Zap,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, StatsCard } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { TradingChart } from '@/components/Trading/TradingChart';
import { ForexTradingPanel } from '@/components/Trading/ForexTradingPanel';
import { ForexPositionsList } from '@/components/Trading/ForexPositionsList';
import { forexPairs, mockUser } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

export default function ForexPage() {
  const [selectedPair, setSelectedPair] = useState(forexPairs[0]);
  const [timeframe, setTimeframe] = useState('1H');

  // Mock data for forex
  const forexStats = {
    dailyVolume: 6800000000000, // $6.8 trillion
    activePairs: 35,
    spread: 0.8,
    leverage: 100,
  };

  const majorPairs = forexPairs.slice(0, 6);
  const marketNews = [
    {
      time: '09:30',
      impact: 'high',
      currency: 'USD',
      event: 'Non-Farm Payrolls',
      forecast: '180K',
      previous: '175K',
    },
    {
      time: '14:00',
      impact: 'medium',
      currency: 'EUR',
      event: 'ECB Interest Rate Decision',
      forecast: '4.50%',
      previous: '4.50%',
    },
    {
      time: '16:30',
      impact: 'low',
      currency: 'GBP',
      event: 'Retail Sales',
      forecast: '0.2%',
      previous: '-0.1%',
    },
  ];

  // Convert forex pair to mock coin format for chart
  const pairAsCoin = {
    id: selectedPair.symbol.toLowerCase().replace('/', '-'),
    symbol: selectedPair.symbol,
    name: selectedPair.symbol,
    price: selectedPair.price,
    change24h: selectedPair.change,
    volume: 1000000000,
    marketCap: 5000000000000,
    icon: '💱',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Forex Trading
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              35+ döviz çifti ile 100:1 kaldıraçlı işlem
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="secondary">
              <BarChart3 className="w-4 h-4 mr-2" />
              Ekonomik Takvim
            </Button>
            <Button variant="primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Hızlı İşlem
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatsCard
              title="Günlük Hacim"
              value="$6.8T"
              change={2.1}
              icon={<DollarSign className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatsCard
              title="Aktif Çiftler"
              value={forexStats.activePairs}
              icon={<Globe className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsCard
              title="Ortalama Spread"
              value={`${forexStats.spread} pip`}
              icon={<BarChart3 className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatsCard
              title="Max Kaldıraç"
              value={`${forexStats.leverage}:1`}
              icon={<Zap className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Major Pairs */}
          <div className="lg:col-span-1">
            <Card title="Major Çiftler" className="h-fit">
              <div className="space-y-3">
                {majorPairs.map((pair, index) => (
                  <motion.div
                    key={pair.symbol}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedPair(pair)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPair.symbol === pair.symbol
                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                        : 'hover:bg-gray-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {pair.symbol}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {pair.symbol.includes('USD') ? 'Major' : 'Cross'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {pair.price.toFixed(4)}
                        </p>
                        <div className={`flex items-center space-x-1 ${
                          pair.change >= 0 ? 'text-success' : 'text-danger'
                        }`}>
                          {pair.change >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          <span className="text-xs">
                            {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Market Status */}
              <div className="mt-6 p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-success">
                    Forex Piyasası Açık
                  </p>
                </div>
                <p className="text-xs text-success mt-1">
                  London seansu: 08:00 - 17:00 GMT
                </p>
              </div>
            </Card>

            {/* Economic Calendar */}
            <Card title="Ekonomik Takvim" className="mt-6">
              <div className="space-y-3">
                {marketNews.map((news, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700">
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${
                        news.impact === 'high' ? 'bg-danger' :
                        news.impact === 'medium' ? 'bg-warning' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {news.time}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">
                          {news.currency}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {news.event}
                      </p>
                      <div className="flex space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Tahmin: {news.forecast}</span>
                        <span>Önceki: {news.previous}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chart */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TradingChart coin={pairAsCoin} />
            </motion.div>

            {/* Forex Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card title="Forex Trading Özellikleri">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-primary-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Yüksek Kaldıraç
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      100:1'e kadar kaldıraç ile büyük pozisyonlar açabilirsiniz
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-success" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      24/5 Piyasa
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pazartesi'den Cuma'ya 24 saat işlem yapabilirsiniz
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-warning" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Düşük Spread
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Major çiftlerde 0.8 pip'ten başlayan dar spreadler
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Trading Panel */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ForexTradingPanel 
                pair={selectedPair} 
                balance={mockUser.balance}
                className="sticky top-6"
              />
            </motion.div>
          </div>
        </div>

        {/* Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ForexPositionsList positions={[]} />
        </motion.div>

        {/* Risk Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <div className="flex items-start space-x-3 p-4 bg-danger/5 border border-danger/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-danger mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-danger mb-2">
                  Yüksek Risk Uyarısı - Forex Trading
                </h4>
                <div className="text-sm text-danger space-y-1">
                  <p>
                    • Forex trading yüksek risk içerir ve tüm sermayenizi kaybetmenize neden olabilir.
                  </p>
                  <p>
                    • Kaldıraçlı ürünler riski artırır. Yatırım yapmadan önce risk toleransınızı değerlendirin.
                  </p>
                  <p>
                    • Geçmiş performans gelecekteki sonuçları garanti etmez.
                  </p>
                  <p>
                    • Sadece kaybetmeyi göze alabileceğiniz sermaye ile işlem yapın.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}