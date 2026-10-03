with open('src/pages/Login/index.tsx', 'r') as f:
    content = f.read()

demo_button = """
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-surface text-gray-500">Or for judges & reviewers</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setEmail('demo.supervisor@nciipc.gov');
                  setPassword('admin123');
                  setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 100);
                }}
                className="w-full flex justify-center py-3 px-4 border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-lg shadow-sm text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                🚀 One-Click Demo Login
              </button>
            </div>
"""

# Insert the demo button right before the final form closing tag and policy text
content = content.replace('          </form>\n          \n          <div className="mt-6 border-t', demo_button + '\n          </form>\n          \n          <div className="mt-6 border-t')

with open('src/pages/Login/index.tsx', 'w') as f:
    f.write(content)
