import { Card } from '@/components/common/Card';
import { Badge, getRiskBadgeVariant } from '@/components/common/Badge';
import { dashboardSummary, entitiesData, riskDistribution, findingsByCategory, findingsTrend } from '@/data';
import { Building2, AlertTriangle, Target, SearchX, ListChecks, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }: any) => (
  <Card className="flex flex-col">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
      {subtitle}
    </div>
  </Card>
);

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total CSEs" 
          value={dashboardSummary.totalCSEs} 
          icon={Building2}
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
          subtitle="Monitored in current period"
        />
        <StatCard 
          title="Require Attention" 
          value={dashboardSummary.attentionRequired} 
          icon={AlertTriangle}
          colorClass="bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
          subtitle="CSEs with HIGH/CRITICAL risk"
        />
        <StatCard 
          title="High Priority Findings" 
          value={dashboardSummary.highPriorityFindings} 
          icon={Target}
          colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400"
          subtitle="Immediate review recommended"
        />
        <StatCard 
          title="Execution Gap Indicators" 
          value={dashboardSummary.executionGapIndicators} 
          icon={Activity}
          colorClass="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400"
          subtitle="Potential operational deviations"
        />
        <StatCard 
          title="Negative Space Indicators" 
          value={dashboardSummary.negativeSpaceIndicators} 
          icon={SearchX}
          colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400"
          subtitle="Missing expected evidence"
        />
        <StatCard 
          title="Recommended Reviews" 
          value={dashboardSummary.recommendedReviews} 
          icon={ListChecks}
          colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
          subtitle="Prioritized sample alerts/cases"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Risk Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Findings by Category" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={findingsByCategory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: '#374151', opacity: 0.1 }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Findings Trend (12 Months)" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={findingsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Entities Requiring Attention" className="lg:col-span-1" action={<Link to="/entities" className="text-sm text-blue-600 dark:text-blue-400">View All</Link>}>
          <div className="space-y-4">
            {entitiesData.filter(e => e.riskLevel === 'HIGH' || e.riskLevel === 'CRITICAL').slice(0, 5).map(entity => (
              <div key={entity.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-background">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{entity.name}</div>
                  <div className="text-xs text-gray-500">{entity.sector}</div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge variant={getRiskBadgeVariant(entity.riskLevel)}>{entity.riskLevel}</Badge>
                  <Link to={`/entities/${entity.id}`} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Review</Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};