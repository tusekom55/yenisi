'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText,
  Download,
  Print,
  Send,
  Calendar,
  User,
  Building2,
  TrendingUp,
  Eye,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { mockUser, mockTransactions } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

// Mock invoice data
const invoiceData = {
  invoiceNumber: 'INV-2024-001234',
  issueDate: '2024-04-08',
  dueDate: '2024-04-15',
  status: 'paid',
  
  // Company info
  company: {
    name: 'CryptoFX Trading Platform',
    address: 'Beşiktaş, İstanbul, Türkiye',
    phone: '+90 212 123 4567',
    email: 'info@cryptofx.com',
    website: 'www.cryptofx.com',
    taxNumber: '1234567890',
  },
  
  // Customer info from mockUser
  customer: {
    name: mockUser.name,
    email: mockUser.email,
    address: 'Kadıköy, İstanbul, Türkiye',
    phone: '+90 555 123 4567',
    taxNumber: '9876543210',
  },
  
  // Invoice items
  items: [
    {
      id: '1',
      description: 'Trading İşlem Ücreti',
      period: 'Mart 2024',
      quantity: 45,
      unitPrice: 12.50,
      total: 562.50,
    },
    {
      id: '2',
      description: 'Premium Hesap Ücreti',
      period: 'Mart 2024',
      quantity: 1,
      unitPrice: 299.99,
      total: 299.99,
    },
    {
      id: '3',
      description: 'Forex Spread Ücreti',
      period: 'Mart 2024',
      quantity: 23,
      unitPrice: 8.75,
      total: 201.25,
    },
    {
      id: '4',
      description: 'API Kullanım Ücreti',
      period: 'Mart 2024',
      quantity: 1000,
      unitPrice: 0.05,
      total: 50.00,
    },
  ],
};

// Calculate totals
const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
const taxRate = 0.18; // 18% KDV
const taxAmount = subtotal * taxRate;
const total = subtotal + taxAmount;

