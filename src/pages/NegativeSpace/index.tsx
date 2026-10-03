import { Card } from '@/components/common/Card';
import { findingsData } from '@/data';
import { SearchX, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';

export const NegativeSpace = () => {
  const gaps = findingsData.filter(f => f.type === 'NEGATIVE_SPACE');

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-purple-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">Negative Space Analysis</h3>
            <div className="mt-2 text-sm text-purple-700 dark:text-purple-200">
              <p>Situations where expected evidence is absent. The lack of data or activity itself is a primary indicator of potential monitoring blind spots or control failures.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gaps.length > 0 ? gaps.map(gap => (
          <Card key={gap.id} title={gap.title} action={<Badge variant={getRiskBadgeVariant(gap.severity)}>{gap.severity}</Badge>}>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Entity</span>
                <Link to={`/entities/${gap.entityId}`} className="font-medium text-blue-600 hover:underline">{gap.entityName}</Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-dark-background p-3 rounded">
                  <span className="text-gray-500 block text-xs mb-1">Expected Evidence</span>
                  <p className="text-gray-900 dark:text-gray-100">Telemetry logs from critical assets</p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded border border-red-100 dark:border-red-900/30">
                  <span className="text-red-500 block text-xs mb-1">Observed</span>
                  <p className="text-gray-900 dark:text-gray-100">Zero corresponding events</p>
                </div>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Supervisory Signal</span>
                <p className="text-gray-900 dark:text-gray-100 font-medium">{gap.rationale}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex justify-between items-center">
                <div className="text-xs text-gray-500">Confidence: {gap.confidence}%</div>
                <Link to={`/findings/${gap.id}`} className="text-blue-600 font-medium hover:underline text-sm">Review Details</Link>
              </div>
            </div>
          </Card>
        )) : (
          <div className="col-span-2 text-center p-8 text-gray-500 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border">
            No negative space indicators found matching current filters.
          </div>
        )}
      </div>
    </div>
  );
};