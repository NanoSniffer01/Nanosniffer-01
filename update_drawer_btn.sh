# Import ExternalLink
sed -i '' 's/import { Search, Filter, ChevronRight, X, FileText, Activity } from '"'"'lucide-react'"'"';/import { Search, Filter, ChevronRight, X, FileText, Activity, ExternalLink } from '"'"'lucide-react'"'"';/g' src/pages/Entities/index.tsx

# Replace the close button block with a new flex container holding both buttons
sed -i '' 's/<button onClick={() => setSelectedEntityId(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">/<div className="absolute top-4 right-4 flex items-center space-x-2">\n                  <Link to={`\/entities\/${entity.id}`} className="flex items-center px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-medium rounded hover:bg-gray-800 dark:hover:bg-white transition-colors shadow-sm">\n                    <ExternalLink className="w-3.5 h-3.5 mr-1.5" \/> Full Page\n                  <\/Link>\n                  <button onClick={() => setSelectedEntityId(null)} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">/g' src/pages/Entities/index.tsx

# Close the new div (replacing the old X button's closing tag)
sed -i '' 's/<X className="w-5 h-5" \/>\n                <\/button>/<X className="w-5 h-5" \/>\n                  <\/button>\n                <\/div>/g' src/pages/Entities/index.tsx

# Remove the old button at the bottom
sed -i '' '/<Link to={`\/entities\/${entity.id}`} className="block w-full py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-center text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-white transition-colors mt-6">/,/<\/Link>/d' src/pages/Entities/index.tsx

