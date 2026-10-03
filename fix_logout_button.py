with open('src/components/layout/Header.tsx', 'r') as f:
    content = f.read()

old_link = "onClick={() => { setShowProfile(false); logout(); navigate('/login'); }}"
new_link = "onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowProfile(false); logout(); localStorage.removeItem('sat_sa_auth'); localStorage.removeItem('sat_sa_user'); window.location.href = '#/login'; window.location.reload(); }}"

content = content.replace(old_link, new_link)

with open('src/components/layout/Header.tsx', 'w') as f:
    f.write(content)
