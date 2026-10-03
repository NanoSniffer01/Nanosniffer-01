import { Card } from '@/components/common/Card';
import { findingsData } from '@/data';
import { AlertTriangle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';

export const ExecutionGaps = () => {
  const gaps = findingsData.filter(f => f.type === 'EXECUTION_GAP');

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Execution Gaps</h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
              <p>Situations where documented controls, governance arrangements, procedures, metrics or reported capabilities suggest effective operation, but operational evidence indicates otherwise.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gaps.map(gap => (
          <Card key={gap.id} title={gap.title} action={<Badge variant={getRiskBadgeVariant(gap.severity)}>{gap.severity}</Badge>}>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Entity</span>
                <Link to={`/entities/${gap.entityId}`} className="font-medium text-blue-600 hover:underline">{gap.entityName}</Link>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Evidence Suggests</span>
                <p className="text-gray-900 dark:text-gray-100">{gap.rationale}</p>
              </div>
              <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex justify-between items-center">
                <div className="text-xs text-gray-500">Confidence: {gap.confidence}%</div>
                <Link to={`/findings/${gap.id}`} className="text-blue-600 font-medium hover:underline text-sm">Review Details</Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};