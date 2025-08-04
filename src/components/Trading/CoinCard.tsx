'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Coin } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Card } from '@/components/UI/Card';

interface CoinCardProps {
  coin: Coin;
  onClick?: () => void;
  isSelected?: boolean;
}

export function CoinCard({ coin, onClick, isSelected }: CoinCardProps) {
  const isPositive = coin.change24h >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className={`transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary-500 border-primary-500' : ''
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {coin.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {coin.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {coin.symbol}
              </p>
            </div>
          </div>
          <div className={`p-2 rounded-lg ${
            isPositive ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
          }`}>
            {isPositive ? (
              <TrendingUp className={`w-5 h-5 ${isPositive ? 'text-success' : 'text-danger'}`} />
            ) : (
              <TrendingDown className={`w-5 h-5 ${isPositive ? 'text-success' : 'text-danger'}`} />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Fiyat</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(coin.price)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">24s Değişim</span>
            <span className={`font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Hacim</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {formatNumber(coin.volume)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Piyasa Değeri</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {formatNumber(coin.marketCap)}
            </span>
          </div>
        </div>

        {/* Price Chart Mini */}
        <div className="mt-4 h-8 bg-gray-100 dark:bg-dark-700 rounded overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke={isPositive ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              points={
                Array.from({ length: 20 }, (_, i) => {
                  const x = (i / 19) * 100;
                  const y = 15 + Math.sin(i * 0.5) * 5 + (Math.random() - 0.5) * 3;
                  return `${x},${y}`;
                }).join(' ')
              }
            />
          </svg>
        </div>
      </Card>
    </motion.div>
  );
}