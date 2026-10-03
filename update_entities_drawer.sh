sed -i '' 's/import { Search, Filter, ChevronRight, X } from '"'"'lucide-react'"'"';/import { Search, Filter, ChevronRight, X, Calendar, FileText, Activity } from '"'"'lucide-react'"'"';\nimport { Drawer } from '"'"'@\/components\/common\/Drawer'"'"';\nimport { jsPDF } from '"'"'jspdf'"'"';\nimport { findingsData } from '"'"'@\/data'"'"';\nimport { useToastContext } from '"'"'@\/components\/common\/ToastContext'"'"';/g' src/pages/Entities/index.tsx

sed -i '' 's/const \[sectorFilter, setSectorFilter\] = useState('"'"'All Sectors'"'"');/const [sectorFilter, setSectorFilter] = useState('"'"'All Sectors'"'"');\n  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);\n  const { showToast } = useToastContext();/g' src/pages/Entities/index.tsx

sed -i '' 's/<Link to={`\/entities\/${entity.id}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 flex items-center justify-end">/<button onClick={() => setSelectedEntityId(entity.id)} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 flex items-center justify-end w-full text-right bg-transparent border-none focus:outline-none cursor-pointer">/g' src/pages/Entities/index.tsx

sed -i '' 's/Review <ChevronRight className="h-4 w-4 ml-1" \/>\n                  <\/Link>/Review <ChevronRight className="h-4 w-4 ml-1" \/>\n                  <\/button>/g' src/pages/Entities/index.tsx

