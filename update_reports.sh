sed -i '' 's/const handleDownloadMock = (format: string) => {/const { showToast } = useToastContext();\n  const handleDownloadMock = (format: string) => {\n    try {/g' src/pages/Reports/index.tsx

sed -i '' 's/setSelectedReport(null);/setSelectedReport(null);\n    } catch (error) {\n      console.error(error);\n      showToast("Error generating report. Please check console.");\n    }/g' src/pages/Reports/index.tsx

sed -i '' 's/import { Modal } from '"'"'@\/components\/common\/Modal'"'"';/import { Modal } from '"'"'@\/components\/common\/Modal'"'"';\nimport { useToastContext } from '"'"'@\/components\/common\/ToastContext'"'"';/g' src/pages/Reports/index.tsx
