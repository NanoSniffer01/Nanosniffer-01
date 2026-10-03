with open('src/pages/Dashboard/index.tsx', 'w') as f:
    f.write("""import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { name: 'W1', value1: 10, value2: 5 },
  { name: 'W2', value1: 12, value2: 6 },
  { name: 'W3', value1: 10, value2: 4 },
  { name: 'W4', value1: 13, value2: 7 },
  { name: 'W5', value1: 14, value2: 9 },
  { name: 'W6', value1: 12, value2: 8 },
  { name: 'W7', value1: 15, value2: 11 },
  { name: 'W8', value1: 16, value2: 12 },
];

const severityData = [
  { name: 'Critical', value: 6, color: '#fca5a5' }, // light red/salmon
  { name: 'High', value: 13, color: '#fbbf24' },   // yellow/amber
  { name: 'Medium', value: 11, color: '#fdba74' }, // orange/peach
  { name: 'Low', value: 7, color: '#86efac' },     // light green
];

const findingsData = [
  { name: 'Weak TLS cipher suite on edge gateway', sev: 'Critical', sevColor: 'text-red-400 bg-red-400/10 border-red-400/20', asset: 'edge-gw-01', age: '3 days' },
  { name: 'Stale service account with admin rights', sev: 'Critical', sevColor: 'text-red-400 bg-red-400/10 border-red-400/20', asset: 'dc-core-02', age: '9 days' },
  { name: 'Missing EDR agent on 4 workstations', sev: 'High', sevColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20', asset: 'ws-fleet', age: '5 days' },
  { name: 'Unpatched SFTP service (CVE-2026-1183)', sev: 'High', sevColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20', asset: 'filesrv-03', age: '12 days' },
  { name: 'Overly broad firewall rule — RDP any-source', sev: 'Medium', sevColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20', asset: 'fw-perim-01', age: '2 days' },
];

const MetricCard = ({ title, value, trend, isPositive, neutral }: any) => (
  <div className="bg-dark-surface border border-dark-border rounded-xl p-5 flex flex-col justify-between">
    <div className="text-[10px] font-bold text-[#8c827a] uppercase tracking-wider mb-2">{title}</div>
    <div className="text-3xl font-semibold text-white mb-3">{value}</div>
    <div className={`text-xs font-medium flex items-center ${neutral ? 'text-[#8c827a]' : isPositive ? 'text-green-500' : 'text-red-400'}`}>
      {!neutral && (
        <span className="mr-1">{isPositive ? '▲' : '▼'}</span>
      )}
      {neutral && <span className="mr-1">—</span>}
      {trend}
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h2 className="text-[28px] font-bold text-white mb-2">SOC Assessment Overview</h2>
        <p className="text-sm text-[#a19a93]">Redesigned analytics workspace concept for the SAT-SA web application. All figures below are illustrative demo data rendered locally in the browser.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <MetricCard title="Active Assessments" value="14" trend="2 this week" isPositive={true} />
        <MetricCard title="Open Findings" value="37" trend="5 vs last week" isPositive={false} />
        <MetricCard title="Critical Severity" value="6" trend="1 new" isPositive={false} />
        <MetricCard title="Mean Time To Triage" value="4.2h" trend="0.6h improved" isPositive={true} />
        <MetricCard title="Assets Covered" value="92%" trend="steady" neutral={true} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-dark-surface border border-dark-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Findings Trend — Last 8 Weeks</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-[#d97706] text-white text-xs font-medium rounded-full">All</button>
              <button className="px-3 py-1 bg-dark-background border border-dark-border text-[#a19a93] text-xs font-medium rounded-full">Critical</button>
              <button className="px-3 py-1 bg-dark-background border border-dark-border text-[#a19a93] text-xs font-medium rounded-full">High</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3d322a" />
                <XAxis dataKey="name" axisLine={true} stroke="#3d322a" tickLine={false} tick={{fill: '#8c827a', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8c827a', fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#251f1b', borderColor: '#3d322a', color: '#fff' }} />
                <Area type="monotone" dataKey="value2" stroke="#d97706" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" activeDot={{ r: 4 }} dot={{r: 3, fill: '#d97706', strokeWidth: 0}} />
                <Area type="monotone" dataKey="value1" stroke="#d4d4d8" strokeWidth={2} fill="none" activeDot={{ r: 4 }} dot={{r: 3, fill: '#d4d4d8', strokeWidth: 0}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center space-x-6 mt-4 text-xs text-[#8c827a]">
            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#d4d4d8] mr-2"></div>Critical findings</div>
            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#d97706] mr-2"></div>High findings</div>
            <div className="ml-auto">Units: findings per week · demo data</div>
          </div>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2">Severity Mix</h3>
          <div className="flex-1 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white">37</span>
              <span className="text-sm text-[#8c827a]">open findings</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4">
            {severityData.map(item => (
              <div key={item.name} className="flex items-center text-sm text-[#d4d4d8]">
                <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                {item.name} {item.value} <span className="text-[#8c827a] ml-1">· {Math.round((item.value/37)*100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Stack */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-semibold text-white">Actionable Findings</h3>
              <p className="text-xs text-[#8c827a]">Assign, resolve, or defer — actions update this view locally.</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] font-bold text-[#8c827a] uppercase tracking-wider border-b border-dark-border">
                  <tr>
                    <th className="pb-3 font-medium">FINDING</th>
                    <th className="pb-3 font-medium">SEVERITY</th>
                    <th className="pb-3 font-medium">ASSET</th>
                    <th className="pb-3 font-medium">AGE</th>
                    <th className="pb-3 font-medium">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/50 text-[#d4d4d8]">
                  {findingsData.map((item, i) => (
                    <tr key={i}>
                      <td className="py-4 pr-4">{item.name}</td>
                      <td className="py-4"><span className={`px-2 py-0.5 text-xs rounded border ${item.sevColor}`}>{item.sev}</span></td>
                      <td className="py-4">{item.asset}</td>
                      <td className="py-4">{item.age}</td>
                      <td className="py-4">
                        <button className="px-3 py-1 bg-[#d97706]/10 border border-[#d97706]/30 text-[#d97706] text-xs font-medium rounded hover:bg-[#d97706]/20 transition-colors">Assign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Assessment Activity</h3>
            <div className="space-y-3">
              {[
                { title: 'External perimeter assessment', text: 'completed for client B-2214', meta: 'Today, 09:42 · assessor R. Menon', color: 'bg-amber-500' },
                { title: 'Critical finding escalated', text: '— weak TLS on edge-gw-01', meta: 'Today, 08:15 · auto-triage', color: 'bg-red-400' },
                { title: 'Re-test scheduled', text: 'for filesrv-03 patch verification', meta: 'Yesterday, 17:30 · assessor K. Iyer', color: 'bg-amber-500' },
                { title: '3 findings closed', text: 'after remediation on ws-fleet', meta: 'Yesterday, 14:05 · supervisor A. Bhatt', color: 'bg-green-400' },
                { title: 'New assessment intake', text: '— quarterly web-app review', meta: 'Mon, 11:20 · intake queue', color: 'bg-amber-500' }
              ].map((activity, i) => (
                <div key={i} className="bg-dark-background border border-dark-border rounded-lg p-4 flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 flex-shrink-0 ${activity.color}`}></div>
                  <div>
                    <div className="text-sm text-[#d4d4d8]"><span className="font-semibold text-white">{activity.title}</span> {activity.text}</div>
                    <div className="text-xs text-[#8c827a] mt-1">{activity.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Stack */}
        <div className="space-y-4">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h4 className="text-sm font-bold text-white mb-2">Escalation focus</h4>
            <p className="text-sm text-[#a19a93] leading-relaxed">Critical findings rose for the second straight week. Prioritise the two identity-related items on dc-core-02 before the Friday review.</p>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h4 className="text-sm font-bold text-[#d97706] mb-2">Triage is improving</h4>
            <p className="text-sm text-[#a19a93] leading-relaxed">Mean time to triage dropped to 4.2h. At this rate the 4h SLA target is reachable within two weeks.</p>
          </div>
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h4 className="text-sm font-bold text-white mb-2">Coverage gap</h4>
            <p className="text-sm text-[#a19a93] leading-relaxed">8% of assets remain outside assessment scope — mostly OT segments. Recommend adding them to the next cycle.</p>
          </div>
          
          <div className="mt-8 border border-[#d97706]/30 bg-[#d97706]/5 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-2">Login Preview</h3>
            <p className="text-sm text-[#a19a93] mb-6"><span className="font-semibold text-amber-500">This is a non-authenticating preview.</span> Credentials entered here are never sent, stored, or validated — the redesigned login screen is shown for visual review only.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Username</label>
                <input type="text" disabled value="assessor@sat-sa.example" className="w-full bg-dark-background border border-dark-border rounded-lg px-3 py-2.5 text-sm text-[#a19a93]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Password</label>
                <input type="password" disabled value="********" className="w-full bg-dark-background border border-dark-border rounded-lg px-3 py-2.5 text-sm text-[#a19a93]" />
              </div>
              <button className="w-full bg-gradient-to-b from-[#f59e0b] to-[#d97706] text-dark-background font-bold text-sm py-2.5 rounded-lg shadow-lg shadow-[#d97706]/20 mt-2">One-Click Demo Login</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
""")
