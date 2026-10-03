import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';
import { findingsData } from '@/data';
import { ChevronLeft, Info, AlertTriangle, Database, GitBranch, History } from 'lucide-react';
import { Modal } from '@/components/common/Modal';

export const FindingDetail = () => {
  const { id } = useParams();
  const finding = findingsData.find(f => f.id === id);
  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [showBenchmarkModal, setShowBenchmarkModal] = useState(false);

  if (!finding) return <div className="p-8 text-center text-gray-500">Finding not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Link to="/findings" className="hover:text-blue-600 flex items-center"><ChevronLeft className="h-4 w-4 mr-1" /> Back to Findings</Link>
      </div>

      <div className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm font-mono text-gray-500">{finding.id}</span>
              <Badge variant={getRiskBadgeVariant(finding.severity)}>{finding.severity}</Badge>
              <Badge variant="neutral">{finding.type.replace('_', ' ')}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{finding.title}</h1>
            <div className="text-sm text-gray-500 mt-2">
              Entity: <Link to={`/entities/${finding.entityId}`} className="text-blue-600 hover:underline">{finding.entityName}</Link>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="text-sm text-gray-500">Status</div>
            <div className="font-medium px-3 py-1 bg-gray-100 dark:bg-dark-background rounded">{finding.status.replace('_', ' ')}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Why Was This Flagged?" icon={<Info className="h-5 w-5 text-blue-500" />}>
            <div className="prose dark:prose-invert max-w-none text-sm">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                {finding.rationale}
              </p>
              
              <h4 className="font-semibold text-gray-900 dark:text-white mt-6 mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" /> Supervisory Interpretation
              </h4>
              <p className="text-gray-700 dark:text-gray-300 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
                Potential supervisory signal requiring manual validation. <br/>
                <strong>Recommendation:</strong> {finding.recommendation}
              </p>
            </div>
          </Card>

          <Card title="Supporting Evidence">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-background">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-sm text-gray-900 dark:text-white">Related Alerts & Cases</div>
                    <div className="text-xs text-gray-500">{finding.evidenceCount} records identified in assessment dataset</div>
                  </div>
                </div>
                <button onClick={() => setShowRecordsModal(true)} className="text-sm text-blue-600 border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors">View Records</button>
              </div>
              
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-background">
                <div className="flex items-center">
                  <GitBranch className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div className="font-medium text-sm text-gray-900 dark:text-white">Peer Comparison Data</div>
                    <div className="text-xs text-gray-500">Sector median metrics for cross-reference</div>
                  </div>
                </div>
                <button onClick={() => setShowBenchmarkModal(true)} className="text-sm text-blue-600 border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors">View Benchmark</button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Detection Analytics">
            <div className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">Analytical Confidence</div>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-3 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${finding.confidence}%` }}></div>
                  </div>
                  <span className="text-lg font-bold">{finding.confidence}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 flex items-start">
                  <Info className="h-3 w-3 mr-1 mt-0.5 inline-block" />
                  This is an analytical confidence indicator, not definitive proof of control failure.
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-dark-border">
                <div className="text-xs text-gray-500 mb-2">Detection Logic</div>
                <div className="bg-gray-900 text-green-400 font-mono text-xs p-3 rounded-lg overflow-x-auto">
                  {`RULE: ExecutionGap_FastClosure\
AND (\
  closure_duration < peer_10th_percentile\
  OR investigation_completeness == "LOW"\
)\
AND severity >= "HIGH"`}
                </div>
              </div>
            </div>
          </Card>

          <Card title="Audit Trail" icon={<History className="h-4 w-4" />}>
            <div className="relative border-l border-gray-200 dark:border-dark-border ml-3 space-y-6 pb-2">
              <div className="relative">
                <div className="absolute -left-3.5 bg-blue-500 h-2 w-2 rounded-full border-2 border-white dark:border-dark-surface mt-1.5"></div>
                <div className="pl-4">
                  <div className="text-sm font-medium">Flagged by Analytics Engine</div>
                  <div className="text-xs text-gray-500 mt-0.5">Model version v1.4.2</div>
                  <div className="text-xs text-gray-400 mt-1">{new Date(finding.detectedDate).toLocaleString()}</div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-3.5 bg-gray-300 h-2 w-2 rounded-full border-2 border-white dark:border-dark-surface mt-1.5"></div>
                <div className="pl-4">
                  <div className="text-sm font-medium">Dataset Uploaded</div>
                  <div className="text-xs text-gray-500 mt-0.5">System Ingestion</div>
                  <div className="text-xs text-gray-400 mt-1">2026-07-09 10:00:00</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={showRecordsModal} onClose={() => setShowRecordsModal(false)} title="Supporting Alert/Case Records" maxWidth="4xl">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-border border border-gray-200 dark:border-dark-border rounded-lg">
            <thead className="bg-gray-50 dark:bg-dark-background/50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Record ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Closure Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-200 dark:divide-dark-border">
              {[1,2,3,4,5].map(i => (
                <tr key={i}>
                  <td className="px-4 py-2 text-sm text-blue-600 font-medium">REC-9283{i}</td>
                  <td className="px-4 py-2 text-sm text-gray-500">Alert</td>
                  <td className="px-4 py-2 text-sm"><Badge variant="error">CRITICAL</Badge></td>
                  <td className="px-4 py-2 text-sm text-gray-500">Closed</td>
                  <td className="px-4 py-2 text-sm text-red-500 font-medium">1.5 mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={showBenchmarkModal} onClose={() => setShowBenchmarkModal(false)} title="Sector Benchmark Deviations" maxWidth="2xl">
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Comparing {finding.entityName} against the Power sector median for Q2 2026.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-dark-background rounded border border-gray-200 dark:border-dark-border">
              <div className="text-sm text-gray-500 mb-1">Entity Median Closure Time</div>
              <div className="text-2xl font-bold text-red-500">1.8 mins</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-background rounded border border-gray-200 dark:border-dark-border">
              <div className="text-sm text-gray-500 mb-1">Sector Median Closure Time</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4.2 hours</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-background rounded border border-gray-200 dark:border-dark-border">
              <div className="text-sm text-gray-500 mb-1">Entity Escalation Rate</div>
              <div className="text-2xl font-bold text-red-500">0.5%</div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-dark-background rounded border border-gray-200 dark:border-dark-border">
              <div className="text-sm text-gray-500 mb-1">Sector Escalation Rate</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12.4%</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};