export default function InvoicePage() {
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [showPrintView, setShowPrintView] = useState(false);

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
    // PDF generation logic would go here
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = () => {
    console.log('Sending invoice via email...');
    // Email sending logic would go here
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { bg: 'bg-success/20', text: 'text-success', label: 'Ödendi' },
      pending: { bg: 'bg-warning/20', text: 'text-warning', label: 'Beklemede' },
      overdue: { bg: 'bg-danger/20', text: 'text-danger', label: 'Gecikmiş' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-3 py-1 text-sm rounded-full font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Fatura
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              İşlem faturalarınızı görüntüleyin ve indirin
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              <option value="2024-03">Mart 2024</option>
              <option value="2024-02">Şubat 2024</option>
              <option value="2024-01">Ocak 2024</option>
              <option value="2023-12">Aralık 2023</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Invoice Preview */}
          <div className="lg:col-span-3">
            <Card>
              {/* Invoice Actions */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-dark-600">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-primary-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {invoiceData.invoiceNumber}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Düzenleme: {new Date(invoiceData.issueDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {getStatusBadge(invoiceData.status)}
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setShowPrintView(!showPrintView)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handlePrint}>
                      <Print className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleSendEmail}>
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleDownloadPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      PDF İndir
                    </Button>
                  </div>
                </div>
              </div>

              {/* Invoice Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`space-y-6 ${showPrintView ? 'print:block' : ''}`}
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {invoiceData.company.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                          Trading Platform
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      FATURA
                    </h2>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>Fatura No: <span className="font-medium text-gray-900 dark:text-white">{invoiceData.invoiceNumber}</span></p>
                      <p>Düzenleme: <span className="font-medium text-gray-900 dark:text-white">{new Date(invoiceData.issueDate).toLocaleDateString('tr-TR')}</span></p>
                      <p>Vade: <span className="font-medium text-gray-900 dark:text-white">{new Date(invoiceData.dueDate).toLocaleDateString('tr-TR')}</span></p>
                    </div>
                  </div>
                </div>

                {/* Company & Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Fatura Düzenleyen
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium text-gray-900 dark:text-white">{invoiceData.company.name}</p>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{invoiceData.company.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{invoiceData.company.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{invoiceData.company.email}</span>
                      </div>
                      <p>Vergi No: {invoiceData.company.taxNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Fatura Edilen
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p className="font-medium text-gray-900 dark:text-white">{invoiceData.customer.name}</p>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{invoiceData.customer.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{invoiceData.customer.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{invoiceData.customer.email}</span>
                      </div>
                      <p>Vergi No: {invoiceData.customer.taxNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Fatura Kalemleri
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200 dark:border-dark-600">
                          <th className="text-left py-3 text-gray-600 dark:text-gray-400 font-medium">Açıklama</th>
                          <th className="text-left py-3 text-gray-600 dark:text-gray-400 font-medium">Dönem</th>
                          <th className="text-center py-3 text-gray-600 dark:text-gray-400 font-medium">Adet</th>
                          <th className="text-right py-3 text-gray-600 dark:text-gray-400 font-medium">Birim Fiyat</th>
                          <th className="text-right py-3 text-gray-600 dark:text-gray-400 font-medium">Toplam</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceData.items.map((item, index) => (
                          <tr key={item.id} className="border-b border-gray-100 dark:border-dark-700">
                            <td className="py-3 text-gray-900 dark:text-white font-medium">
                              {item.description}
                            </td>
                            <td className="py-3 text-gray-600 dark:text-gray-400">
                              {item.period}
                            </td>
                            <td className="py-3 text-center text-gray-600 dark:text-gray-400">
                              {item.quantity}
                            </td>
                            <td className="py-3 text-right text-gray-600 dark:text-gray-400">
                              {formatCurrency(item.unitPrice)}
                            </td>
                            <td className="py-3 text-right font-medium text-gray-900 dark:text-white">
                              {formatCurrency(item.total)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Ara Toplam:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">KDV (18%):</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(taxAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t-2 border-gray-200 dark:border-dark-600 pt-2">
                      <span className="text-gray-900 dark:text-white">Genel Toplam:</span>
                      <span className="text-primary-600 dark:text-primary-400">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="border-t border-gray-200 dark:border-dark-600 pt-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notlar:</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>• Bu fatura Mart 2024 döneminde gerçekleştirilen trading işlemlerini kapsamaktadır.</p>
                    <p>• Ödeme 7 gün içerisinde gerçekleştirilmelidir.</p>
                    <p>• Sorularınız için destek@cryptofx.com adresine yazabilirsiniz.</p>
                    <p>• Bu belge elektronik olarak düzenlenmiştir ve yasal geçerliliği vardır.</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-dark-600 pt-4">
                  <p>
                    Bu fatura {new Date().toLocaleDateString('tr-TR')} tarihinde elektronik olarak oluşturulmuştur.
                  </p>
                  <p className="mt-1">
                    CryptoFX Trading Platform - www.cryptofx.com
                  </p>
                </div>
              </motion.div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Invoice Summary */}
            <Card title="Fatura Özeti">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fatura No:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {invoiceData.invoiceNumber}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Durum:</span>
                  {getStatusBadge(invoiceData.status)}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Düzenleme:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(invoiceData.issueDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Vade:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {new Date(invoiceData.dueDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-dark-600">
                  <span className="font-medium text-gray-900 dark:text-white">Toplam:</span>
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Previous Invoices */}
            <Card title="Önceki Faturalar">
              <div className="space-y-3">
                {[
                  { id: 'INV-2024-001233', date: '2024-03-08', amount: 892.45, status: 'paid' },
                  { id: 'INV-2024-001232', date: '2024-02-08', amount: 1156.78, status: 'paid' },
                  { id: 'INV-2024-001231', date: '2024-01-08', amount: 743.22, status: 'paid' },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {invoice.id}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(invoice.date).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(invoice.amount)}
                      </p>
                      {getStatusBadge(invoice.status)}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="secondary" className="w-full mt-4">
                Tüm Faturaları Görüntüle
              </Button>
            </Card>

            {/* Support */}
            <Card title="Yardım">
              <div className="space-y-3 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Faturalarınızla ilgili sorularınız için:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-900 dark:text-white">destek@cryptofx.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-900 dark:text-white">+90 212 123 4567</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}