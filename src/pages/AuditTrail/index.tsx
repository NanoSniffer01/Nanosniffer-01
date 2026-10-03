import { Card } from '@/components/common/Card';
import { auditLogsData } from '@/data/auditLogs';
import { formatDate } from '@/utils/formatters';

export const AuditTrail = () => {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
        <thead className="bg-gray-50 dark:bg-dark-background/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity / Context</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border">
          {auditLogsData.map((log) => (
            <tr key={log.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(log.timestamp)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{log.user}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.action}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.entity} {log.findingId && `(${log.findingId})`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};