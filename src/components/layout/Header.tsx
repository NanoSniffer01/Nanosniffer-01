import { Menu, Search, Bell, Sun, Moon, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { notificationsData } from '@/data/notifications';

export const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    const parts = path.split('/').filter(Boolean);
    const title = parts[0].split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    if (parts.length > 1) return `${title} / Detail`;
    return title;
  };

  const unreadCount = notificationsData.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white dark:bg-dark-surface border-b border-gray-200 dark:border-dark-border flex items-center justify-between px-4 sm:px-6 z-10 sticky top-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border mr-2">
          <Menu className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">SAT-SA</h1>
          <div className="text-xs text-gray-500 dark:text-gray-400">Supervisory Analytics Tool / {getPageTitle()}</div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="hidden sm:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-1.5 border border-gray-300 dark:border-dark-border rounded-md bg-gray-50 dark:bg-dark-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
        
        <button onClick={() => setIsDark(!isDark)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className={`p-2 rounded-full relative transition-colors ${showNotifications ? 'bg-gray-100 dark:bg-dark-border text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-border'}`}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-dark-surface"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-border flex justify-between items-center bg-gray-50 dark:bg-dark-background/50">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <span className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">Mark all as read</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notificationsData.map(notif => (
                  <div key={notif.id} className={`p-4 border-b border-gray-100 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-background/50 cursor-pointer ${notif.unread ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                        {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>}
                        {notif.title}
                      </h4>
                      <span className="text-xs text-gray-500">{notif.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 ml-4">{notif.message}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-200 dark:border-dark-border text-center bg-gray-50 dark:bg-dark-background/50">
                <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">View all notifications</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative" ref={profileRef}>
          <div 
            className="flex items-center space-x-2 pl-2 border-l border-gray-200 dark:border-dark-border cursor-pointer select-none"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="hidden sm:block text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 transition-colors">Supervisor</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">NCIIPC</div>
            </div>
            <button className="p-1.5 bg-gray-100 dark:bg-dark-border rounded-full text-gray-600 dark:text-gray-300 pointer-events-none">
              <User className="h-5 w-5" />
            </button>
          </div>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border rounded-lg shadow-lg overflow-hidden z-50 py-1">
              <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border cursor-pointer">Your Profile</div>
              <div className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border cursor-pointer">Settings</div>
              <div className="border-t border-gray-200 dark:border-dark-border my-1"></div>
              <div className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-dark-border cursor-pointer">Sign out</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};