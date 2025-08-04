'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  User,
  Settings,
  LogOut,
  Wallet,
  TrendingUp,
  Search,
  ChevronDown,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { mockUser, mockCoins } from '@/data/mockData';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'İşlem Tamamlandı',
      message: 'BTC Long pozisyonunuz kar ile kapatıldı',
      time: '5 dk önce',
      type: 'success',
    },
    {
      id: 2,
      title: 'Para Yatırma',
      message: 'Papara ile 10,000 TL yatırmanız onaylandı',
      time: '1 saat önce',
      type: 'info',
    },
    {
      id: 3,
      title: 'Risk Uyarısı',
      message: 'ETH pozisyonunuzda %5 zarar var',
      time: '2 saat önce',
      type: 'warning',
    },
  ];

  const filteredCoins = mockCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className={`bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 ${className}`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Coin ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
            />
          </div>
          
          {/* Search Results */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
              >
                {filteredCoins.length > 0 ? (
                  filteredCoins.slice(0, 5).map((coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer"
                      onClick={() => setSearchQuery('')}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{coin.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {coin.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {coin.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(coin.price)}
                        </p>
                        <p className={`text-sm ${coin.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    Sonuç bulunamadı
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Balance */}
          <div className="hidden md:flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg">
            <Wallet className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {formatCurrency(mockUser.balance)}
            </span>
          </div>

          {/* Price Ticker */}
          <div className="hidden lg:flex items-center space-x-4">
            {mockCoins.slice(0, 3).map((coin) => (
              <div key={coin.id} className="flex items-center space-x-2">
                <span className="text-sm">{coin.icon}</span>
                <div className="text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(coin.price)}
                  </span>
                  <span className={`ml-1 ${coin.change24h >= 0 ? 'text-success' : 'text-danger'}`}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full flex items-center justify-center">
                <span className="text-xs text-white">3</span>
              </span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg shadow-lg z-50"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-dark-600">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Bildirimler
                    </h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 border-b last:border-b-0 border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700"
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-success' :
                            notification.type === 'warning' ? 'bg-warning' : 'bg-primary-500'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="hidden md:block font-medium">
                {mockUser.name}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 rounded-lg shadow-lg z-50"
                >
                  <div className="p-2">
                    <button className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      <span>Profil</span>
                    </button>
                    <button className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Ayarlar</span>
                    </button>
                    <button className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors text-danger">
                      <LogOut className="w-4 h-4" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}