import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Card({ children, className, title, subtitle }: CardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 shadow-sm',
      className
    )}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  return (
    <Card className={cn('p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change !== undefined && (
            <p className={cn(
              'text-sm font-medium',
              change >= 0 ? 'text-success' : 'text-danger'
            )}>
              {change >= 0 ? '+' : ''}{change.toFixed(2)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}