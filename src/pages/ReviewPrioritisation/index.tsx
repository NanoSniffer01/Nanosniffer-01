import { Search, Filter, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviewData = [
  { id: 'RV-001', priority: 'Immediate Review', entity: 'NorthGrid Power Corp', type: 'Case C-992', signal: 'Superficial Investigation', severity: 'Critical', confidence: '94%', reason: 'Closure time < 2 mins with repetitive notes', evidence: 14 },
  { id: 'RV-002', priority: 'Immediate Review', entity: 'Metro Water Works', type: 'Alert A-881', signal: 'Missing Escalation', severity: 'High', confidence: '88%', reason: 'Critical malware alert closed without escalation', evidence: 3 },
  { id: 'RV-003', priority: 'High Priority', entity: 'FinServ National', type: 'Case C-412', signal: 'Peer Deviation', severity: 'High', confidence: '82%', reason: 'Investigation duration 4x longer than peer median', evidence: 8 },
  { id: 'RV-004', priority: 'Standard Review', entity: 'Global Telecom', type: 'Case C-105', signal: 'Metric-Driven Behavior', severity: 'Medium', confidence: '71%', reason: 'Batch closures exactly at shift end', evidence: 45 },
  { id: 'RV-005', priority: 'Low Priority', entity: 'State Health Dept', type: 'Alert A-092', signal: 'Negative Space', severity: 'Low', confidence: '60%', reason: 'No VPN alerts during weekend maintenance', evidence: 0 },
];

export const ReviewPrioritisation = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Review Prioritisation</h2>
          <p className="text-sm text-[#a19a93] max-w-3xl">
            Samples recommended for manual supervisory review based on analytical signals, peer deviations, and identified execution gaps.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8c827a]" />
            <input 
              type="text" 
              placeholder="Search samples..." 
              className="pl-9 pr-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-white focus:outline-none focus:border-[#d97706] transition-colors w-64"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm font-medium text-[#d4d4d8] hover:bg-dark-border transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {['Immediate Review', 'High Priority', 'Standard Review', 'Low Priority'].map((level, i) => (
          <div key={level} className="bg-dark-surface border border-dark-border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-[#8c827a] uppercase mb-1">{level}</div>
              <div className="text-2xl font-bold text-white">{i === 0 ? 2 : i === 1 ? 8 : i === 2 ? 24 : 92}</div>
            </div>
            <div className={`p-2 rounded-lg ${i === 0 ? 'bg-red-500/10 text-red-400' : i === 1 ? 'bg-[#d97706]/10 text-[#d97706]' : 'bg-dark-background text-[#8c827a]'}`}>
              <AlertCircle className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-dark-background text-[#8c827a] border-b border-dark-border">
              <tr>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Priority</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Entity</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Item</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Signal & Reason</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Severity</th>
                <th className="px-6 py-4 font-bold uppercase text-[10px] tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/50 text-[#d4d4d8]">
              {reviewData.map((item) => (
                <tr key={item.id} className="hover:bg-dark-background/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${
                      item.priority === 'Immediate Review' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      item.priority === 'High Priority' ? 'bg-[#d97706]/10 text-[#d97706] border-[#d97706]/20' :
                      'bg-dark-background text-[#a19a93] border-dark-border'
                    }`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{item.entity}</td>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#d4d4d8]">{item.signal}</div>
                    <div className="text-xs text-[#8c827a] mt-1">{item.reason}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs ${
                      item.severity === 'Critical' ? 'text-red-400' :
                      item.severity === 'High' ? 'text-amber-400' :
                      item.severity === 'Medium' ? 'text-orange-400' : 'text-green-400'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-xs font-medium text-[#d97706] hover:text-amber-400 flex items-center transition-colors">
                      Review <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};