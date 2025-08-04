'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, TrendingUp, BarChart3 } from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { CoinCard } from '@/components/Trading/CoinCard';
import { TradingChart } from '@/components/Trading/TradingChart';
import { TradingPanel } from '@/components/Trading/TradingPanel';
import { PositionsList } from '@/components/Trading/PositionsList';
import { mockCoins, mockUser, mockPositions } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

export default function TradingPage() {
  const [selectedCoin, setSelectedCoin] = useState(mockCoins[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('name');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites' | 'gainers' | 'losers'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCoins = mockCoins
    .filter(coin => {
      const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      
      switch (filterBy) {
        case 'favorites':
          return matchesSearch; // In real app, would check if coin is favorited
        case 'gainers':
          return matchesSearch && coin.change24h > 0;
        case 'losers':
          return matchesSearch && coin.change24h < 0;
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change24h - a.change24h;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Kripto Trading
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              500+ kripto para ile profesyonel trading
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="secondary">
              <BarChart3 className="w-4 h-4 mr-2" />
              Market Analizi
            </Button>
            <Button variant="primary">
              <TrendingUp className="w-4 h-4 mr-2" />
              Hızlı İşlem
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Coin List */}
          <div className="lg:col-span-1">
            <Card title="Coin Listesi" className="h-fit">
              {/* Search and Filters */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Coin ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="name">İsme Göre</option>
                    <option value="price">Fiyata Göre</option>
                    <option value="change">Değişime Göre</option>
                  </select>
                  
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value as any)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">Tümü</option>
                    <option value="favorites">Favoriler</option>
                    <option value="gainers">Yükselişte</option>
                    <option value="losers">Düşüşte</option>
                  </select>
                </div>
              </div>

              {/* Coin List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredCoins.map((coin, index) => (
                  <motion.div
                    key={coin.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedCoin(coin)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCoin.id === coin.id
                        ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
                        : 'hover:bg-gray-50 dark:hover:bg-dark-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{coin.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {coin.symbol}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {coin.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {formatCurrency(coin.price)}
                        </p>
                        <p className={`text-xs ${coin.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chart and Trading Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trading Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TradingChart coin={selectedCoin} />
            </motion.div>

            {/* Market Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card title="Market Bilgileri">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">24s Hacim</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {(selectedCoin.volume / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Market Cap</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {(selectedCoin.marketCap / 1000000000).toFixed(1)}B
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Arz</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {(selectedCoin.marketCap / selectedCoin.price / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dominans</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {(Math.random() * 50).toFixed(1)}%
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
              <TradingPanel 
                coin={selectedCoin} 
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
          <PositionsList positions={mockPositions} />
        </motion.div>

        {/* Recent Trades */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card title="Son İşlemler" subtitle="Market genelindeki son işlemler">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-600">
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Zaman</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Pair</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Tip</th>
                    <th className="text-right py-3 text-gray-600 dark:text-gray-400">Fiyat</th>
                    <th className="text-right py-3 text-gray-600 dark:text-gray-400">Miktar</th>
                    <th className="text-right py-3 text-gray-600 dark:text-gray-400">Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }).map((_, i) => {
                    const coin = mockCoins[i % mockCoins.length];
                    const isBuy = Math.random() > 0.5;
                    const amount = Math.random() * 10;
                    const total = amount * coin.price;
                    
                    return (
                      <tr key={i} className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700">
                        <td className="py-2 text-gray-600 dark:text-gray-400">
                          {new Date(Date.now() - i * 60000).toLocaleTimeString('tr-TR', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            second: '2-digit' 
                          })}
                        </td>
                        <td className="py-2 font-medium text-gray-900 dark:text-white">
                          {coin.symbol}/USDT
                        </td>
                        <td className="py-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            isBuy ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                          }`}>
                            {isBuy ? 'Al' : 'Sat'}
                          </span>
                        </td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-white">
                          {formatCurrency(coin.price)}
                        </td>
                        <td className="py-2 text-right text-gray-600 dark:text-gray-400">
                          {amount.toFixed(4)}
                        </td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-white">
                          {formatCurrency(total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}