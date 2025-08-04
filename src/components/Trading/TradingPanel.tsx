'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  Calculator,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Coin } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface TradingPanelProps {
  coin: Coin;
  balance: number;
  className?: string;
}

export function TradingPanel({ coin, balance, className }: TradingPanelProps) {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState(coin.price.toString());
  const [stopPrice, setStopPrice] = useState('');
  const [percentage, setPercentage] = useState(0);

  const handlePercentageClick = (pct: number) => {
    setPercentage(pct);
    const maxAmount = balance / coin.price;
    const calculatedAmount = (maxAmount * pct / 100).toFixed(6);
    setAmount(calculatedAmount);
  };

  const calculateTotal = () => {
    const amountNum = parseFloat(amount) || 0;
    const priceNum = parseFloat(price) || coin.price;
    return amountNum * priceNum;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trading logic would go here
    console.log('Trade submitted:', {
      coin: coin.symbol,
      side,
      orderType,
      amount,
      price,
      stopPrice,
    });
  };

  return (
    <Card title="İşlem Paneli" className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Buy/Sell Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSide('buy')}
            className={`p-3 rounded-lg font-medium transition-colors ${
              side === 'buy'
                ? 'bg-success text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            <TrendingUp className="w-4 h-4 mx-auto mb-1" />
            Satın Al
          </button>
          <button
            type="button"
            onClick={() => setSide('sell')}
            className={`p-3 rounded-lg font-medium transition-colors ${
              side === 'sell'
                ? 'bg-danger text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            <TrendingDown className="w-4 h-4 mx-auto mb-1" />
            Sat
          </button>
        </div>

        {/* Order Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Emir Tipi
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'market', name: 'Market' },
              { id: 'limit', name: 'Limit' },
              { id: 'stop', name: 'Stop' },
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setOrderType(type.id as any)}
                className={`p-2 text-sm rounded-lg transition-colors ${
                  orderType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price Input (for limit/stop orders) */}
        {orderType !== 'market' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {orderType === 'limit' ? 'Limit Fiyat' : 'Stop Fiyat'} (USDT)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              placeholder="0.00"
              step="0.00000001"
            />
          </div>
        )}

        {/* Amount Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Miktar ({coin.symbol})
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Bakiye: {(balance / coin.price).toFixed(6)} {coin.symbol}
            </span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            placeholder="0.00000000"
            step="0.00000001"
          />
        </div>

        {/* Percentage Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handlePercentageClick(pct)}
              className={`p-2 text-sm rounded-lg transition-colors ${
                percentage === pct
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
              }`}
            >
              %{pct}
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Toplam Tutar:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatCurrency(calculateTotal())}
            </span>
          </div>
          {orderType !== 'market' && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tahmini Ücret:
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {formatCurrency(calculateTotal() * 0.001)} (0.1%)
              </span>
            </div>
          )}
        </div>

        {/* Risk Warning */}
        <div className="flex items-start space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
          <p className="text-xs text-warning">
            Kripto para ticareti yüksek risk içerir. Yatırım yapmadan önce risk toleransınızı değerlendirin.
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className={`w-full ${
            side === 'buy' 
              ? 'bg-success hover:bg-green-600' 
              : 'bg-danger hover:bg-red-600'
          }`}
          size="lg"
        >
          {side === 'buy' ? 'Satın Al' : 'Sat'} {coin.symbol}
        </Button>

        {/* Market Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-dark-600">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">24s Hacim</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {(coin.volume / 1000000).toFixed(1)}M
              </p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {(coin.marketCap / 1000000000).toFixed(1)}B
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Link */}
        <Button variant="ghost" className="w-full">
          <Calculator className="w-4 h-4 mr-2" />
          Kar/Zarar Hesaplayıcı
        </Button>
      </form>
    </Card>
  );
}