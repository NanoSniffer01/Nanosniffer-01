
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
