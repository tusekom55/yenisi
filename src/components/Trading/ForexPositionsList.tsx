'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  X,
  Edit,
  Shield,
  Target,
  Clock,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { formatCurrency } from '@/lib/utils';

interface ForexPosition {
  id: string;
  pair: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  leverage: number;
  pnl: number;
  margin: number;
  stopLoss?: number;
  takeProfit?: number;
  openTime: Date;
  swap: number;
}

interface ForexPositionsListProps {
  positions: ForexPosition[];
  className?: string;
}

// Mock forex positions
const mockForexPositions: ForexPosition[] = [
  {
    id: '1',
    pair: 'EUR/USD',
    side: 'long',
    size: 1.5,
    entryPrice: 1.0850,
    currentPrice: 1.0875,
    leverage: 50,
    pnl: 375,
    margin: 325.5,
    stopLoss: 1.0800,
    takeProfit: 1.0950,
    openTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    swap: -2.5,
  },
  {
    id: '2',
    pair: 'GBP/USD',
    side: 'short',
    size: 0.8,
    entryPrice: 1.2680,
    currentPrice: 1.2654,
    leverage: 30,
    pnl: 208,
    margin: 337.36,
    stopLoss: 1.2750,
    takeProfit: 1.2580,
    openTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
    swap: -1.8,
  },
  {
    id: '3',
    pair: 'USD/JPY',
    side: 'long',
    size: 2.0,
    entryPrice: 148.50,
    currentPrice: 148.75,
    leverage: 100,
    pnl: 500,
    margin: 297,
    takeProfit: 150.00,
    openTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    swap: 0.5,
  },
];

export function ForexPositionsList({ className }: ForexPositionsListProps) {
  const positions = mockForexPositions;
  const totalPnL = positions.reduce((sum, position) => sum + position.pnl, 0);
  const totalMargin = positions.reduce((sum, position) => sum + position.margin, 0);

  const handleClosePosition = (positionId: string) => {
    console.log('Closing forex position:', positionId);
  };

  const handleEditPosition = (positionId: string) => {
    console.log('Editing forex position:', positionId);
  };

  const calculatePips = (entry: number, current: number, side: 'long' | 'short') => {
    const diff = side === 'long' ? current - entry : entry - current;
    return Math.round(diff * 10000);
  };

  const formatDuration = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}s ${minutes}dk`;
    }
    return `${minutes}dk`;
  };

  return (
    <Card 
      title="Forex Pozisyonları" 
      subtitle={`${positions.length} pozisyon • P&L: ${formatCurrency(totalPnL)} • Marj: ${formatCurrency(totalMargin)}`}
      className={className}
    >
      {positions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Açık forex pozisyonunuz yok
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Forex piyasasında pozisyon açarak trading yapmaya başlayın
          </p>
          <Button>
            Pozisyon Aç
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((position, index) => {
            const pips = calculatePips(position.entryPrice, position.currentPrice, position.side);
            const pnlPercentage = (position.pnl / position.margin) * 100;

            return (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {position.pair}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                        position.side === 'long' 
                          ? 'bg-success/20 text-success' 
                          : 'bg-danger/20 text-danger'
                      }`}>
                        {position.side.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full font-medium">
                        {position.leverage}:1
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditPosition(position.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleClosePosition(position.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Lot Büyüklüğü
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {position.size.toFixed(2)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Giriş Fiyatı
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {position.entryPrice.toFixed(4)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Güncel Fiyat
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {position.currentPrice.toFixed(4)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Pip
                    </p>
                    <p className={`font-semibold ${pips >= 0 ? 'text-success' : 'text-danger'}`}>
                      {pips >= 0 ? '+' : ''}{pips}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      P&L
                    </p>
                    <div className={`font-semibold ${position.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      <p>
                        {position.pnl >= 0 ? '+' : ''}{formatCurrency(position.pnl)}
                      </p>
                      <p className="text-xs">
                        ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Marj
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(position.margin)}
                    </p>
                  </div>
                </div>

                {/* Stop Loss & Take Profit */}
                <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-danger" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Stop Loss</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {position.stopLoss ? position.stopLoss.toFixed(4) : 'Yok'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-success" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Take Profit</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {position.takeProfit ? position.takeProfit.toFixed(4) : 'Yok'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Süre</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDuration(position.openTime)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Swap */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-warning" />
                    <span className="text-gray-600 dark:text-gray-400">Swap (Overnight):</span>
                  </div>
                  <span className={`font-medium ${position.swap >= 0 ? 'text-success' : 'text-danger'}`}>
                    {position.swap >= 0 ? '+' : ''}{formatCurrency(position.swap)}
                  </span>
                </div>

                {/* Progress Bar for P&L */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>P&L Oranı</span>
                    <span>{pnlPercentage.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        position.pnl >= 0 ? 'bg-success' : 'bg-danger'
                      }`}
                      style={{
                        width: `${Math.min(Math.abs(pnlPercentage), 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-2 mt-3">
                  <Button variant="secondary" size="sm" className="flex-1">
                    SL Ekle/Düzenle
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    TP Ekle/Düzenle
                  </Button>
                  <Button 
                    variant={position.side === 'long' ? 'danger' : 'success'} 
                    size="sm" 
                    className="flex-1"
                  >
                    Pozisyonu Kapat
                  </Button>
                </div>
              </motion.div>
            );
          })}

          {/* Summary */}
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mt-6">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Toplam Pozisyon
                </p>
                <p className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                  {positions.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Toplam P&L
                </p>
                <p className={`text-lg font-semibold ${
                  totalPnL >= 0 ? 'text-success' : 'text-danger'
                }`}>
                  {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                </p>
              </div>
              <div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Kullanılan Marj
                </p>
                <p className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                  {formatCurrency(totalMargin)}
                </p>
              </div>
              <div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Ortalama Kaldıraç
                </p>
                <p className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                  {positions.length > 0 
                    ? (positions.reduce((sum, p) => sum + p.leverage, 0) / positions.length).toFixed(0)
                    : 0
                  }:1
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}