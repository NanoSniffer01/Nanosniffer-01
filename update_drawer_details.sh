sed -i '' 's/width="w-full sm:w-\[450px\]"/width="w-full sm:w-\[600px\]"/g' src/pages/Entities/index.tsx

# Add the extra metrics
sed -i '' 's/<div className="grid grid-cols-2 gap-3">/<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">\n                    <div className="bg-white dark:bg-dark-surface p-3 rounded border border-gray-200 dark:border-dark-border">\n                      <div className="text-xs text-gray-500">Total Alerts<\/div>\n                      <div className="text-lg font-bold">{formatNumber(entity.alertCount)}<\/div>\n                    <\/div>/g' src/pages/Entities/index.tsx

sed -i '' 's/<div className="text-xs text-gray-500">Investigation Rate<\/div>/<div className="text-xs text-gray-500">Cases<\/div>\n                      <div className="text-lg font-bold">{formatNumber(entity.caseCount)}<\/div>\n                    <\/div>\n                    <div className="bg-white dark:bg-dark-surface p-3 rounded border border-gray-200 dark:border-dark-border">\n                      <div className="text-xs text-gray-500">Inv. Rate<\/div>/g' src/pages/Entities/index.tsx

