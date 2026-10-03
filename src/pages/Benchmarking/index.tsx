import { Card } from '@/components/common/Card';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from 'recharts';
import { Info } from 'lucide-react';

const data = [
  { name: 'Metro Water', investigationRate: 98, escalationRate: 15, expected: 85 },
  { name: 'Grid Corp', investigationRate: 45, escalationRate: 2, expected: 85 },
  { name: 'City Transit', investigationRate: 92, escalationRate: 18, expected: 85 },
  { name: 'Health First', investigationRate: 78, escalationRate: 8, expected: 85 },
  { name: 'Sector Median', investigationRate: 85, escalationRate: 12, expected: 85 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl flex flex-col space-y-2">
        <p className="font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2 shadow-sm" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-600 dark:text-gray-300 font-medium">{entry.name}</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Benchmarking = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-l-4 border-blue-500 p-4 rounded-r-lg flex items-start space-x-3 mb-6">
        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300">Sector Deviation Analysis</h3>
          <p className="mt-1 text-sm text-blue-800 dark:text-blue-200">
            This graph highlights significant deviations in SOC operational efficiency across critical sector entities. Notice how <span className="font-semibold">Grid Corp</span> falls severely below the Sector Median for Investigations.
          </p>
        </div>
      </div>

      <Card title="Sector Comparison: Investigation & Escalation Rates" className="shadow-lg border-0 ring-1 ring-gray-200 dark:ring-gray-800">
        <div className="h-[450px] w-full pt-6 pb-2 px-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }} barGap={8}>
              <defs>
                <linearGradient id="colorInv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorEsc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#d97706" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorMedInv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#9ca3af" opacity={0.3} />
              
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 13 }}
                dx={-10}
                domain={[0, 100]}
                tickFormatter={(val) => `${val}%`}
              />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: '#f3f4f6', opacity: 0.5 }} 
              />
              
              <Legend 
                wrapperStyle={{ paddingTop: '30px' }}
                iconType="circle"
                iconSize={10}
              />
              
              <Bar 
                dataKey="investigationRate" 
                name="Investigation Rate" 
                barSize={32}
                radius={[6, 6, 0, 0]} 
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Sector Median' ? 'url(#colorMedInv)' : 'url(#colorInv)'} />
                ))}
              </Bar>
              
              <Bar 
                dataKey="escalationRate" 
                name="Escalation Rate" 
                fill="url(#colorEsc)" 
                barSize={32}
                radius={[6, 6, 0, 0]} 
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};