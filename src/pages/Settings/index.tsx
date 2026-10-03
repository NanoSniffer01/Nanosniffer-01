import { Card } from '@/components/common/Card';
import { API_BASE_URL } from '@/config/env';

export const Settings = () => {
  return (
    <div className="max-w-3xl space-y-6">
      <Card title="Data Configuration">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Backend URL</label>
            <input 
              type="text" 
              readOnly 
              value={API_BASE_URL} 
              className="w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-background text-gray-500"
            />
            <p className="text-xs text-gray-500 mt-1">Currently running in local mock mode. API connections can be configured for production.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};