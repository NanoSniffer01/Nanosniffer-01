with open('src/components/layout/Header.tsx', 'r') as f:
    content = f.read()

# Add useAuth import
content = content.replace("import { useEffect, useState, useRef } from 'react';", "import { useEffect, useState, useRef } from 'react';\nimport { useAuth } from '@/components/common/AuthContext';")

# Add hook call inside component
content = content.replace("const [showProfile, setShowProfile] = useState(false);", "const [showProfile, setShowProfile] = useState(false);\n  const { logout } = useAuth();")

with open('src/components/layout/Header.tsx', 'w') as f:
    f.write(content)
