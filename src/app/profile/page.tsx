'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Camera,
  Edit2,
  Check,
  X,
  AlertCircle,
  Settings,
  Bell,
  Lock,
  CreditCard,
  Download,
} from 'lucide-react';
import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { mockUser } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: mockUser.email,
    phone: '+90 555 123 4567',
    country: 'Türkiye',
    city: 'İstanbul',
    address: 'Beşiktaş, İstanbul',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    trading: true,
    deposits: true,
    withdrawals: true,
  });

  const handleSave = () => {
    setIsEditing(false);
    // API call would go here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Profil Ayarları
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Hesap bilgilerinizi ve tercihlerinizi yönetin
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card title="Kişisel Bilgiler" subtitle="Hesap bilgilerinizi güncelleyin">
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors">
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Profil Fotoğrafı
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        JPG, PNG veya GIF formatında, maksimum 5MB
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ad
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-dark-800 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Soyad
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-dark-800 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-dark-800 disabled:text-gray-500"
                      />
                      {mockUser.isVerified && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Check className="w-5 h-5 text-success" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-dark-800 disabled:text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ülke
                      </label>
                      <input
                        type="text"
                        value={profileData.country}
                        onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-dark-800 disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Şehir
                      </label>
                      <input
                        type="text"
                        value={profileData.city}
                        onChange={(e) => setProfileData(prev => ({ ...prev, city: e.target.value }))}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-dark-800 disabled:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <Button variant="secondary" onClick={handleCancel}>
                          <X className="w-4 h-4 mr-2" />
                          İptal
                        </Button>
                        <Button onClick={handleSave}>
                          <Check className="w-4 h-4 mr-2" />
                          Kaydet
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Düzenle
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Security Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card title="Güvenlik Ayarları" subtitle="Hesabınızı güvende tutun">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          İki Faktörlü Doğrulama (2FA)
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Hesabınıza ekstra güvenlik katmanı ekleyin
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Aktifleştir
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Şifre Değiştir
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Güçlü şifre kullanarak hesabınızı koruyun
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Değiştir
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Ödeme Yöntemleri
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Kayıtlı kartlarınızı ve hesaplarınızı yönetin
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Yönet
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card title="Bildirim Ayarları" subtitle="Hangi bildirimleri almak istediğinizi seçin">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        E-posta Bildirimleri
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Önemli güncellemeler e-posta ile
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        SMS Bildirimleri
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Kritik güvenlik uyarıları SMS ile
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Trading Bildirimleri
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pozisyon ve fiyat uyarıları
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.trading}
                        onChange={() => handleNotificationChange('trading')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Para İşlemleri
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Yatırma ve çekme işlemleri
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.deposits}
                        onChange={() => handleNotificationChange('deposits')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card title="Hesap Durumu">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      E-posta Doğrulama
                    </span>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Doğrulandı</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Telefon Doğrulama
                    </span>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-warning" />
                      <span className="text-sm text-warning">Beklemede</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      KYC Doğrulama
                    </span>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-success" />
                      <span className="text-sm text-success">Tamamlandı</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      2FA Güvenlik
                    </span>
                    <div className="flex items-center space-x-2">
                      <X className="w-4 h-4 text-danger" />
                      <span className="text-sm text-danger">Pasif</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    Hesap doğrulama seviyeniz: <strong>Seviye 2</strong>
                  </p>
                  <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">
                    Günlük limit: {formatCurrency(500000)}
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Account Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card title="Hesap İşlemleri">
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Verileri İndir
                  </Button>
                  
                  <Button variant="secondary" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    API Ayarları
                  </Button>
                  
                  <Button variant="secondary" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Bildirim Geçmişi
                  </Button>
                  
                  <div className="border-t border-gray-200 dark:border-dark-600 pt-3">
                    <Button variant="danger" className="w-full justify-start">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Hesabı Kapat
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}