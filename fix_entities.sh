sed -i '' '/import { entitiesData } from '"'"'@\/data'"'"';/d' src/pages/Entities/index.tsx
sed -i '' '/import { findingsData } from '"'"'@\/data'"'"';/d' src/pages/Entities/index.tsx
sed -i '' 's/import { useState, useRef, useEffect } from '"'"'react'"'"';/import { useState, useRef, useEffect } from '"'"'react'"'"';\nimport { EntityService, FindingsService } from '"'"'@\/services\/api'"'"';\nimport { CSEEntity, Finding } from '"'"'@\/types'"'"';/g' src/pages/Entities/index.tsx
