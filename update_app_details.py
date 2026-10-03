with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the imports
content = content.replace("import { Alerts } from '@/pages/Alerts';", "import { Alerts } from '@/pages/Alerts';\nimport { AlertDetail } from '@/pages/Alerts/AlertDetail';")
content = content.replace("import { Cases } from '@/pages/Cases';", "import { Cases } from '@/pages/Cases';\nimport { CaseDetail } from '@/pages/Cases/CaseDetail';")

# Add the routes right after the list endpoints
content = content.replace('<Route path="/alerts" element={<Alerts />} />', '<Route path="/alerts" element={<Alerts />} />\n          <Route path="/alerts/:id" element={<AlertDetail />} />')
content = content.replace('<Route path="/cases" element={<Cases />} />', '<Route path="/cases" element={<Cases />} />\n          <Route path="/cases/:id" element={<CaseDetail />} />')

with open('src/App.tsx', 'w') as f:
    f.write(content)
