import { ArrowLeft, Clock, ShieldAlert, Users, FolderOpen } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const CaseDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/cases" className="p-2 bg-dark-surface border border-dark-border rounded-lg text-[#a19a93] hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white">Case {id || 'CAS-2026-0042'}</h2>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-[#d97706]/10 text-[#d97706] border border-[#d97706]/20">High Severity</span>
          </div>
          <p className="text-sm text-[#a19a93]">FinServ National • Opened: Jun 14, 2026 09:00 AM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Case Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <div className="text-[#8c827a] mb-1">Alert Count</div>
                <div className="text-white font-medium">12 Alerts</div>
              </div>
              <div>
                <div className="text-[#8c827a] mb-1">Investigation Completeness</div>
                <div className="text-white font-medium">14% (Superficial)</div>
              </div>
              <div>
                <div className="text-[#8c827a] mb-1">Escalated</div>
                <div className="text-white font-medium">Yes - L2</div>
              </div>
              <div>
                <div className="text-[#8c827a] mb-1">Status</div>
                <div className="text-white font-medium">Closed</div>
              </div>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Associated Evidence</h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-dark-background border border-dark-border rounded-lg">
                  <div className="flex items-center">
                    <FolderOpen className="h-4 w-4 text-[#8c827a] mr-3" />
                    <span className="text-sm text-[#d4d4d8]">Alert Evidence Payload {i}.json</span>
                  </div>
                  <span className="text-xs text-[#8c827a]">24 KB</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#d97706]/5 border border-[#d97706]/30 rounded-xl p-6">
            <h3 className="text-sm font-bold text-[#d97706] mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Peer Deviation Analysis
            </h3>
            <p className="text-sm text-[#d4d4d8] mb-4">
              Investigation duration (11 minutes) is 4x shorter than the sector median (3.8 hours) for this case category. Investigation notes appear templated.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#8c827a]">Signal Type:</span>
                <span className="text-white font-medium">Peer Deviation</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#8c827a]">Confidence:</span>
                <span className="text-white font-medium">92%</span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-[#d97706]/10 hover:bg-[#d97706]/20 text-[#d97706] border border-[#d97706]/30 rounded-lg text-sm transition-colors">
              Add to Priority Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};