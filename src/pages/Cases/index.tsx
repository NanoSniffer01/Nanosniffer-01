import { Card } from '@/components/common/Card';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';
import { casesData } from '@/data';

export const Cases = () => {
  return (
    <div className="space-y-6">
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
          <thead className="bg-gray-50 dark:bg-dark-background/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Case ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alert Count</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inv. Duration</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pattern Indicator</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border">
            {casesData.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-dark-border/50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-600 cursor-pointer hover:underline">{c.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{c.entityName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getRiskBadgeVariant(c.severity)}>{c.severity}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.alertCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.investigationDuration} mins</td>
                <td className="px-6 py-4 text-sm text-red-600 font-medium">{c.patternIndicator !== 'None' ? c.patternIndicator : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};