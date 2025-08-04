import { Coin, User, Position, Transaction, AdminStats } from '@/types';

export const mockCoins: Coin[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 645789.50,
    change24h: 2.45,
    volume: 28945672100,
    marketCap: 1247658900000,
    icon: '₿'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 42567.85,
    change24h: -1.23,
    volume: 15687432100,
    marketCap: 512468900000,
    icon: 'Ξ'
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: 8756.42,
    change24h: 0.87,
    volume: 1847563210,
    marketCap: 134567890000,
    icon: 'BNB'
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 12.48,
    change24h: -3.45,
    volume: 567432100,
    marketCap: 42567890000,
    icon: 'ADA'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 2847.65,
    change24h: 5.67,
    volume: 2847563210,
    marketCap: 126789450000,
    icon: 'SOL'
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 187.42,
    change24h: -0.95,
    volume: 847563210,
    marketCap: 23456789000,
    icon: 'DOT'
  }
];

export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/150',
  balance: 125847.50,
  isVerified: true,
  createdAt: new Date('2023-01-15'),
};

export const mockPositions: Position[] = [
  {
    id: '1',
    userId: '1',
    coinId: 'bitcoin',
    type: 'long',
    amount: 0.5,
    entryPrice: 620000,
    currentPrice: 645789.50,
    leverage: 10,
    pnl: 12894.75,
    status: 'open',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    userId: '1',
    coinId: 'ethereum',
    type: 'short',
    amount: 2,
    entryPrice: 45000,
    currentPrice: 42567.85,
    leverage: 5,
    pnl: 4864.30,
    status: 'open',
    createdAt: new Date('2024-01-19'),
  },
  {
    id: '3',
    userId: '1',
    coinId: 'solana',
    type: 'long',
    amount: 10,
    entryPrice: 2500,
    currentPrice: 2847.65,
    leverage: 20,
    pnl: 6953.00,
    status: 'open',
    createdAt: new Date('2024-01-18'),
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'deposit',
    amount: 50000,
    status: 'completed',
    method: 'Papara',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    userId: '1',
    type: 'withdraw',
    amount: 25000,
    status: 'pending',
    method: 'Havale',
    createdAt: new Date('2024-01-19'),
  },
  {
    id: '3',
    userId: '1',
    type: 'trade',
    amount: 10000,
    status: 'completed',
    createdAt: new Date('2024-01-18'),
  },
];

export const mockAdminStats: AdminStats = {
  totalUsers: 12547,
  totalVolume: 15847563210,
  pendingWithdrawals: 47,
  pendingDeposits: 23,
};

export const forexPairs = [
  { symbol: 'EUR/USD', price: 1.0875, change: 0.12 },
  { symbol: 'GBP/USD', price: 1.2654, change: -0.08 },
  { symbol: 'USD/JPY', price: 148.75, change: 0.25 },
  { symbol: 'USD/TRY', price: 29.45, change: -0.35 },
  { symbol: 'AUD/USD', price: 0.6542, change: 0.18 },
  { symbol: 'USD/CAD', price: 1.3487, change: -0.05 },
];

export const leverageOptions = [1, 2, 5, 10, 20, 50, 100];

export const paymentMethods = [
  { id: 'papara', name: 'Papara', icon: '💳', fee: '0%' },
  { id: 'bank', name: 'Banka Havalesi', icon: '🏦', fee: '0.5%' },
  { id: 'credit', name: 'Kredi Kartı', icon: '💰', fee: '2%' },
];