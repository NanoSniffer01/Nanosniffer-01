with open('src/pages/Login/index.tsx', 'r') as f:
    content = f.read()

# Add an error state
content = content.replace("const [isLoading, setIsLoading] = useState(false);", "const [isLoading, setIsLoading] = useState(false);\n  const [errorMsg, setErrorMsg] = useState('');")

# Update handleLogin
old_auth = """    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      if ((email === 'taxilpambhar2@gmail.com' && password === 'Taxil@123') || (email === 'demo.supervisor@nciipc.gov' && password === 'admin123')) {
        login(email);
        showToast('Successfully authenticated as Supervisor');
        navigate('/dashboard');
      } else {
        showToast('Incorrect username or password. Please try again.');
      }
    }, 1000);"""

new_auth = """    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      const cleanEmail = email.trim();
      
      if ((cleanEmail === 'taxilpambhar2@gmail.com' && password === 'Taxil@123') || (cleanEmail === 'demo.supervisor@nciipc.gov' && password === 'admin123')) {
        login(cleanEmail);
        showToast('Successfully authenticated as Supervisor');
        navigate('/dashboard');
      } else {
        setErrorMsg('Incorrect username or password. Please try again.');
      }
    }, 1000);"""

content = content.replace(old_auth, new_auth)

# Add errorMsg display right before the submit button
error_ui = """
            {errorMsg && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                {errorMsg}
              </div>
            )}

            <div>
              <button
"""
content = content.replace("            <div>\n              <button", error_ui)

# Clear error when typing
content = content.replace("onChange={(e) => setEmail(e.target.value)}", "onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}")
content = content.replace("onChange={(e) => setPassword(e.target.value)}", "onChange={(e) => { setPassword(e.target.value); setErrorMsg(''); }}")

with open('src/pages/Login/index.tsx', 'w') as f:
    f.write(content)
