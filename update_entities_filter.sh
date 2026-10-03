sed -i '' 's/const \[showFilters, setShowFilters\] = useState(false);/const [showFilters, setShowFilters] = useState(false);\n  const [riskFilter, setRiskFilter] = useState("All Risk Levels");\n  const [sectorFilter, setSectorFilter] = useState("All Sectors");/g' src/pages/Entities/index.tsx

sed -i '' 's/const filteredEntities = entitiesData.filter(e =>/const filteredEntities = entitiesData.filter(e => {\n    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.sector.toLowerCase().includes(searchTerm.toLowerCase());\n    const matchesRisk = riskFilter === "All Risk Levels" || e.riskLevel === riskFilter;\n    const matchesSector = sectorFilter === "All Sectors" || e.sector === sectorFilter;\n    return matchesSearch \&\& matchesRisk \&\& matchesSector;\n  });\n\n  \/\/ Dummy/g' src/pages/Entities/index.tsx

sed -i '' 's/e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||/ /g' src/pages/Entities/index.tsx
sed -i '' 's/e.sector.toLowerCase().includes(searchTerm.toLowerCase())/ /g' src/pages/Entities/index.tsx
sed -i '' 's/  );/ /g' src/pages/Entities/index.tsx

sed -i '' 's/<select className="w-full text-sm p-2 border border-gray-300 dark:border-dark-border rounded bg-transparent">/<select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="w-full text-sm p-2 border border-gray-300 dark:border-dark-border rounded bg-transparent">/g' src/pages/Entities/index.tsx

sed -i '' 's/<select className="w-full text-sm p-2 border border-gray-300 dark:border-dark-border rounded bg-transparent">/<select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)} className="w-full text-sm p-2 border border-gray-300 dark:border-dark-border rounded bg-transparent">/g' src/pages/Entities/index.tsx

