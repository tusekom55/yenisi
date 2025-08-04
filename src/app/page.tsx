'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  ArrowRight,
  PlayCircle,
  Star,
  CheckCircle,
  BarChart3,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/UI/Button';
import { Card, StatsCard } from '@/components/UI/Card';
import { CoinCard } from '@/components/Trading/CoinCard';
import { mockCoins } from '@/data/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-primary-600" />,
    title: 'Güvenli İşlemler',
    description: 'En son güvenlik protokolleri ile paranız güvende'
  },
  {
    icon: <Zap className="w-6 h-6 text-primary-600" />,
    title: 'Hızlı İşlem',
    description: 'Milisaniye hızında işlem gerçekleştirme'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-primary-600" />,
    title: 'Gelişmiş Grafikler',
    description: 'Profesyonel analiz araçları ve göstergeler'
  },
  {
    icon: <Users className="w-6 h-6 text-primary-600" />,
    title: '7/24 Destek',
    description: 'Her zaman yanınızda, profesyonel destek ekibi'
  },
];

const stats = [
  { title: 'Toplam İşlem Hacmi', value: '₺2.4B', change: 12.5 },
  { title: 'Aktif Kullanıcı', value: '125K+', change: 8.2 },
  { title: 'Desteklenen Coin', value: '500+', change: 15.3 },
  { title: 'Günlük İşlem', value: '850K', change: 22.1 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-800/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Geleceğin{' '}
                <span className="gradient-text">Trading</span>{' '}
                Platformu
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Kripto ve Forex piyasalarında profesyonel trading deneyimi. 
                Gelişmiş araçlar, güvenli işlemler ve 7/24 destek ile.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Hemen Başla
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Giriş Yap
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                <PlayCircle className="mr-2 w-4 h-4" />
                Demo İzle
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm"
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-primary-500/20 rounded-full blur-xl" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-primary-600/20 rounded-full blur-xl" />
        </div>
      </section>

      {/* Live Prices */}
      <section className="py-16 bg-white dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Canlı Kripto Fiyatları
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Piyasanın nabzını takip edin ve fırsatları kaçırmayın
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCoins.slice(0, 6).map((coin, index) => (
              <motion.div
                key={coin.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CoinCard coin={coin} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/trading">
              <Button variant="secondary" size="lg">
                Tüm Coinleri Görüntüle
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Neden CryptoFX?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Profesyonel traderlar için tasarlanmış özellikler ve 
              başlangıç seviyesindeki kullanıcılar için kolay arayüz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Trading Yolculuğuna Bugün Başla
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Dakikalar içinde hesap oluştur ve trading yapmaya başla
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-100"
                >
                  <Wallet className="mr-2 w-4 h-4" />
                  Ücretsiz Hesap Oluştur
                </Button>
              </Link>
              <Link href="/demo">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full sm:w-auto text-white border-white hover:bg-white/10"
                >
                  Demo Hesap Dene
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">CryptoFX</span>
              </div>
              <p className="text-gray-400">
                Modern ve güvenli kripto/forex trading platformu
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/trading" className="hover:text-white">Kripto Trading</Link></li>
                <li><Link href="/forex" className="hover:text-white">Forex Trading</Link></li>
                <li><Link href="/wallet" className="hover:text-white">Para İşlemleri</Link></li>
                <li><Link href="/mobile" className="hover:text-white">Mobil Uygulama</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Destek</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Yardım Merkezi</Link></li>
                <li><Link href="/contact" className="hover:text-white">İletişim</Link></li>
                <li><Link href="/api" className="hover:text-white">API Dokümantasyonu</Link></li>
                <li><Link href="/status" className="hover:text-white">Sistem Durumu</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Yasal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white">Kullanım Koşulları</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Gizlilik Politikası</Link></li>
                <li><Link href="/compliance" className="hover:text-white">Uyumluluk</Link></li>
                <li><Link href="/risk" className="hover:text-white">Risk Açıklaması</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CryptoFX. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}