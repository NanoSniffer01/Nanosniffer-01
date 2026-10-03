import { Card } from '@/components/common/Card';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { ShieldAlert, TrendingUp, AlertOctagon, Activity } from 'lucide-react';

const timeSeriesData = [
  { month: 'Jan', critical: 120, high: 240, medium: 450 },
  { month: 'Feb', critical: 150, high: 280, medium: 480 },
  { month: 'Mar', critical: 180, high: 260, medium: 420 },
  { month: 'Apr', critical: 110, high: 310, medium: 510 },
  { month: 'May', critical: 190, high: 290, medium: 470 },
  { month: 'Jun', critical: 220, high: 320, medium: 530 },
];

const riskDistributionData = [
  { name: 'CRITICAL', value: 15, color: '#ef4444' },
  { name: 'HIGH', value: 35, color: '#f97316' },
  { name: 'MODERATE', value: 40, color: '#eab308' },
  { name: 'LOW', value: 10, color: '#3b82f6' },
];

const maturityScatterData = [
  { name: 'Metro Water', maturity: 65, threats: 80, size: 240 },
  { name: 'Grid Corp', maturity: 35, threats: 150, size: 300 },
  { name: 'City Transit', maturity: 78, threats: 40, size: 180 },
  { name: 'Health First', maturity: 55, threats: 110, size: 400 },
  { name: 'Global Finance', maturity: 92, threats: 20, size: 500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="font-bold text-gray-900 dark:text-white mb-2">{label || payload[0]?.payload.name}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between space-x-6 text-sm mb-1 last:mb-0">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: entry.color || entry.payload.fill }} />
              <span className="text-gray-600 dark:text-gray-300 capitalize">{entry.name}</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const AdvancedAnalytics = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col border-t-4 border-t-red-500">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertOctagon className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Critical Alert Surge</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">+45%</div>
          <div className="text-xs text-gray-400">Increase over last 30 days</div>
        </Card>
        
        <Card className="flex flex-col border-t-4 border-t-orange-500">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Avg. Mitigation Time</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">14.2 Days</div>
          <div className="text-xs text-gray-400">Sector average: 18.5 days</div>
        </Card>

        <Card className="flex flex-col border-t-4 border-t-blue-500">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Active Investigations</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">128</div>
          <div className="text-xs text-gray-400">Across 42 supervised entities</div>
        </Card>

        <Card className="flex flex-col border-t-4 border-t-green-500">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-sm font-medium text-gray-500">Compliance Index</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">72.4/100</div>
          <div className="text-xs text-gray-400">Steady upward trajectory</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Area Chart */}
        <Card title="Threat Volume Trajectory (6 Months)" className="col-span-1 lg:col-span-2 shadow-sm border-0 ring-1 ring-gray-200 dark:ring-gray-800">
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#9ca3af" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="critical" name="Critical Alerts" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorCrit)" />
                <Area type="monotone" dataKey="high" name="High Alerts" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorHigh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Risk Distribution Pie Chart */}
        <Card title="Sector Risk Posture" className="col-span-1 shadow-sm border-0 ring-1 ring-gray-200 dark:ring-gray-800">
          <div className="h-80 w-full flex flex-col justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">50%</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">High / Crit</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Maturity vs Threat Volume Scatter */}
      <Card title="Capability vs. Threat Exposure Correlation" className="shadow-sm border-0 ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="h-[350px] w-full pt-4 pr-6">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                type="number" 
                dataKey="maturity" 
                name="Security Maturity Score" 
                unit="%" 
                domain={[0, 100]} 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                type="number" 
                dataKey="threats" 
                name="Threat Events / Week" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }} 
              />
              <ZAxis type="number" dataKey="size" range={[100, 1000]} name="Entity Size" />
              <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
              <Scatter name="Entities" data={maturityScatterData} fill="#8b5cf6" fillOpacity={0.6} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
    </div>
  );
};