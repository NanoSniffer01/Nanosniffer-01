with open('src/pages/Dashboard/index.tsx', 'r') as f:
    content = f.read()

# Enhance StatCard styling
content = content.replace('<Card className="flex flex-col">', '<Card className="flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default border-t-4 border-t-transparent hover:border-t-blue-500">')

# Enhance BarChart -> AreaChart or add gradients
content = content.replace("import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';", 
"import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from 'recharts';")

# Replace LineChart with a beautiful AreaChart with gradient
line_chart_str = """              <LineChart data={findingsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>"""

area_chart_str = """              <AreaChart data={findingsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFindings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', borderRadius: '8px', border: 'none', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorFindings)" activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>"""
              
content = content.replace(line_chart_str, area_chart_str)

# Add a welcome banner
welcome_banner = """
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20">
          <Activity className="w-64 h-64 text-blue-200" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Supervisor</h1>
          <p className="text-blue-100 max-w-2xl">
            Here is your daily overview of the national cybersecurity posture. 
            There are currently <span className="font-bold text-yellow-300">{dashboardSummary.attentionRequired} entities</span> requiring immediate attention.
          </p>
        </div>
      </div>
"""

content = content.replace('    <div className="space-y-6">', welcome_banner)

with open('src/pages/Dashboard/index.tsx', 'w') as f:
    f.write(content)
