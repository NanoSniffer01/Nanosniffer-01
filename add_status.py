import re

with open('src/components/layout/Header.tsx', 'r') as f:
    content = f.read()

# Add state for API Status
content = content.replace("  const [showProfile, setShowProfile] = useState(false);", 
"""  const [showProfile, setShowProfile] = useState(false);
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Ping the backend using a simple fetch to avoid importing axios here if not needed
        const url = (import.meta as any).env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';
        // we can just fetch the /entities endpoint or /dashboard/summary as a health check
        const response = await fetch(`${url}/dashboard/summary`);
        if (response.ok) {
          setApiStatus('connected');
        } else {
          setApiStatus('disconnected');
        }
      } catch (err) {
        setApiStatus('disconnected');
      }
    };
    checkApiStatus();
    const interval = setInterval(checkApiStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);""")

# Add the UI badge in the header, before the search bar
status_ui = """
        <div className="hidden md:flex items-center space-x-2 mr-2 px-3 py-1 bg-gray-50 dark:bg-dark-background border border-gray-200 dark:border-dark-border rounded-full cursor-help" title={apiStatus === 'connected' ? 'Connected to Live Backend API' : 'Backend Unreachable - Using Local Mock Data'}>
          <div className={`w-2 h-2 rounded-full ${apiStatus === 'checking' ? 'bg-yellow-400 animate-pulse' : apiStatus === 'connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {apiStatus === 'checking' ? 'Connecting...' : apiStatus === 'connected' ? 'Live API' : 'Mock Data Mode'}
          </span>
        </div>
        
        <div className="hidden sm:flex relative" ref={searchRef}>
"""

content = content.replace('        <div className="hidden sm:flex relative" ref={searchRef}>', status_ui)

with open('src/components/layout/Header.tsx', 'w') as f:
    f.write(content)
