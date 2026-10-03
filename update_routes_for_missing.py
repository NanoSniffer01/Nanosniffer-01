with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the imports
content = content.replace("import { Placeholder } from '@/pages/Placeholder';", "import { ReviewPrioritisation } from '@/pages/ReviewPrioritisation';\nimport { DataIngestion } from '@/pages/DataIngestion';")

# Replace the routes
content = content.replace('<Route path="/review-prioritisation" element={<Placeholder title="Review Prioritisation" />} />', '<Route path="/review-prioritisation" element={<ReviewPrioritisation />} />\n          <Route path="/data-ingestion" element={<DataIngestion />} />')

with open('src/App.tsx', 'w') as f:
    f.write(content)
