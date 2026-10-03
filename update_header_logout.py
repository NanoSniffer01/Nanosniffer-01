with open('src/components/layout/Header.tsx', 'r') as f:
    content = f.read()

# Add useAuth to imports
content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { useAuth } from '@/components/common/AuthContext';\nimport { useNavigate } from 'react-router-dom';")
content = content.replace("import { Bell, Search, User, Sun, Moon, LogOut } from 'lucide-react';", "import { Bell, Search, User, Sun, Moon, LogOut, Power } from 'lucide-react';")

# Add hook calls
content = content.replace("const [isDark, setIsDark] = useState(true);", "const [isDark, setIsDark] = useState(true);\n  const { logout, userEmail } = useAuth();\n  const navigate = useNavigate();")

# Add Logout button right after Theme toggle button
logout_btn = """          </button>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
          
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Power className="h-5 w-5 mr-1.5" />
            Sign Out
          </button>
"""
content = content.replace('          </button>\n          \n          <div className="flex items-center', logout_btn + '\n          <div className="flex items-center')

# Replace the "Supervisory Agent" hardcoded email with the real one if it exists
content = content.replace('className="text-xs text-gray-500">supervisor@nciipc.gov</p>', 'className="text-xs text-gray-500">{userEmail || "supervisor@nciipc.gov"}</p>')

with open('src/components/layout/Header.tsx', 'w') as f:
    f.write(content)
