with open('src/components/layout/Sidebar.tsx', 'r') as f:
    content = f.read()

# Add HardDrive icon for Data Ingestion
content = content.replace("import { LayoutDashboard, Clock, BarChart2, Bell, Users } from 'lucide-react';", "import { LayoutDashboard, Clock, BarChart2, Bell, Users, HardDrive } from 'lucide-react';")

# Add the nav item
nav_item = """  { name: 'Data Ingestion', path: '/data-ingestion', icon: HardDrive },
];"""
content = content.replace("];", nav_item, 1) # Only replace the first occurrence (which is the navItems array closure)

with open('src/components/layout/Sidebar.tsx', 'w') as f:
    f.write(content)
