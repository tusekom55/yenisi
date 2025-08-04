import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency === 'USD' ? 'TRY' : currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

export function generateChartData(days: number = 30) {
  const data = [];
  const basePrice = Math.random() * 50000 + 10000;
  
  for (let i = 0; i < days * 24; i++) {
    const timestamp = Date.now() - (days * 24 - i) * 60 * 60 * 1000;
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * volatility;
    const price = basePrice * (1 + change * i * 0.001);
    
    data.push({
      timestamp,
      open: price * (0.98 + Math.random() * 0.04),
      high: price * (1.01 + Math.random() * 0.02),
      low: price * (0.97 + Math.random() * 0.02),
      close: price,
      volume: Math.random() * 1000000,
    });
  }
  
  return data;
}

export function calculatePnL(entryPrice: number, currentPrice: number, amount: number, type: 'long' | 'short'): number {
  if (type === 'long') {
    return (currentPrice - entryPrice) * amount;
  } else {
    return (entryPrice - currentPrice) * amount;
  }
}