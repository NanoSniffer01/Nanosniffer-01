import os

with open('src/components/layout/Sidebar.tsx', 'w') as f:
    f.write("""import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Clock, BarChart2, Bell, Users } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Assessments', path: '/assessments', icon: Clock },
  { name: 'Findings', path: '/findings', icon: BarChart2 },
  { name: 'Alerts', path: '/alerts', icon: Bell },
  { name: 'Team', path: '/team', icon: Users },
];

export const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const location = useLocation();

  return (
    <aside className={`fixed inset-y-0 left-0 z-20 w-64 bg-dark-background border-r border-dark-border transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0 flex flex-col h-full pt-6`}>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive 
                    ? 'border border-[#d97706]/40 bg-[#d97706]/10 text-amber-500 shadow-[inset_0_0_12px_rgba(217,119,6,0.15)]' 
                    : 'text-[#a19a93] hover:text-[#d4d4d8] hover:bg-dark-surface'
                }`}
              >
                <Icon className={`mr-4 flex-shrink-0 h-5 w-5 ${isActive ? 'text-amber-500' : 'text-[#a19a93]'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-5 mt-10">
          <p className="text-xs text-[#8c827a] leading-relaxed">
            Prototype navigation —<br/>selections highlight locally and do not route to a backend.
          </p>
        </div>
      </div>
    </aside>
  );
};
""")

with open('src/components/layout/Header.tsx', 'w') as f:
    f.write("""import { Shield } from 'lucide-react';

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="h-20 bg-dark-background border-b border-dark-border flex items-center justify-between px-6 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-[#d97706] rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-[#d97706]/20">
          <Shield className="text-dark-background w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white tracking-wide">
            SAT-SA <span className="text-[#a19a93]">· Nanosniffer</span>
          </h1>
          <div className="text-xs text-[#a19a93] mt-0.5">Security Assessment & Testing — SOC Analytics Workspace</div>
        </div>
      </div>
      
      <div className="hidden md:flex">
        <div className="flex items-center px-4 py-2 border border-[#d97706]/30 bg-[#d97706]/10 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#d97706] mr-2"></div>
          <span className="text-xs font-medium text-[#d97706]">Demo data · not a live authenticated session</span>
        </div>
      </div>
    </header>
  );
};
""")
