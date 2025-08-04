'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  X,
  Edit,
  ExternalLink,
} from 'lucide-react';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Position } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { mockCoins } from '@/data/mockData';

interface PositionsListProps {
  positions: Position[];
  className?: string;
}

export function PositionsList({ positions, className }: PositionsListProps) {
  const openPositions = positions.filter(p => p.status === 'open');
  const totalPnL = openPositions.reduce((sum, position) => sum + position.pnl, 0);

  const handleClosePosition = (positionId: string) => {
    console.log('Closing position:', positionId);
    // Close position logic would go here
  };

  const handleEditPosition = (positionId: string) => {
    console.log('Editing position:', positionId);
    // Edit position logic would go here
  };

  return (
    <Card 
      title="Açık Pozisyonlar" 
      subtitle={`${openPositions.length} pozisyon • Toplam P&L: ${formatCurrency(totalPnL)}`}
      className={className}
    >
      {openPositions.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Açık pozisyonunuz yok
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            İlk pozisyonunuzu açarak trading yapmaya başlayın
          </p>
          <Button>
            Pozisyon Aç
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {openPositions.map((position, index) => {
            const coin = mockCoins.find(c => c.id === position.coinId);
            if (!coin) return null;

            const pnlPercentage = (position.pnl / (position.entryPrice * position.amount)) * 100;
            const currentValue = position.currentPrice * position.amount;
            const initialValue = position.entryPrice * position.amount;

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
                    <span className="text-2xl">{coin.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {coin.symbol}/USDT
                        </h4>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          position.type === 'long' 
                            ? 'bg-success/20 text-success' 
                            : 'bg-danger/20 text-danger'
                        }`}>
                          {position.type.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full font-medium">
                          {position.leverage}x
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {position.amount} {coin.symbol}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditPosition(position.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Giriş Fiyatı
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(position.entryPrice)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Güncel Fiyat
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(position.currentPrice)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      P&L
                    </p>
                    <div className={`font-semibold ${
                      position.pnl >= 0 ? 'text-success' : 'text-danger'
                    }`}>
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
                      Değer
                    </p>
                    <div className="font-medium text-gray-900 dark:text-white">
                      <p>{formatCurrency(currentValue)}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        İlk: {formatCurrency(initialValue)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar for P&L */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>P&L Durumu</span>
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
                    Stop Loss Ekle
                  </Button>
                  <Button variant="secondary" size="sm" className="flex-1">
                    Take Profit Ekle
                  </Button>
                  <Button 
                    variant={position.type === 'long' ? 'danger' : 'success'} 
                    size="sm" 
                    className="flex-1"
                  >
                    {position.type === 'long' ? 'Sat' : 'Al'}
                  </Button>
                </div>
              </motion.div>
            );
          })}

          {/* Summary */}
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-primary-600 dark:text-primary-400">
                  Toplam Pozisyon
                </p>
                <p className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                  {openPositions.length}
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
                  Ortalama Oran
                </p>
                <p className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                  {openPositions.length > 0 
                    ? (openPositions.reduce((sum, p) => sum + p.leverage, 0) / openPositions.length).toFixed(1)
                    : 0
                  }x
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}