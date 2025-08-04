export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  balance: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  icon: string;
}

export interface Position {
  id: string;
  userId: string;
  coinId: string;
  type: 'long' | 'short';
  amount: number;
  entryPrice: number;
  currentPrice: number;
  leverage: number;
  pnl: number;
  status: 'open' | 'closed';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdraw' | 'trade';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  method?: string;
  createdAt: Date;
}

export interface AdminStats {
  totalUsers: number;
  totalVolume: number;
  pendingWithdrawals: number;
  pendingDeposits: number;
}

export interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}