with open('src/pages/Login/index.tsx', 'r') as f:
    content = f.read()

old_auth = """    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      login(email);
      showToast('Successfully authenticated as Supervisor');
      navigate('/dashboard');
    }, 1000);"""

new_auth = """    // Simulate API delay
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

content = content.replace(old_auth, new_auth)

with open('src/pages/Login/index.tsx', 'w') as f:
    f.write(content)
