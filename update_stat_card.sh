sed -i '' 's/<Card className="flex flex-col">/<div className="bg-white dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border shadow-sm p-4 flex flex-col">/g' src/pages/Dashboard/index.tsx
sed -i '' 's/<\/Card>/<\/div>/g' src/pages/Dashboard/index.tsx
sed -i '' 's/text-3xl/text-2xl/g' src/pages/Dashboard/index.tsx
sed -i '' 's/<p className="mt-2 text-2xl font-bold/<p className="mt-1 text-2xl font-bold/g' src/pages/Dashboard/index.tsx
sed -i '' 's/<div className="mt-4 text-sm/<div className="mt-2 text-xs/g' src/pages/Dashboard/index.tsx
