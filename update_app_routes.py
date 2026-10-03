with open('src/App.tsx', 'r') as f:
    content = f.read()

new_imports = """
import { AuthProvider, useAuth } from '@/components/common/AuthContext';
import { Login } from '@/pages/Login';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
"""

# Replace import section
content = content.replace("import { ToastProvider } from '@/components/common/ToastContext';", "import { ToastProvider } from '@/components/common/ToastContext';\n" + new_imports)

# Replace <ToastProvider> and Router
old_router = """    <ToastProvider>
      <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>"""

new_router = """    <AuthProvider>
      <ToastProvider>
        <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>"""

content = content.replace(old_router, new_router)

# Add closing tag for AuthProvider
content = content.replace("    </ToastProvider>", "      </ToastProvider>\n    </AuthProvider>")

with open('src/App.tsx', 'w') as f:
    f.write(content)
