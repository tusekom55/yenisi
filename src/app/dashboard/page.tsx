'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Activity, 
  DollarSign,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, StatsCard } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { CoinCard } from '@/components/Trading/CoinCard';
import { mockCoins, mockUser, mockPositions, mockTransactions } from '@/data/mockData';
import { formatCurrency, formatPercentage, calculatePnL } from '@/lib/utils';
import { useState } from 'react';

export default function DashboardPage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  
  const totalPnL = mockPositions.reduce((sum, position) => sum + position.pnl, 0);
  const openPositions = mockPositions.filter(p => p.status === 'open');
  const recentTransactions = mockTransactions.slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hoş geldin, {mockUser.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              İşte portföyünüzün güncel durumu
            </p>
          </div>
          <div className="flex space-x-3 mt-4 sm:mt-0">
            <Button variant="primary">
              Para Yatır
            </Button>
            <Button variant="secondary">
              Para Çek
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
              title="Toplam Bakiye"
              value={
                <div className="flex items-center space-x-2">
                  <span>{balanceVisible ? formatCurrency(mockUser.balance) : '••••••'}</span>
                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
                  >
                    {balanceVisible ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              }
              change={5.2}
              icon={<Wallet className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatsCard
              title="Toplam P&L"
              value={formatCurrency(totalPnL)}
              change={(totalPnL / mockUser.balance) * 100}
              icon={
                totalPnL >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-success" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-danger" />
                )
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsCard
              title="Açık Pozisyonlar"
              value={openPositions.length}
              icon={<Activity className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatsCard
              title="Bugünkü Hacim"
              value={formatCurrency(85432)}
              change={12.3}
              icon={<DollarSign className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card title="Portföy Performansı" subtitle="Son 30 gün">
              <div className="h-64 bg-gray-50 dark:bg-dark-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Grafik Component Buraya Gelecek
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">En Yüksek</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(142350)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">En Düşük</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(98250)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ortalama</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(118500)}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card title="En İyi Performans" subtitle="24 saat">
              <div className="space-y-4">
                {mockCoins.slice(0, 5).map((coin) => (
                  <div key={coin.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{coin.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {coin.symbol}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(coin.price)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center ${
                        coin.change24h >= 0 ? 'text-success' : 'text-danger'
                      }`}>
                        {coin.change24h >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        )}
                        <span className="font-medium">
                          {Math.abs(coin.change24h).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card title="Açık Pozisyonlar" subtitle={`${openPositions.length} aktif pozisyon`}>
              <div className="space-y-4">
                {openPositions.map((position) => {
                  const coin = mockCoins.find(c => c.id === position.coinId);
                  if (!coin) return null;
                  
                  return (
                    <div key={position.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{coin.icon}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {coin.symbol}
                            </p>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              position.type === 'long' 
                                ? 'bg-success/20 text-success' 
                                : 'bg-danger/20 text-danger'
                            }`}>
                              {position.type.toUpperCase()}
                            </span>
                            <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full">
                              {position.leverage}x
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Giriş: {formatCurrency(position.entryPrice)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          position.pnl >= 0 ? 'text-success' : 'text-danger'
                        }`}>
                          {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {position.amount} {coin.symbol}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <Button variant="secondary" className="w-full">
                  Tüm Pozisyonları Görüntüle
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card title="Son İşlemler" subtitle="Güncel aktiviteler">
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'deposit' 
                          ? 'bg-success/20' 
                          : transaction.type === 'withdraw'
                          ? 'bg-warning/20'
                          : 'bg-primary-100 dark:bg-primary-900/20'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownRight className={`w-4 h-4 text-success`} />
                        ) : transaction.type === 'withdraw' ? (
                          <ArrowUpRight className={`w-4 h-4 text-warning`} />
                        ) : (
                          <Activity className={`w-4 h-4 text-primary-600`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.type === 'deposit' 
                            ? 'Para Yatırma' 
                            : transaction.type === 'withdraw'
                            ? 'Para Çekme'
                            : 'Trading'
                          }
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.method || 'Platform'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {transaction.type === 'withdraw' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <div className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-success/20 text-success'
                          : transaction.status === 'pending'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-danger/20 text-danger'
                      }`}>
                        {transaction.status === 'completed' 
                          ? 'Tamamlandı' 
                          : transaction.status === 'pending'
                          ? 'Beklemede'
                          : 'Reddedildi'
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="secondary" className="w-full">
                  Tüm İşlemleri Görüntüle
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card title="Hızlı İşlemler" subtitle="Popüler işlemler">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="primary" className="h-16">
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">BTC Al</span>
                </div>
              </Button>
              <Button variant="secondary" className="h-16">
                <div className="text-center">
                  <TrendingDown className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">ETH Sat</span>
                </div>
              </Button>
              <Button variant="secondary" className="h-16">
                <div className="text-center">
                  <Wallet className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">Para Yatır</span>
                </div>
              </Button>
              <Button variant="secondary" className="h-16">
                <div className="text-center">
                  <Activity className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm">Forex</span>
                </div>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}