'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  TrendingUp,
  BarChart3,
  Wallet,
  User,
  Settings,
  FileText,
  Shield,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Ana Sayfa', href: '/' },
  { icon: TrendingUp, label: 'Kripto Trading', href: '/trading' },
  { icon: BarChart3, label: 'Forex Trading', href: '/forex' },
  { icon: Wallet, label: 'Para İşlemleri', href: '/wallet' },
  { icon: User, label: 'Profil', href: '/profile' },
  { icon: FileText, label: 'Fatura', href: '/invoice' },
  { icon: Shield, label: 'Admin Panel', href: '/admin' },
  { icon: Settings, label: 'Ayarlar', href: '/settings' },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-dark-800 shadow-lg"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
        }}
        className={cn(
          'fixed left-0 top-0 h-full bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-700 z-40 transition-all duration-300',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Collapse Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
            <motion.div
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              {!isCollapsed && (
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  CryptoFX
                </span>
              )}
            </motion.div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
            >
              <Menu size={18} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-dark-800',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      'flex-shrink-0',
                      isActive ? 'text-primary-600 dark:text-primary-400' : ''
                    )}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & User Info */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-700 space-y-2">
            <button
              onClick={toggleTheme}
              className={cn(
                'flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg transition-colors',
                'hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-300'
              )}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              {!isCollapsed && (
                <span className="font-medium">
                  {theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
                </span>
              )}
            </button>

            {!isCollapsed && (
              <div className="bg-gray-50 dark:bg-dark-800 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      john@example.com
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}