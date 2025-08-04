'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Maximize,
  Settings,
  Clock,
} from 'lucide-react';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Coin } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface TradingChartProps {
  coin: Coin;
  className?: string;
}

export function TradingChart({ coin, className }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState('candlestick');

  const timeframes = ['1M', '5M', '15M', '30M', '1H', '4H', '1D', '1W'];
  const chartTypes = [
    { id: 'candlestick', name: 'Mum Grafik' },
    { id: 'line', name: 'Çizgi' },
    { id: 'area', name: 'Alan' },
  ];

  // Dummy chart data points for visualization
  const generateChartPoints = () => {
    const points = [];
    const basePrice = coin.price;
    for (let i = 0; i < 100; i++) {
      const variance = (Math.random() - 0.5) * 0.05;
      const price = basePrice * (1 + variance + Math.sin(i * 0.1) * 0.02);
      points.push({
        x: (i / 99) * 100,
        y: 50 + (price - basePrice) / basePrice * 200,
      });
    }
    return points;
  };

  const chartPoints = generateChartPoints();
  const pathData = `M ${chartPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  return (
    <Card className={`h-full ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{coin.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {coin.symbol}/USDT
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(coin.price)}
                </span>
                <div className={`flex items-center space-x-1 ${
                  coin.change24h >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {coin.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-4 h-4 text-gray-500" />
        <div className="flex bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                timeframe === tf
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-80 bg-gray-50 dark:bg-dark-700 rounded-lg overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid Lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="text-gray-300 dark:text-gray-600"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Price Chart */}
          <path
            d={pathData}
            fill="none"
            stroke={coin.change24h >= 0 ? '#10b981' : '#ef4444'}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Fill Area */}
          <path
            d={`${pathData} L 100 100 L 0 100 Z`}
            fill={coin.change24h >= 0 ? 'url(#greenGradient)' : 'url(#redGradient)'}
            opacity="0.1"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Chart Loading Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Canlı grafik verisi yükleniyor...
            </p>
          </div>
        </div>
      </div>

      {/* Chart Stats */}
      <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-600">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Yüksek</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(coin.price * 1.05)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Düşük</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(coin.price * 0.95)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Hacim</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {(coin.volume / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Ortalama</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {formatCurrency(coin.price * 1.002)}
          </p>
        </div>
      </div>
    </Card>
  );
}