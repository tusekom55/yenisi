'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown,
  Calculator,
  AlertTriangle,
  Zap,
  Target,
  Shield,
} from 'lucide-react';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { formatCurrency } from '@/lib/utils';
import { leverageOptions } from '@/data/mockData';

interface ForexTradingPanelProps {
  pair: {
    symbol: string;
    price: number;
    change: number;
  };
  balance: number;
  className?: string;
}

export function ForexTradingPanel({ pair, balance, className }: ForexTradingPanelProps) {
  const [side, setSide] = useState<'long' | 'short'>('long');
  const [leverage, setLeverage] = useState(10);
  const [amount, setAmount] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [percentage, setPercentage] = useState(0);

  const handlePercentageClick = (pct: number) => {
    setPercentage(pct);
    const maxAmount = (balance * leverage) / pair.price;
    const calculatedAmount = (maxAmount * pct / 100).toFixed(2);
    setAmount(calculatedAmount);
  };

  const calculateMargin = () => {
    const amountNum = parseFloat(amount) || 0;
    return (amountNum * pair.price) / leverage;
  };

  const calculatePotentialPnL = () => {
    const amountNum = parseFloat(amount) || 0;
    const stopLossNum = parseFloat(stopLoss) || 0;
    const takeProfitNum = parseFloat(takeProfit) || 0;
    
    if (side === 'long') {
      return {
        loss: stopLossNum ? (stopLossNum - pair.price) * amountNum : 0,
        profit: takeProfitNum ? (takeProfitNum - pair.price) * amountNum : 0,
      };
    } else {
      return {
        loss: stopLossNum ? (pair.price - stopLossNum) * amountNum : 0,
        profit: takeProfitNum ? (pair.price - takeProfitNum) * amountNum : 0,
      };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Forex trade submitted:', {
      pair: pair.symbol,
      side,
      leverage,
      amount,
      stopLoss,
      takeProfit,
    });
  };

  const potentialPnL = calculatePotentialPnL();
  const requiredMargin = calculateMargin();

  return (
    <Card title="Forex İşlem Paneli" className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pair Info */}
        <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {pair.symbol}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Güncel Kur
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
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
                <span className="text-sm font-medium">
                  {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Long/Short Toggle */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setSide('long')}
            className={`p-3 rounded-lg font-medium transition-colors ${
              side === 'long'
                ? 'bg-success text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            <TrendingUp className="w-4 h-4 mx-auto mb-1" />
            Long (Yükseliş)
          </button>
          <button
            type="button"
            onClick={() => setSide('short')}
            className={`p-3 rounded-lg font-medium transition-colors ${
              side === 'short'
                ? 'bg-danger text-white'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            <TrendingDown className="w-4 h-4 mx-auto mb-1" />
            Short (Düşüş)
          </button>
        </div>

        {/* Leverage Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kaldıraç Oranı
          </label>
          <div className="grid grid-cols-4 gap-2">
            {leverageOptions.slice(0, 8).map((lev) => (
              <button
                key={lev}
                type="button"
                onClick={() => setLeverage(lev)}
                className={`p-2 text-sm rounded-lg transition-colors ${
                  leverage === lev
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                {lev}x
              </button>
            ))}
          </div>
          <div className="mt-2 p-2 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-warning" />
              <p className="text-xs text-warning">
                Yüksek kaldıraç yüksek risk demektir. Dikkatli olun!
              </p>
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Lot Miktarı
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Max: {((balance * leverage) / pair.price).toFixed(2)} lot
            </span>
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            placeholder="0.01"
            step="0.01"
            min="0.01"
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

        {/* Stop Loss & Take Profit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Shield className="w-4 h-4 inline mr-1" />
              Stop Loss
            </label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              placeholder={side === 'long' ? (pair.price * 0.95).toFixed(4) : (pair.price * 1.05).toFixed(4)}
              step="0.0001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Target className="w-4 h-4 inline mr-1" />
              Take Profit
            </label>
            <input
              type="number"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              placeholder={side === 'long' ? (pair.price * 1.05).toFixed(4) : (pair.price * 0.95).toFixed(4)}
              step="0.0001"
            />
          </div>
        </div>

        {/* Trade Summary */}
        <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Gerekli Marj:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(requiredMargin)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Spread:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {(pair.price * 0.0001).toFixed(4)}
            </span>
          </div>
          {stopLoss && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Max Zarar:</span>
              <span className="font-medium text-danger">
                {formatCurrency(Math.abs(potentialPnL.loss))}
              </span>
            </div>
          )}
          {takeProfit && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Max Kar:</span>
              <span className="font-medium text-success">
                {formatCurrency(potentialPnL.profit)}
              </span>
            </div>
          )}
        </div>

        {/* Risk Warning */}
        <div className="flex items-start space-x-2 p-3 bg-danger/10 border border-danger/20 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-danger mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-danger font-medium">
              Yüksek Risk Uyarısı
            </p>
            <p className="text-xs text-danger">
              Forex trading'de sermayenizin tamamını kaybetme riski vardır. 
              {leverage}x kaldıraç ile risk {leverage} kat artmaktadır.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className={`w-full ${
            side === 'long' 
              ? 'bg-success hover:bg-green-600' 
              : 'bg-danger hover:bg-red-600'
          }`}
          size="lg"
          disabled={!amount || parseFloat(amount) <= 0}
        >
          {side === 'long' ? 'Long Pozisyon Aç' : 'Short Pozisyon Aç'}
        </Button>

        {/* Calculator Link */}
        <Button variant="ghost" className="w-full">
          <Calculator className="w-4 h-4 mr-2" />
          Pip Hesaplayıcısı
        </Button>
      </form>
    </Card>
  );
}