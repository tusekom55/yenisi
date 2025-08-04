'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Wallet,
  TrendingUp,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Eye,
  UserCheck,
  AlertTriangle,
  DollarSign,
  Activity,
} from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, StatsCard } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { mockAdminStats, mockCoins } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';

// Mock admin data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    balance: 125847.50,
    verified: true,
    joinDate: '2024-01-15',
    lastLogin: '2024-04-08 10:30',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'pending',
    balance: 45230.75,
    verified: false,
    joinDate: '2024-04-05',
    lastLogin: '2024-04-08 09:15',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'suspended',
    balance: 0,
    verified: true,
    joinDate: '2024-03-20',
    lastLogin: '2024-04-07 16:45',
  },
];

const mockPendingTransactions = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    type: 'deposit',
    amount: 10000,
    method: 'Papara',
    date: '2024-04-08 11:30',
    status: 'pending',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    type: 'withdraw',
    amount: 5000,
    method: 'Havale',
    date: '2024-04-08 10:15',
    status: 'pending',
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Doe',
    type: 'withdraw',
    amount: 25000,
    method: 'Kredi Kartı',
    date: '2024-04-08 09:45',
    status: 'pending',
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'transactions' | 'coins'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddCoinModal, setShowAddCoinModal] = useState(false);
  const [newCoin, setNewCoin] = useState({
    name: '',
    symbol: '',
    description: '',
    icon: '',
  });

  const handleApproveTransaction = (id: string) => {
    console.log('Approving transaction:', id);
    // API call would go here
  };

  const handleRejectTransaction = (id: string) => {
    console.log('Rejecting transaction:', id);
    // API call would go here
  };

  const handleAddCoin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new coin:', newCoin);
    setShowAddCoinModal(false);
    setNewCoin({ name: '', symbol: '', description: '', icon: '' });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { bg: 'bg-success/20', text: 'text-success', label: 'Aktif' },
      pending: { bg: 'bg-warning/20', text: 'text-warning', label: 'Beklemede' },
      suspended: { bg: 'bg-danger/20', text: 'text-danger', label: 'Askıya Alındı' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Paneli
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Platform yönetimi ve kullanıcı işlemleri
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Rapor İndir
            </Button>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Coin Ekle
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatsCard
              title="Toplam Kullanıcı"
              value={mockAdminStats.totalUsers.toLocaleString()}
              change={8.2}
              icon={<Users className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatsCard
              title="Toplam Hacim"
              value={formatNumber(mockAdminStats.totalVolume)}
              change={15.3}
              icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsCard
              title="Beklemede Çekme"
              value={mockAdminStats.pendingWithdrawals}
              icon={<Wallet className="w-6 h-6 text-warning" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StatsCard
              title="Beklemede Yatırma"
              value={mockAdminStats.pendingDeposits}
              icon={<DollarSign className="w-6 h-6 text-success" />}
            />
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-dark-600">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Genel Bakış', icon: Activity },
              { id: 'users', name: 'Kullanıcılar', icon: Users },
              { id: 'transactions', name: 'İşlemler', icon: Wallet },
              { id: 'coins', name: 'Coin Yönetimi', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card title="Son Aktiviteler" subtitle="Platform genelindeki son işlemler">
                <div className="space-y-4">
                  {[
                    { user: 'John Doe', action: 'BTC pozisyon açtı', amount: '₺15,000', time: '2 dk önce' },
                    { user: 'Jane Smith', action: 'Para yatırdı', amount: '₺10,000', time: '5 dk önce' },
                    { user: 'Mike Johnson', action: 'ETH sattı', amount: '₺25,000', time: '8 dk önce' },
                    { user: 'Sarah Wilson', action: 'Hesap doğruladı', amount: '-', time: '12 dk önce' },
                    { user: 'David Brown', action: 'Para çekti', amount: '₺5,000', time: '15 dk önce' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.action}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activity.amount}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* System Status */}
              <Card title="Sistem Durumu" subtitle="Platform sağlık göstergeleri">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-gray-900 dark:text-white">API Durumu</span>
                    </div>
                    <span className="text-success font-medium">Çevrimiçi</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-gray-900 dark:text-white">Veritabanı</span>
                    </div>
                    <span className="text-success font-medium">Normal</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <span className="text-gray-900 dark:text-white">Ödeme Sistemi</span>
                    </div>
                    <span className="text-warning font-medium">Yavaş</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-gray-900 dark:text-white">Trading Motoru</span>
                    </div>
                    <span className="text-success font-medium">Optimal</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'users' && (
            <Card title="Kullanıcı Yönetimi" subtitle={`${filteredUsers.length} kullanıcı listeleniyor`}>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white w-64"
                  />
                </div>
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="active">Aktif</option>
                  <option value="pending">Beklemede</option>
                  <option value="suspended">Askıya Alındı</option>
                </select>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-dark-600">
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">Kullanıcı</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">Durum</th>
                      <th className="text-right py-3 text-gray-600 dark:text-gray-400">Bakiye</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">Katılım</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">Son Giriş</th>
                      <th className="text-center py-3 text-gray-600 dark:text-gray-400">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {user.email}
                              </p>
                            </div>
                            {user.verified && (
                              <UserCheck className="w-4 h-4 text-success" />
                            )}
                          </div>
                        </td>
                        <td className="py-3">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="py-3 text-right font-medium text-gray-900 dark:text-white">
                          {formatCurrency(user.balance)}
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">
                          {new Date(user.joinDate).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">
                          {user.lastLogin}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center justify-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Shield className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'transactions' && (
            <Card title="Bekleyen İşlemler" subtitle={`${mockPendingTransactions.length} işlem onay bekliyor`}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-dark-600">
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">Kullanıcı</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">İşlem Tipi</th>
                      <th className="text-right py-3 text-gray-600 dark:text-gray-400">Tutar</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">Yöntem</th>
                      <th className="text-left py-3 text-gray-600 dark:text-gray-400">Tarih</th>
                      <th className="text-center py-3 text-gray-600 dark:text-gray-400">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPendingTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {transaction.userName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {transaction.userName}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                ID: {transaction.userId}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            transaction.type === 'deposit' 
                              ? 'bg-success/20 text-success' 
                              : 'bg-warning/20 text-warning'
                          }`}>
                            {transaction.type === 'deposit' ? 'Para Yatırma' : 'Para Çekme'}
                          </span>
                        </td>
                        <td className="py-3 text-right font-medium text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">
                          {transaction.method}
                        </td>
                        <td className="py-3 text-gray-600 dark:text-gray-400">
                          {transaction.date}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center justify-center space-x-2">
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={() => handleApproveTransaction(transaction.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleRejectTransaction(transaction.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === 'coins' && (
            <div className="space-y-6">
              <Card title="Coin Yönetimi" subtitle={`${mockCoins.length} coin listeleniyor`}>
                <div className="mb-4">
                  <Button onClick={() => setShowAddCoinModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Coin Ekle
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockCoins.map((coin) => (
                    <div key={coin.id} className="p-4 border border-gray-200 dark:border-dark-600 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{coin.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {coin.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {coin.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Fiyat:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatCurrency(coin.price)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">24s Değişim:</span>
                          <span className={coin.change24h >= 0 ? 'text-success' : 'text-danger'}>
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Hacim:</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formatNumber(coin.volume)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Add Coin Modal */}
      {showAddCoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Yeni Coin Ekle
            </h3>
            
            <form onSubmit={handleAddCoin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Coin Adı
                </label>
                <input
                  type="text"
                  value={newCoin.name}
                  onChange={(e) => setNewCoin({ ...newCoin, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="Bitcoin"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sembol
                </label>
                <input
                  type="text"
                  value={newCoin.symbol}
                  onChange={(e) => setNewCoin({ ...newCoin, symbol: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="BTC"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  İkon
                </label>
                <input
                  type="text"
                  value={newCoin.icon}
                  onChange={(e) => setNewCoin({ ...newCoin, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="₿"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={newCoin.description}
                  onChange={(e) => setNewCoin({ ...newCoin, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Coin hakkında kısa açıklama..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowAddCoinModal(false)}
                >
                  İptal
                </Button>
                <Button type="submit" className="flex-1">
                  Coin Ekle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}