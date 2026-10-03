import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const Card = ({ children, className = '', title, subtitle, icon, action }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border shadow-sm overflow-hidden ${className}`}>
      {(title || subtitle || action || icon) && (
        <div className="px-5 py-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <div>
              {title && <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};