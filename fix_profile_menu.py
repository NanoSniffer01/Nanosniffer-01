with open('src/components/layout/Header.tsx', 'r') as f:
    content = f.read()

# 1. Remove the standalone Logout button
standalone_logout = """          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
          
          <button 
            onClick={() => { logout(); navigate('/login'); }}
            className="flex items-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Power className="h-5 w-5 mr-1.5" />
            Sign Out
          </button>
"""
content = content.replace(standalone_logout, "")

# 2. Attach the logout function to the profile dropdown menu's Sign out link
old_sign_out_link = """<div className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-dark-border cursor-pointer" onClick={() => setShowProfile(false)}>Sign out</div>"""
new_sign_out_link = """<div className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-dark-border cursor-pointer" onClick={() => { setShowProfile(false); logout(); navigate('/login'); }}>Sign out</div>"""
content = content.replace(old_sign_out_link, new_sign_out_link)

with open('src/components/layout/Header.tsx', 'w') as f:
    f.write(content)
