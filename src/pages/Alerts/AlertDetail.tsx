import { ArrowLeft, Clock, ShieldAlert, Activity, UserCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const AlertDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      <div className="flex items-center space-x-4 mb-6">
        <Link to="/alerts" className="p-2 bg-dark-surface border border-dark-border rounded-lg text-[#a19a93] hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-white">Alert {id || 'ALT-2026-9912'}</h2>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">Critical</span>
          </div>
          <p className="text-sm text-[#a19a93]">NorthGrid Power Corporation • Detected: Jun 12, 2026 04:12 AM</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Alert Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <div className="text-[#8c827a] mb-1">Category</div>
                <div className="text-white font-medium">Malware / Ransomware Indicator</div>
              </div>
              <div>
                <div className="text-[#8c827a] mb-1">Asset</div>
                <div className="text-white font-medium">ng-db-primary-01</div>
              </div>
              <div>
                <div className="text-[#8c827a] mb-1">Source</div>
                <div className="text-white font-medium">CrowdStrike Falcon (EDR)</div>
              </div>
              <div>
                <div className="text-[#8c827a] mb-1">Status</div>
                <div className="text-white font-medium">Closed - False Positive</div>
              </div>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Investigation & Closure</h3>
            <div className="space-y-4">
              <div className="flex border-l-2 border-dark-border pl-4 pb-4">
                <div className="w-8 h-8 rounded-full bg-dark-background flex items-center justify-center mr-4 -ml-8 border border-dark-border">
                  <Activity className="h-4 w-4 text-[#8c827a]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Alert Triggered</div>
                  <div className="text-xs text-[#8c827a]">Jun 12, 2026 04:12:00 AM</div>
                </div>
              </div>
              <div className="flex border-l-2 border-dark-border pl-4 pb-4">
                <div className="w-8 h-8 rounded-full bg-dark-background flex items-center justify-center mr-4 -ml-8 border border-dark-border">
                  <UserCircle className="h-4 w-4 text-[#d97706]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Investigation Started</div>
                  <div className="text-xs text-[#8c827a]">Jun 12, 2026 04:12:35 AM • L1 Analyst</div>
                </div>
              </div>
              <div className="flex border-l-2 border-transparent pl-4">
                <div className="w-8 h-8 rounded-full bg-dark-background flex items-center justify-center mr-4 -ml-8 border border-dark-border">
                  <Clock className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Closed without Escalation</div>
                  <div className="text-xs text-[#8c827a]">Jun 12, 2026 04:14:12 AM • Reason: "Known benign activity"</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-red-500/5 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-sm font-bold text-red-400 mb-2 flex items-center">
              <ShieldAlert className="h-4 w-4 mr-2" />
              Potential Supervisory Signal
            </h3>
            <p className="text-sm text-[#d4d4d8] mb-4">
              Critical alert closed significantly faster than the peer median (2 minutes vs 4.2 hours) without corresponding investigation evidence or escalation.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#8c827a]">Signal Type:</span>
                <span className="text-white font-medium">Execution Gap</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#8c827a]">Confidence:</span>
                <span className="text-white font-medium">88%</span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg text-sm transition-colors">
              Flag for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};