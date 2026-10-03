with open('src/pages/Reports/index.tsx', 'r') as f:
    content = f.read()

# Replace imports
content = content.replace("import { entitiesData, findingsData } from '@/data';", 
"""import { useEffect, useState as useStateImported } from 'react';
import { EntityService, FindingsService } from '@/services/api';""")

# Add state for data
content = content.replace("  const [selectedReport, setSelectedReport] = useState<string | null>(null);",
"""  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [entitiesData, setEntitiesData] = useState<any[]>([]);
  const [findingsData, setFindingsData] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [entities, findings] = await Promise.all([
        EntityService.getEntities(),
        FindingsService.getFindings()
      ]);
      setEntitiesData(entities);
      setFindingsData(findings);
    };
    loadData();
  }, []);""")

with open('src/pages/Reports/index.tsx', 'w') as f:
    f.write(content)

