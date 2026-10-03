import { Card } from '@/components/common/Card';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';
import { alertsData } from '@/data';
import { formatDate } from '@/utils/formatters';

export const Alerts = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4 text-sm text-gray-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
        <strong>Note:</strong> This is a historical analytical view of submitted alert data for supervisory assessment. It is not a real-time SOC console.
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
          <thead className="bg-gray-50 dark:bg-dark-background/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alert ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supervisory Indicator</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border">
            {alertsData.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-dark-border/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-blue-600 cursor-pointer hover:underline">{alert.id}</div>
                  <div className="text-xs text-gray-500">{formatDate(alert.timestamp)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{alert.entityName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getRiskBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.investigationStatus}</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">
                  {alert.supervisoryIndicator || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};