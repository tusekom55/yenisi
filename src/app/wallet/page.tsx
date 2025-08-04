'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building2,
  Smartphone,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Info,
} from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, StatsCard } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { mockUser, mockTransactions, paymentMethods } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setAmount('');
      setDescription('');
      alert(`${activeTab === 'deposit' ? 'Para yatırma' : 'Para çekme'} talebi oluşturuldu!`);
    }, 2000);
  };

  const transactionsByType = {
    deposit: mockTransactions.filter(t => t.type === 'deposit'),
    withdraw: mockTransactions.filter(t => t.type === 'withdraw'),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-danger" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'pending':
        return 'Beklemede';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Bilinmiyor';
    }
  };

  const quickAmounts = ['1000', '5000', '10000', '25000', '50000'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Para İşlemleri
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Hızlı ve güvenli para yatırma/çekme işlemleri
            </p>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatsCard
              title="Toplam Bakiye"
              value={
                <div className="flex items-center space-x-2">
                  <span>{balanceVisible ? formatCurrency(mockUser.balance) : '••••••'}</span>
                  <button
                    onClick={() => setBalanceVisible(!balanceVisible)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
                  >
                    {balanceVisible ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              }
              change={5.2}
              icon={<Wallet className="w-6 h-6 text-primary-600" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <StatsCard
              title="Kullanılabilir Bakiye"
              value={formatCurrency(mockUser.balance * 0.85)}
              icon={<ArrowUpRight className="w-6 h-6 text-success" />}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatsCard
              title="Donmuş Bakiye"
              value={formatCurrency(mockUser.balance * 0.15)}
              icon={<ArrowDownLeft className="w-6 h-6 text-warning" />}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transaction Form */}
          <div className="lg:col-span-2">
            <Card>
              {/* Tab Navigation */}
              <div className="flex bg-gray-100 dark:bg-dark-700 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab('deposit')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'deposit'
                      ? 'bg-white dark:bg-dark-800 text-primary-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Para Yatır</span>
                </button>
                <button
                  onClick={() => setActiveTab('withdraw')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'withdraw'
                      ? 'bg-white dark:bg-dark-800 text-primary-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Para Çek</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Payment Methods */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        {activeTab === 'deposit' ? 'Ödeme Yöntemi' : 'Çekme Yöntemi'}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            onClick={() => setSelectedMethod(method)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedMethod.id === method.id
                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500 bg-white dark:bg-dark-800'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{method.icon}</span>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {method.name}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Ücret: {method.fee}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tutar (TL)
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white text-lg"
                        placeholder="0.00"
                        required
                        min={activeTab === 'deposit' ? '10' : '50'}
                        max={activeTab === 'withdraw' ? mockUser.balance.toString() : undefined}
                      />
                      
                      {/* Quick Amount Buttons */}
                      <div className="grid grid-cols-5 gap-2 mt-3">
                        {quickAmounts.map((quickAmount) => (
                          <button
                            key={quickAmount}
                            type="button"
                            onClick={() => setAmount(quickAmount)}
                            className="py-2 text-sm bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                          >
                            {parseInt(quickAmount).toLocaleString('tr-TR')} ₺
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Açıklama (Opsiyonel)
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="İşlem açıklaması..."
                      />
                    </div>

                    {/* Fee Info */}
                    <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-primary-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
                            İşlem Detayları
                          </h4>
                          <div className="space-y-1 text-sm text-primary-700 dark:text-primary-300">
                            <div className="flex justify-between">
                              <span>İşlem Tutarı:</span>
                              <span>{amount ? formatCurrency(parseFloat(amount)) : '0 ₺'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>İşlem Ücreti ({selectedMethod.fee}):</span>
                              <span>
                                {amount 
                                  ? formatCurrency(parseFloat(amount) * (parseFloat(selectedMethod.fee) / 100))
                                  : '0 ₺'
                                }
                              </span>
                            </div>
                            <div className="flex justify-between font-medium border-t border-primary-200 dark:border-primary-800 pt-1">
                              <span>
                                {activeTab === 'deposit' ? 'Hesabınıza Geçecek:' : 'Hesabınızdan Çekilecek:'}
                              </span>
                              <span>
                                {amount 
                                  ? formatCurrency(
                                      parseFloat(amount) * (activeTab === 'deposit' ? 1 - parseFloat(selectedMethod.fee) / 100 : 1 + parseFloat(selectedMethod.fee) / 100)
                                    )
                                  : '0 ₺'
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      isLoading={isLoading}
                      disabled={!amount || parseFloat(amount) <= 0}
                    >
                      {activeTab === 'deposit' ? 'Para Yatır' : 'Para Çek'}
                    </Button>

                    {/* Limits Info */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <p>
                        {activeTab === 'deposit' 
                          ? `• Minimum yatırma tutarı: ${formatCurrency(10)}`
                          : `• Minimum çekme tutarı: ${formatCurrency(50)}`
                        }
                      </p>
                      <p>
                        {activeTab === 'deposit' 
                          ? `• Maksimum günlük yatırma: ${formatCurrency(500000)}`
                          : `• Maksimum günlük çekme: ${formatCurrency(100000)}`
                        }
                      </p>
                      <p>
                        • İşlem süresi: {selectedMethod.id === 'papara' ? '0-5 dakika' : selectedMethod.id === 'bank' ? '1-3 iş günü' : '15-30 dakika'}
                      </p>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>

          {/* Transaction History */}
          <div>
            <Card title="Son İşlemler" subtitle="Para yatırma/çekme geçmişi">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {transactionsByType[activeTab].map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'deposit' 
                          ? 'bg-success/20' 
                          : 'bg-warning/20'
                      }`}>
                        {transaction.type === 'deposit' ? (
                          <ArrowDownLeft className="w-4 h-4 text-success" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-warning" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(transaction.amount)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.method}
                          </p>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(transaction.status)}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {getStatusText(transaction.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button variant="secondary" className="w-full">
                  Tüm İşlem Geçmişi
                </Button>
              </div>
            </Card>

            {/* Support */}
            <Card title="Yardım & Destek" className="mt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      WhatsApp Destek
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +90 555 123 4567
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Banka Hesap No
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      TR12 3456 7890 1234 5678 90
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}