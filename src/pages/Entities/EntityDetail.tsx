import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';
import { entitiesData, findingsData } from '@/data';
import { formatNumber } from '@/utils/formatters';
import { ShieldAlert, Activity, GitCompare, ChevronLeft, Calendar } from 'lucide-react';

export const EntityDetail = () => {
  const { id } = useParams();
  const entity = entitiesData.find(e => e.id === id);

  if (!entity) return <div>Entity not found.</div>;

  const entityFindings = findingsData.filter(f => f.entityId === id);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Link to="/entities" className="hover:text-blue-600 flex items-center"><ChevronLeft className="h-4 w-4 mr-1" /> Back to Entities</Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 p-6 bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{entity.name}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{entity.id}</span>
            <span>•</span>
            <span>{entity.sector} Sector</span>
            <span>•</span>
            <span className="flex items-center"><Calendar className="h-4 w-4 mr-1"/> {entity.assessmentPeriod}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-500 mb-1">Supervisory Risk</div>
          <Badge variant={getRiskBadgeVariant(entity.riskLevel)} className="text-lg px-4 py-1">{entity.riskLevel}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-sm text-gray-500">Total Alerts</div>
          <div className="text-2xl font-bold mt-1">{formatNumber(entity.alertCount)}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Critical Alerts</div>
          <div className="text-2xl font-bold mt-1 text-red-500">{formatNumber(entity.criticalAlertCount)}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Cases / Investigations</div>
          <div className="text-2xl font-bold mt-1">{formatNumber(entity.caseCount)}</div>
        </Card>
        <Card>
          <div className="text-sm text-gray-500">Investigation Rate</div>
          <div className="text-2xl font-bold mt-1">{entity.investigationRate}%</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Supervisory Findings" action={<Link to="/findings" className="text-sm text-blue-600">View All</Link>}>
          <div className="space-y-4">
            {entityFindings.length > 0 ? (
              entityFindings.map(finding => (
                <div key={finding.id} className="p-4 border border-gray-200 dark:border-dark-border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getRiskBadgeVariant(finding.severity)}>{finding.severity}</Badge>
                        <span className="text-xs text-gray-500">{finding.type.replace('_', ' ')}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mt-2">{finding.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{finding.rationale}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-right">
                    <Link to={`/findings/${finding.id}`} className="text-sm text-blue-600 font-medium hover:underline">Review Detail</Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">No high priority findings for this entity.</div>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="Supervisory Risk Indicators">
            <div className="space-y-3">
              {[
                { name: 'Threat Detection', status: 'Moderate', color: 'bg-yellow-500' },
                { name: 'Investigation', status: 'High', color: 'bg-orange-500' },
                { name: 'Escalation', status: 'Critical', color: 'bg-red-500' },
                { name: 'Security Operations', status: 'Low', color: 'bg-green-500' },
                { name: 'Operational Discipline', status: 'High', color: 'bg-orange-500' },
              ].map((indicator, i) => (
                <div key={i} className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-dark-background rounded">
                  <span className="text-sm font-medium">{indicator.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{indicator.status}</span>
                    <div className={`w-3 h-3 rounded-full ${indicator.color}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card title="Peer Benchmarking Highlights" action={<Link to="/benchmarking" className="text-sm text-blue-600">Full Report</Link>}>
            <div className="p-4 bg-gray-50 dark:bg-dark-background border border-gray-200 dark:border-dark-border rounded flex items-start space-x-3">
              <GitCompare className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Significant Deviation Detected</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Investigation rate for critical alerts is 24% lower than sector median. Closure time for escalated cases is 3x faster than peer group without corresponding investigation notes.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};