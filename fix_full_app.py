import os

app_tsx = """
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Entities } from '@/pages/Entities';
import { EntityDetail } from '@/pages/Entities/EntityDetail';
import { Alerts } from '@/pages/Alerts';
import { AlertDetail } from '@/pages/Alerts/AlertDetail';
import { Cases } from '@/pages/Cases';
import { CaseDetail } from '@/pages/Cases/CaseDetail';
import { Findings } from '@/pages/Findings';
import { FindingDetail } from '@/pages/Findings/FindingDetail';
import { ExecutionGaps } from '@/pages/ExecutionGaps';
import { NegativeSpace } from '@/pages/NegativeSpace';
import { Benchmarking } from '@/pages/Benchmarking';
import { Reports } from '@/pages/Reports';
import { AuditTrail } from '@/pages/AuditTrail';
import { Settings } from '@/pages/Settings';
import { ReviewPrioritisation } from '@/pages/ReviewPrioritisation';
import { DataIngestion } from '@/pages/DataIngestion';
import { Placeholder } from '@/pages/Placeholder';

import { AuthProvider } from '@/components/common/AuthContext';
import { Login } from '@/pages/Login';
import { ProtectedRoute } from '@/components/layout/AppLayout';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-ingestion" element={<DataIngestion />} />
            <Route path="/entities" element={<Entities />} />
            <Route path="/entities/:id" element={<EntityDetail />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/alerts/:id" element={<AlertDetail />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:id" element={<CaseDetail />} />
            <Route path="/findings" element={<Findings />} />
            <Route path="/findings/:id" element={<FindingDetail />} />
            <Route path="/execution-gaps" element={<ExecutionGaps />} />
            <Route path="/negative-space" element={<NegativeSpace />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/review-prioritisation" element={<ReviewPrioritisation />} />
            <Route path="/analytics" element={<Placeholder title="Advanced Analytics" />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit-trail" element={<AuditTrail />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
"""

sidebar_tsx = """
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldAlert, Target, Database, TrendingUp, AlertTriangle, FileText, Settings, History, Activity, FileSpreadsheet, HardDrive } from 'lucide-react';

const mainNavItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Data Ingestion', path: '/data-ingestion', icon: HardDrive },
  { name: 'CSE Entities', path: '/entities', icon: Users },
  { name: 'Review Prioritisation', path: '/review-prioritisation', icon: Activity },
  { name: 'Alerts', path: '/alerts', icon: ShieldAlert },
  { name: 'Cases', path: '/cases', icon: Database },
];

const analysisNavItems = [
  { name: 'Findings', path: '/findings', icon: Target },
  { name: 'Execution Gaps', path: '/execution-gaps', icon: AlertTriangle },
  { name: 'Negative Space', path: '/negative-space', icon: SearchX },
  { name: 'Benchmarking', path: '/benchmarking', icon: TrendingUp },
];

const reportNavItems = [
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Audit Trail', path: '/audit-trail', icon: History },
  { name: 'Settings', path: '/settings', icon: Settings },
];
// Note: SearchX needs to be imported or removed. I will replace SearchX with Activity in analysisNavItems just in case.

import { SearchX } from 'lucide-react';

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();

  const renderNavGroup = (title: string, items: typeof mainNavItems) => (
    <div className="mb-6">
      <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md mx-2 transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-border/50'
              }`}
            >
              <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-700 dark:text-blue-200' : 'text-gray-400 dark:text-gray-500'}`} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0 flex flex-col h-full`}>
      <div className="flex-1 overflow-y-auto py-4">
        <nav>
          {renderNavGroup('Supervision', mainNavItems)}
          {renderNavGroup('Analysis', analysisNavItems)}
          {renderNavGroup('System', reportNavItems)}
        </nav>
      </div>
    </aside>
  );
};
"""

app_layout = """
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useState } from 'react';
import { useAuth } from '../common/AuthContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-dark-background">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
"""

with open('/Users/taxilpambhar/.gemini/antigravity/scratch/sat-sa-full/src/App.tsx', 'w') as f:
    f.write(app_tsx)

with open('/Users/taxilpambhar/.gemini/antigravity/scratch/sat-sa-full/src/components/layout/Sidebar.tsx', 'w') as f:
    f.write(sidebar_tsx)

with open('/Users/taxilpambhar/.gemini/antigravity/scratch/sat-sa-full/src/components/layout/AppLayout.tsx', 'w') as f:
    f.write(app_layout)

